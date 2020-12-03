import React from 'react'
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import 'fontsource-roboto';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import {firmFiles} from '../helpers/utils-file';
import HeaderStep from '../components/HeaderStep';
import {sendDigestToDecred} from '../helpers/api-decred';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '110ch',
    padding: theme.spacing(3),
    minHeight: '80ch',
  },
  margin: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(3),
    },
  },
}));

const initialKeyValue = {
  key: null, 
  pemPublic: '',
  pemPrivate: '',
}

const initialState = {
  title: '',
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
    const allDigest = data.files.map((f) => f.digestFirmed)
    if (allDigest.length === 0){
      alert('No f.digestFirmed')
    }
    await sendDigestToDecred(allDigest);
    return;
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