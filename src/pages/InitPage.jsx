import React from 'react'
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { Grid, Button, Link } from '@material-ui/core';
import 'fontsource-roboto';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import {Link as LinkRoute} from 'react-router-dom'
import LandingIconos from '../components/LandingIconos';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '110ch',
    padding: theme.spacing(3),
    minHeight: '80ch',
  },
  margin: {
    padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(3),
    },
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
           Firma y Registra archivos digitales en Decred
          </Typography>
          <Typography component="p" className={classes.document}>
            Dcrtime Explorer es una aplicación que permite firmar, registrar y verificar la existencia de archivos digitales en la cadena de bloques de Decred. Inspirado y desarrollado sobre <Link href="https://docs.decred.org/advanced/dcrtime/">Dcrtime</Link>. Un servicio que permite hacer sellado genérico de tiempo. La novedad radica en agregar un sistema de firma digital y un verificador de hash que actualmente no tiene Dcrtime.
          </Typography>
          <Typography component="p" className={classes.document}>
            Esta aplicación generara <strong>claves públicas y privadas</strong> usadas para firmar ficheros. <strong>Descargue estas claves y guardelas en un lugar seguro. </strong>Las claves pueden volverse a usar para firmar. Y para verificar la autenticidad del firmante.
          </Typography>
          <Typography component="p" className={classes.document}>
          Se permite la verificación del anclaje de los activos digitales en la cadena de bloques de Decred mediante la transacción.
          </Typography>
          
          <LandingIconos />

          <Typography component="p" className={classes.document}>
            El <strong>Archivo de Verificación</strong> almacena algunos datos del archivo original, hash firmados y una copia de la llave pública. Este fichero se debe descargar y usar en el proceso de verificación. Distribuya el Archivo de Verificación para que se reconozca su autoria.
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