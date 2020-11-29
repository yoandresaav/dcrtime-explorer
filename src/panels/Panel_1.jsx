import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormControl, Input, TextareaAutosize, TextField, FormHelperText, InputLabel, InputAdornment, IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import EmailInput from '../components/EmailInput'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
  },
  margin: {
    margin: theme.spacing(3),
  },
  title: {
    display: 'block',
    textAlign: 'center',
    color: 'gray',
    paddingBottom: theme.spacing(3),
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
            Correo de notificación
          </Typography>
          <Typography variant="subtitle1" className={classes.parraf}>
            Introduce tu correo para recibir una notificacion cuando el documento firmado ya este en la cadena de bloques de Decred.
          </Typography>
        <EmailInput data={data} updateForm={updateForm} />
      </Grid>
    </Grid>
  )
}

export default Panel_1