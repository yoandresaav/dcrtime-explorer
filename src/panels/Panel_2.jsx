import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Button, FormControl, Input, TextareaAutosize, TextField, FormHelperText, InputLabel, InputAdornment, IconButton } from '@material-ui/core';

import UploadFile3 from '../components/UploadFile3'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    width: '100%'
  },
}));

const Panel_2 = ({data, updateForm}) => {

  const classes = useStyles();

  return (
    <Grid container direction="column" alignItems="center" justify="center" >
      <Grid item className={classes.root}>
        <UploadFile3 files={data.files} updateForm={updateForm} />
      </Grid>
    </Grid>
  )
}

export default Panel_2