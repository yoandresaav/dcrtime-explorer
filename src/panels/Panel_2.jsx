import React from 'react';
import { Box, Grid, Button, FormControl, Input, TextareaAutosize, TextField, FormHelperText, InputLabel, InputAdornment, IconButton } from '@material-ui/core';

import UploadFile3 from '../components/UploadFile3'


const Panel_2 = ({data, updateForm}) => {
  return (
    <Grid container direction="column" alignItems="center" justify="center" >
      <Grid item>
        <UploadFile3 files={data.files} updateForm={updateForm} />
      </Grid>
    </Grid>
  )
}

export default Panel_2