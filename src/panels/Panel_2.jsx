import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import UploadFile3 from '../components/UploadFile3'
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    width: '100%'
  },
  title: {
    color: 'gray',
    marginBottom: 10,
  }
}));

const Panel_2 = ({data, updateForm, errors}) => {
  const classes = useStyles();
  return (
    <Grid container direction="column" alignItems="center" justify="center" >
      <Grid item className={clsx(classes.root)}>
        <Typography variant="subtitle1" className={classes.title} component="h3">
          Sube los ficheros que deseas firmar:
        </Typography>
        <UploadFile3 files={data.files} updateForm={updateForm} />
        {(errors) &&
          <Typography color="error">Debes agregar un fichero para continuar.</Typography>}
      </Grid>
    </Grid>
  )
}

export default Panel_2