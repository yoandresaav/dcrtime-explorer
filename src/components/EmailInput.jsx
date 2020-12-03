import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, TextField, IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(2),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '90ch',
    }
  }
}));

const EmailInput = ({data, updateForm}) => {
  const classes = useStyles();

  return (
    <FormControl className={clsx(classes.textField)}>
      <TextField
        variant="outlined"
        label="Agrega un título"
        helperText="Ejemplo: PDF con el contrato de renta Noviembre 2020"
        autoComplete="off"
        value={data.title}
        name="title"
        onChange={ (e) => { updateForm({[e.target.name]: e.target.value }) } }
        InputProps={{
          endAdornment: (
            <IconButton
              aria-label="toggle password visibility"
              edge="end"
              onClick={ (e) => { updateForm({title: ''}) } }
            >
              <HighlightOffIcon />
            </IconButton>
          )
        }}
      />
    </FormControl>
  )
}

export default EmailInput