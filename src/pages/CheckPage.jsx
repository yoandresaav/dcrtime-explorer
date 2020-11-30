import React, { useEffect, useState, Fragment } from 'react'
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import 'fontsource-roboto';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Notification from '../messages/Notification';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '110ch',
    padding: theme.spacing(3),
  },
  margin: {
    margin: theme.spacing(3),
    padding: theme.spacing(1),
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
    textAlign: 'center',
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
    
    if (digest.length !== 64){
      setResult(null)
      setOpenBadDigest(true)
      return
    }
    
    const url = 'https://time-testnet.decred.org:59152/v2/verify/batch'
    const json = JSON.stringify({
      "id":"dcrtime cli",
      "digests":[
        digest
        ]
    })
    let response = null;
    try {
      response = await axios.post(url, json)
    } catch (e) {
      console.error(e)
      alert(e)
      return
    }
    setResult(response.data)
  }

  useEffect(()=> {
    callApi()
  }, [location])

  if (!result) return <div>
    <Notification 
      open={openBadDigest}
      onClose={handleCloseBadDigest}
      message={'No es un digest válido'}
      severity={"error"}
    />
  </div>

  result.digests.map((r) => {
    console.log(r.digest)
  })

  return (
    <Grid container justify="center">
      <Grid item className={clsx(classes.root, classes.margin)}>
        <Card className={clsx(classes.margin, classes.root, classes.card)}>
          <Typography variant="h4" component="h4" className={clsx(classes.title)}>
            Comprueba que los documentos ya estan registrados en la blockchain
          </Typography>
          <Typography component="p" className={classes.document}>
            Veniam est commodo eu aliquip do est culpa aliqua do quis. Voluptate velit exercitation do magna magna consectetur laborum ipsum. Voluptate deserunt cillum velit pariatur aute cupidatat sint ex velit. Anim labore qui elit dolore id anim commodo elit fugiat anim elit. Sint pariatur reprehenderit qui do enim. Minim nostrud nulla ullamco minim non voluptate laboris elit minim cupidatat.
          </Typography>
          <Grid item className={clsx(classes.grid)} ></Grid>
            {result.digests.map((res, index) => (
              <Fragment key={index}>
                <h4>{res.digest}</h4>
                <p>{res.result}</p>
                {/* Resultado Inválido */}
                {(res.result === 0) && 
                <div>Resultado Inválido</div>}

                {/* Resultado Válido */}
                {(res.result === 1) && 
                <div>Resultado Success</div>}

                {/* Result exists in server */}
                {(res.result === 2) && 
                <div>Resultado Exist in Server</div>}

                {/* Result exists in server */}
                {(res.result === 3) && 
                <div>Resultado not Exist in Server</div>}

                {/* Result exists in server */}
                {(res.result === 4) && 
                <div>Se ha desactivado la verificacion</div>}
              </Fragment>
            ))}
            
          
        </Card>
      </Grid>
    </Grid>
  )
}

export default CheckPage