import React from 'react'
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { Grid, Button, Link } from '@material-ui/core';
import 'fontsource-roboto';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import {Link as LinkRoute} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '110ch',
    padding: theme.spacing(3),
    minHeight: '80ch',
  },
  margin: {
    margin: theme.spacing(3),
    padding: theme.spacing(1),
  },
  title: {
    textAlign: 'center',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  card: {
    padding: 28,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }, 
  document: {
    color: 'gray',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: 18,
  },
  gridBtn: {
    textAlign: 'center',
    bottom: 0,
    alignSelf: 'flex-end',
    flex: '1 0 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
  }
}));

const InitPage = () => {

  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item className={clsx(classes.root, classes.margin)}>
        <Card className={clsx(classes.margin, classes.root, classes.card)}>
          <Typography variant="h5" component="h5" className={clsx(classes.title)}>
           Firma y Registra tus activos digitales en Decred
          </Typography>
          <Typography component="p" className={classes.document}>
            Dcrtime Explorer es un servicio que permite firmar y registrar activos digitales en la cadena de bloques de Decred. Inspirado y desarrollado sobre Dcrtime. Un servicio que permite hacer sellado genérico de tiempo. <Link href="https://docs.decred.org/advanced/dcrtime/">Dcrtime</Link>
          </Typography>
          <Typography component="p" className={classes.document}>
            Este servicio permite generar las claves públicas y privadas para firmar los documentos.
          </Typography>
          <Typography component="p" className={classes.document}>
            Además permitimos verificar que los activos digitales ya se encuentran en la cadena de bloques de Decred. Recuperando la transacción donde se encuentra el hash para ser verificados en el mismo explorador de bloques de Decred.
          </Typography>
          <Grid item className={clsx(classes.gridBtn)} >
            <Button variant="contained" color="primary" component={LinkRoute} to='/firm' >
              Comenzar
            </Button>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  )
}
export default InitPage