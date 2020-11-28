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

const FirmPage = () => {
  const classes = useStyles();
  const [data, setData] = React.useState({
    email: '',
    files: [],
  })

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

  const onLastStep = async () => {
    const privateKey = storeKey.key.privateKey
    const generatedFiles = await Promise.all( data.files.map( async file => {
      const digest = file.digest
  
      var uint8array = new TextEncoder().encode(digest);
      console.log('uint8array ', uint8array)
      
      const firmed = await signData( privateKey, uint8array )
      const plain = Buffer.from(firmed).toString('hex') // el mero
      
      file.plainFirmed = plain

      // Generate hash256 from firmed document
      const digestFirmed = await digestPayload(plain)

      file.digestFirmed = digestFirmed
      
      console.log('Firmed ', plain)
      console.log('El digest es ', digestFirmed)

      return file
    }))

    setData({
      files: generatedFiles,
    })


    // TODO: Enviar al servidor
    
    onSend()
  }

  const onSend = async () => {
    const url ='https://time-testnet.decred.org:59152/v2/timestamp/batch'
    const allDigest = data.files.map((f) => f.digestFirmed)
    const json = JSON.stringify({
        "id":"dcrtime cli",
        "digests":[
          "62b520983c2f2b46570f5205f09d1cb96e52822931a9a2015175dd57bc5a8914",
        ]
    })

    const headers = { 'Content-Type': 'application/json'}

    console.log('allDigest: ', allDigest)
    try {
      const response = await axios.post(url, json, { headers: headers })
      console.log('Data: ', response.data)
    } catch (error) {
      console.error(error)
    }
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
          />
        </Card>
      </Grid>
    </React.Fragment>

  )
}
export default FirmPage