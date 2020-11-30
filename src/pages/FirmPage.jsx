import React from 'react'
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import 'fontsource-roboto';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import {firmFiles} from '../helpers/utils-file';
import axios from 'axios';
import HeaderStep from '../components/HeaderStep';


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

const initialKeyValue = {
  key: null, 
  pemPublic: '',
  pemPrivate: '',
}

const initialState = {
  email: '',
  files: [],
}


const FirmPage = () => {
  const classes = useStyles();
  const [data, setData] = React.useState(initialState)

  // if firm with generated key or user key
  const [useGenerateKey, setUseGenerateKey] = React.useState(true)

  // user generated key {pemPublic, pemPrivate}
  const [storeKey, setStoreKey] = React.useState(initialKeyValue)

  let propsKey = {
    storeKey, 
    setStoreKey,
    useGenerateKey, 
    setUseGenerateKey,
    initialKeyValue,
  }

  const updateForm = newData => {
    setData(prevData => ({ ...prevData, ...newData }))
  }

  const onLastStep = async () => {
    const privateKey = storeKey.key.privateKey;
    const generatedFiles = await firmFiles( data.files, privateKey );

    setData(prevData => ({
      ...prevData,
      files: generatedFiles,
    }))

    // Send to server
    await onSend();
  }

  const onSend = async () => {
    const url ='https://time-testnet.decred.org:59152/v2/timestamp/batch'
    const allDigest = data.files.map((f) => f.digestFirmed)
    const json = JSON.stringify({
      "id":"dcrtime cli",
      "digests": [...allDigest],
    })
      
    // "62b520983c2f2b46570f5205f09d1cb96e52822931a9a2015175dd57bc5a8914",
    const headers = { 'Content-Type': 'application/json'}
    const response = await axios.post(url, json, { headers: headers })
    try {
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
      digestOriginal: 'Digest del documento sin firmar',
    })
    let response = null;
    try {
       response = await axios.post(url, json);
      
    } catch (error) {
      console.error();
      return;
    }

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