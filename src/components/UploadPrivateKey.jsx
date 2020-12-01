import React, {useMemo, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {baseStyle, activeStyle, acceptStyle, rejectStyle, containerStyle} from '../helpers/styles-uploads';
import {getFileData} from '../helpers/utils-file';
import {importPrivateKey, exportPrivateCryptoKey, exportPublicCryptoKey} from '../helpers/utils-keys';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Notification from '../messages/Notification';

const UploadPrivateKey = ({userPrivateKey, setUserPrivateKey}) => {

  const [openBadDigest, setOpenBadDigest] = useState(false)

  const handleCloseBadDigest = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenBadDigest(false);
  }

  // save private key
  const updateFileInfo = async file => {
    if (file.type !== 'application/x-x509-ca-cert') {
      setOpenBadDigest(true);
      return;
    }
    const base64 = await getFileData(file);
    const key = await importPrivateKey(base64);
    const privatePemKey = await exportPrivateCryptoKey(key);
    setUserPrivateKey(prev => ({ ...prev, pemPrivate: privatePemKey, key: {privateKey: key}}))
  }

  const onDrop = React.useCallback( async acceptedFiles => {
    // Private PEM
    const file = acceptedFiles[0]; // only one pem
    try {
      await updateFileInfo(file)
    } catch (error) {
      setOpenBadDigest(true);
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    maxFiles: 1,
    onDrop,
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return (
    <section className="container" style={containerStyle}>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Arraste tu clave Privada PEM o click para seleccionarla</p>
        <VpnKeyIcon  style={{ fontSize: 60 }} />
      </div>
      <Notification 
        open={openBadDigest}
        onClose={handleCloseBadDigest}
        message={'No es una llave privada válida'}
        severity={"error"}
      />
    </section>
  )
}

export default UploadPrivateKey;