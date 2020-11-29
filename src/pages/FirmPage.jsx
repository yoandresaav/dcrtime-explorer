import React from 'react'
import Copyright from '../components/Copyright'
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ProTip from '../components/ProTip';
import { Box, Grid, Button, FormControl, Input, TextareaAutosize, TextField, FormHelperText, InputLabel } from '@material-ui/core';
import 'fontsource-roboto';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import {signData} from '../helpers/utils-keys'
import {digestPayload} from '../helpers/create-digest'

import axios from 'axios';

import HeaderStep from '../components/HeaderStep';

const initialKeyValue = {
  key: null, 
  pemPublic: '',
  pemPrivate: '',
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(3),
    padding: theme.spacing(1),
  },
}));

const initialState = {
  email: '',
  files: [],
}

const FirmPage = () => {
  const classes = useStyles();
  const [data, setData] = React.useState(initialState)

  // if firm with generated key or user key
  const [useGenerateKey, setUseGenerateKey] = React.useState(true)

  // user generated key
  const [storeKey, setStoreKey] = React.useState(initialKeyValue)

  // user private key 
  const [userPrivateKey, setUserPrivateKey] = React.useState('')


  let propsKey = {
    storeKey, 
    setStoreKey,
    userPrivateKey, 
    setUserPrivateKey,
    useGenerateKey, 
    setUseGenerateKey,
    initialKeyValue,
  }


  const updateForm = newData => {
    console.log(newData)
    setData(prevData => ({ ...prevData, ...newData }))
  }
  // 
  const onLastStep = async () => {
    const privateKey = storeKey.key.privateKey

    const generatedFiles = await Promise.all( data.files.map( async file => {
      const digest = file.digest
      var uint8array = new TextEncoder().encode(digest);
      
      const firmed = await signData( privateKey, uint8array )
      const plainFirmed = Buffer.from(firmed).toString('hex') // el mero
      
      // Save plain doc firmed
      file.plainFirmed = plainFirmed

      // Generate hash256 from firmed document
      const digestFirmed = digestPayload(plainFirmed)

      // Save digest firmed
      file.digestFirmed = digestFirmed
      
      return file
    }))

    setData(prevData => ({
      ...prevData,
      files: generatedFiles,
    }))

    // TODO: Enviar al servidor
    await onSend();
  }

  const onSend = async () => {
    const url ='https://time-testnet.decred.org:59152/v2/timestamp/batch'
    const allDigest = data.files.map((f) => f.digestFirmed)
    console.log('allDigest: ', allDigest)
    const json = JSON.stringify({
      "id":"dcrtime cli",
      "digests": [...allDigest],
    })
      
    // "62b520983c2f2b46570f5205f09d1cb96e52822931a9a2015175dd57bc5a8914",
    const headers = { 'Content-Type': 'application/json'}
    try {
      const response = await axios.post(url, json, { headers: headers })
      console.log('Data: ', response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const createTask = async () => {
    const url = 'http://url';
    const json = JSON.stringify({
      email: '',
      titulo: 'LibroEjemplo.pdf',
      size: 'en megabyte',
      digestFirmed: 'Digest del documento firmado con la clave privada',
      digest: 'Digest del documento sin firmar',
    })
    let response = null;
    try {
       response = await axios.post(url, json);
      
    } catch (error) {
      console.error();
      return;
    }

    //if (response.status)

  }

  const resetData = () => {
    setData(initialState)
  }

  return (
    <React.Fragment>
      <Grid container justify="center">
        <Card className={clsx(classes.margin)}>
          <HeaderStep 
            data={data} 
            updateForm={updateForm} 
            propsKey={propsKey}
            onLastStep={onLastStep}
            resetData={resetData}
          />
        </Card>
      </Grid>
    </React.Fragment>

  )
}
export default FirmPage