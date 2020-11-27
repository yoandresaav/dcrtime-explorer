import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Button, FormControl, Input, TextareaAutosize, TextField, FormHelperText, InputLabel, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ButtonKeyGenerator from '../components/ButtonKeyGenerator'
import ChooseHaveKey from '../components/ChooseHaveKey';

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
      width: '100ch',
    }
  },
  input: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100ch',
    }
  },
}));


/**


Son dos procesos 
1 - Si tiene clave privada TODO
2 - Generar las claves privadas 

 */

const Panel_3 = ({propsKey}) => {
  const classes = useStyles();

  const [showKey, setShowKey] = React.useState(false);
  
  const addKeys = (store) => { propsKey.setStoreKey(store) }
  const onClear = () => { propsKey.setStoreKey(propsKey.initialKeyValue) }
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const handleClickShowKey = () => {
    setShowKey(prevValue => (!prevValue))
  }
  
  const onChangeChecked = e => {
    propsKey.setUseGenerateKey(e.target.checked)
  }
  return (
    <Grid container direction="column" alignItems="center" justify="center" >
      <Grid item>

        <ChooseHaveKey 
          checkedA={propsKey.useGenerateKey} 
          handleChange={onChangeChecked}
          label="Tengo una clave privada"
        />
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowKey}
          onMouseDown={handleMouseDownPassword}
        >
          {showKey ? <Visibility /> : <VisibilityOff />}
        </IconButton>

        {(propsKey.useGenerateKey)
          ?
            <React.Fragment>
              {/* User entry your private key */}
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <TextField
                  multiline={true}
                  rows={16}
                  variant="outlined"
                  label="Private Key"
                  value={showKey ? propsKey.userPrivateKey : propsKey.userPrivateKey ? 'xxxxxxxxxxx' : ''}
                  onChange={ (e) => { propsKey.setUserPrivateKey(e.target.value) } }
                />
              </FormControl>
            </React.Fragment>
          :
            <React.Fragment>
              {/* Key generates */}
                <Grid item>
                  
                  {/* Load Keys */}
                  <ButtonKeyGenerator addKeys={addKeys} />
                  <button type="button" onClick={onClear}>Clear</button>
                </Grid>
                
                <FormControl className={clsx(classes.margin, classes.textField)}>
                  <TextField
                    multiline={true}
                    rows={16}
                    variant="outlined"
                    label="Public Key"
                    value={showKey ? propsKey.storeKey.pemPrivate : propsKey.storeKey.pemPrivate ? 'xxxxxxxxxxx' : ''}
                  />
                </FormControl>
                
                <FormControl className={clsx(classes.margin, classes.textField)}>
                  <TextField 
                    multiline={true} 
                    rows={6} 
                    variant="outlined" 
                    label="Public Key" 
                    value={propsKey.storeKey.pemPublic} />
                </FormControl>
            </React.Fragment>
        }
        </Grid>

    </Grid>
  )
}

export default Panel_3