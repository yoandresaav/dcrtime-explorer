import React, {Fragment, useCallback, useState} from 'react'
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import 'fontsource-roboto';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {importPublicKey, verifyFirmed, str2ab, bufferToArrayBuffer} from '../helpers/utils-keys';
import UploadComprobateJson from '../components/UploadComprobateJson';
import {getFileData, jsonHaveGoodFormat} from '../helpers/utils-file';
import Notification from '../messages/Notification';
import {initialStateMessage, errorBadFormat, errorBadFormatNotPublicKey, successLoaded} from '../helpers/const-messages';
import {checkIfDocumentExistInDecred} from '../helpers/api-decred';
import ListaVerificate from '../components/ListaVerificate';
import ResumenVerificate from '../components/ResumenVerificate';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '110ch',
    minHeight: '80ch',
    padding: theme.spacing(3),
  },
  margin: {
    padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(1),
    },
  },
  title: {
    color: 'gray',
    textAlign: 'center',
  },
  card: {
    padding: 28,
    display: 'block',
  }, 
  document: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  grid: {
    textAlign: 'center',
  },
  progress: {
    textAlign: 'center',
  },
  buttonDiv: {
    paddingTop: theme.spacing(2),
    textAlign: "right",
  }
}));

// STATUS
const LOADING_FILE = 'load';
const PROCESSING = 'processing';
//const VALID = 'valid';
const INVALID = 'invalid';

const initialStateVerificate = {
  step: LOADING_FILE, 
  isValidFirmedDigest: null,
  isValidJson: null,
  isExistInDecred: null,
  resultDecred: null,
}

const stateInvalidJson = {
  step: INVALID,
  isValidJson: false,
  isValidFirmedDigest: false,
  isExistInDecred: false,
  resultDecred: false,
}

const VerificatePage = () => {
  const classes = useStyles();

  const [checkedInfo, setCheckedInfo] = useState({
    "title": "",
    "name": "",
    "digestOriginal": "",
    "digestFirmed": "",
    "documentFirmed": "",
    "size": 0,
    "sizeHuman": "112 KB",
    "generated": "2020-11-29T02:18:59.996Z",
    "pemPublic": '',
  });
  const [verificateProcess, setVerificateProcess] = useState(initialStateVerificate);
  const [messageStatus, setMessageStatus] = useState(initialStateMessage);
  
  // { result, digest, chaininformation.merkleroot, chaininformation.transaction } 
  const [responseDecred, setResponseDecred] = useState(null);

  // list digested returned by decred
  const saveResultDecred = (json, digests) => {
    // save only digest sended
    const digest = digests.find(d => d.digest === json.digestFirmed);
    const {result} = digest;
    setResponseDecred(digest);
    // Valid result 0 - Success, 1 - All ok, 2 - Exists, 3 - Not exists, 4 - Bad query
    setVerificateProcess(prev => ({...prev, resultDecred: result}))
  }

  // Reset process
  const onClickOtro = () =>{
    setVerificateProcess(initialStateVerificate);
    setResponseDecred(null);
  }


  // Al verify sign steps
  const verifyFirmedDigest = async json => {
    const pemPublic = json.pemPublic;
    const documentFirmed = json.documentFirmed;
    const originalDigest = json.digestOriginal;
    // Document firmed or signature
    const bufferSignature = new Buffer.from(documentFirmed, 'hex');
    const docFirmed = bufferToArrayBuffer(bufferSignature)
    // Digest from file
    const digestOriginal = str2ab(originalDigest);
    // Public key 
    const publicKey = await importPublicKey( pemPublic );
    // Validate
    try {
      const isValidFirmedDigest = await verifyFirmed(publicKey, docFirmed, digestOriginal);
      setVerificateProcess(prev => ({...prev, isValidFirmedDigest}));
      // save data
      setCheckedInfo(json);
    } catch (error) {
      console.error(error)
      setVerificateProcess(prev => ({...prev, step: INVALID}));
      return;
    }
  }

  // Convert in json and check format
  const readInfo = async file => {
    const base64 = await getFileData(file);
    
    // Check format json valid
    let json = {};
    try {
      const text = atob(base64);
      json = JSON.parse(text);
    } catch (error){
      setMessageStatus(errorBadFormat);
      setVerificateProcess(prev => ({ ...prev, ...stateInvalidJson }));
      return Promise.reject(null)
    }

    const haveGoodFormat = jsonHaveGoodFormat(json)
    if (!haveGoodFormat){
      setMessageStatus(errorBadFormat);
      setVerificateProcess(prev => ({ ...prev, ...stateInvalidJson }));
      return Promise.reject(null)
    }

    if (json.pemPublic.length === 0){
      setMessageStatus(errorBadFormatNotPublicKey);
      setVerificateProcess(prev => ({ ...prev, ...stateInvalidJson }));
      return Promise.reject(null)
    }
    setVerificateProcess(prev => ({ ...prev, isValidJson: true }));

    //TODO: Traer la info y guardarla en al checkedInfo
    setMessageStatus(successLoaded);
    return Promise.resolve(json);
  }
  // Main process
  const saveFile = useCallback( async file => {
    setVerificateProcess(prev => ({ ...prev, step: PROCESSING }));
    const json = await readInfo(file);
    if (json){
      verifyFirmedDigest(json);
      // return list digest
      const digests = await checkIfDocumentExistInDecred([json.digestFirmed]);
      saveResultDecred(json, digests);
    }

  }, [])

  return (
    <Grid container justify="center">
      <Grid item className={clsx(classes.root, classes.margin)}>
        <Card className={clsx(classes.margin, classes.root, classes.card)}>
        <Typography variant="h5" component="h5" className={clsx(classes.title)}>
            Comprueba la validez y existencia de los archivos <br /> en la cadena de bloques de Decred
          </Typography>
          <Typography component="p" className={classes.document}>
            Nuestras <strong>Pruebas de Firmado</strong> tienen un formato propio. En estos se guarda en json la fecha en que se genera el fichero, el digest o hash256 del fichero original, el signature o resumen del documento que ha sido firmado por la llave privada, una copia de la llave pública para realizar la verificación, el digest que se genera del documento firmado y que se guarda en la cadena de bloques de Decred.
          </Typography>

        {/* Upload component */}
        {(verificateProcess.step === LOADING_FILE) &&
          <Grid item className={clsx(classes.grid)} >
            <UploadComprobateJson saveFile={saveFile} />
          </Grid>}

        {/* Resumen verificate */}
        {(verificateProcess.step !== LOADING_FILE) &&
          <Fragment>
              <ResumenVerificate 
                checkedInfo={checkedInfo}
              />
              <ListaVerificate
                verificateProcess={verificateProcess}
                responseDecred={responseDecred}
              />
            <div className={classes.buttonDiv}>
              <Button 
                variant="contained" 
                color="primary"
                onClick={onClickOtro}
              >Verificar otro</Button>
            </div>
          </Fragment>}
        
        </Card>
      </Grid>
      <Notification 
        open={messageStatus.show}
        onClose={() => setMessageStatus(initialStateMessage)}
        message={messageStatus.message}
        severity={messageStatus.severity}
      />
    </Grid>
  )
}

export default VerificatePage