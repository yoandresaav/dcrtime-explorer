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

  const validateEmail = () => {
    const email = data.email
    if (email === '') return false
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(email).toLowerCase());
  }

  const isDisabled = () => {
    if (data.email !== 'undefined') return  true
    if (data.email.length === 0){
      return true
    } 
    return false
  }

  return (
    <FormControl className={clsx(classes.textField)}>
      <TextField
        variant="outlined"
        label="Email address"
        helperText="We'll never share your email"
        autoComplete="off"
        value={data.email}
        name="email"
        error={ validateEmail() }
        onChange={ (e) => { updateForm({[e.target.name]: e.target.value }) } }
        InputProps={{
          endAdornment: (
            <IconButton
              aria-label="toggle password visibility"
              edge="end"
              disabled={isDisabled()}
              onClick={ (e) => { updateForm({email: ''}) } }
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