import React, { Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Button, Tooltip, FormControl, Input, TextareaAutosize, TextField, FormHelperText, InputLabel, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ButtonKeyGenerator from '../components/ButtonKeyGenerator'
import ChooseHaveKey from '../components/ChooseHaveKey';
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
  input: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100ch',
    }
  },
  marginLeft: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(2),
  },
  marginTop: {
    marginTop: theme.spacing(3),
  },
  grow: {
    flexGrow: 1,
  },
}));


/**


Son dos procesos 
1 - Si tiene clave privada TODO
2 - Generar las claves privadas 

 */

const privateMask = '00000000000-00000000000-00000000000-00000000000-00000000000'

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
    <Grid container direction="column"  justify="center" >

        <ChooseHaveKey 
          checkedA={propsKey.useGenerateKey} 
          handleChange={onChangeChecked}
          label={ propsKey.useGenerateKey ? "Quiero generar las llaves" : "Tengo mi llave Primaria PGP" }
        />
        
        <div className={clsx(classes.root, classes.marginLeft)}>
          {/* Load Keys */}
          {(propsKey.useGenerateKey) && 
            <ButtonKeyGenerator addKeys={addKeys} />}
          
          <div className={classes.grow} />
          
          <Tooltip title={showKey ? "Hide" : "Show"}>
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowKey}
              onMouseDown={handleMouseDownPassword}
            >
              {showKey ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </Tooltip>
          
          {(propsKey.useGenerateKey) && 
          <Tooltip title="Clear">
            <IconButton
              aria-label="clear keys"
              onClick={onClear}
            >
              <HighlightOffIcon /> 
            </IconButton>
          </Tooltip>}
          
        </div>

        {(propsKey.useGenerateKey)
          ?
            <React.Fragment>
              {/* Key generates */}
                
                <FormControl className={clsx(classes.margin, classes.marginTop)}>
                  <TextField
                    multiline={true}
                    rows={16}
                    variant="outlined"
                    label="Private Key"
                    value={showKey ? propsKey.storeKey.pemPrivate : propsKey.storeKey.pemPrivate ? privateMask : ''}
                  />
                </FormControl>
                
                <FormControl className={clsx(classes.margin)}>
                  <TextField 
                    multiline={true} 
                    rows={6} 
                    variant="outlined" 
                    label="Public Key" 
                    value={propsKey.storeKey.pemPublic} />
                </FormControl>
            </React.Fragment>
          :
            <FormControl className={clsx(classes.margin)}>
              {/* User entry your private key */}
                <TextField
                  multiline={true}
                  rows={16}
                  variant="outlined"
                  label="Private Key"
                  value={showKey ? propsKey.userPrivateKey : propsKey.userPrivateKey ? privateMask : ''}
                  onChange={ (e) => { propsKey.setUserPrivateKey(e.target.value) } }
                  maxWidth
                />
              </FormControl>
        }
    </Grid>
  )
}

export default Panel_3