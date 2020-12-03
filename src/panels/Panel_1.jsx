import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import EmailInput from '../components/EmailInput'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
  },
  margin: {
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(3),
    },
  },
  title: {
    display: 'block',
    textAlign: 'center',
    color: 'gray',
    paddingBottom: theme.spacing(5),
  },
  parraf: {
    paddingBottom: theme.spacing(2),
  }
}));

const Panel_1 = ({data, updateForm}) => {
  const classes = useStyles()
  return (
    <Grid container direction="column" alignItems="center" justify="center" >
      <Grid item className={clsx(classes.root, classes.margin)}>
          <Typography variant="h4" component="h3" className={classes.title}>
            Título del Documento
          </Typography>
          <Typography variant="subtitle1" className={classes.parraf}>
            Introduce un texto para identificar mejor tus archivos digitales. Este se incluirá en la <strong>Prueba de Firmado</strong> y se muestra en el proceso de verificación. El titulo es opcional.
          </Typography>
        <EmailInput data={data} updateForm={updateForm} />
      </Grid>
    </Grid>
  )
}

export default Panel_1