import React, { useEffect, useState, Fragment } from 'react'
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import 'fontsource-roboto';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import Notification from '../messages/Notification';
import {checkIfDocumentExistInDecred, isDigestAnchorPending, isDigestAnchored, isDigestNotAnchored} from '../helpers/api-decred';
import CheckIsDigest from '../components/CheckIsDigest';
import CheckError from '../components/CheckError';
import TypoVeryLarge from '../components/TypoVeryLarge';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '110ch',
    padding: theme.spacing(3),
  },
  margin: {
    padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(1),
    },
  },
  title: {
    color: 'gray',
    textAlign: 'center',
  },
  card: {
    padding: 28,
    display: 'block',
  }, 
  document: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  grid: {
    textAlign: 'left',
  },
  large: {
    overflow: "hidden", 
    textOverflow: "ellipsis", 
    width: '15rem',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
  }
}));

const CheckPage = (props) => {
  
  const classes = useStyles();
  const location = useLocation();
  const [result, setResult] = useState(null);
  const [openBadDigest, setOpenBadDigest] = useState(false)

  const handleCloseBadDigest = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenBadDigest(false);
  }

  const callApi = async () => {
    const digest = props.match.params.digest;
    if (!digest || digest.length !== 64){
      setResult(null)
      setOpenBadDigest(true)
      return
    }

    const response = await checkIfDocumentExistInDecred([digest]);
    setResult(response);
  }
  useEffect(()=> {
    callApi()
  }, [location])

  return (
    <Grid container justify="center">
      <Grid item className={clsx(classes.root, classes.margin)}>
        <Card className={clsx(classes.margin, classes.root, classes.card)}>
          <Typography variant="h5" component="h5" className={clsx(classes.title)}>
          Prueba de existencia
          </Typography>
          <Typography component="p" className={classes.document}>
            Comprueba que el hash firmado de un archivo se encuentra anclado en la cadena de bloques de Decred. Recuerda que necesitas un sha256 de 64 caracteres de longitud.
          </Typography>
            {result && result.map((res, index) => (
              <div key={index} className={classes.large}>
                <TypoVeryLarge title={<Fragment><strong>Hash:</strong> {res.digest}</Fragment>} />
                {/* Result Success */}
                {(isDigestAnchorPending(res)) &&
                  <div>Se encuentra en proceso de anclarse en la cadena de bloques de Decred </div>}

                {/* Result File in server */}
                {(isDigestAnchored(res)) && <CheckIsDigest res={res} />}

                {/* Not anchores */}
                {(!isDigestAnchored(res) && isDigestNotAnchored(res)) && 
                  <CheckError title="El hash no esta anclado en la cadena de bloques de Decred." />}

              </div>
            ))}
            
            {(!result) && 
              <CheckError title="Agregue un hash Sha256 de 64 caracteres." />}

        </Card>
      </Grid>
      <Notification 
        open={openBadDigest}
        onClose={handleCloseBadDigest}
        message={'No es un hash válido'}
        severity={"error"}
      />
    </Grid>
  )
}

export default CheckPage