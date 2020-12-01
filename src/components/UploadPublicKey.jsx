import React, {useMemo, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {baseStyle, activeStyle, acceptStyle, rejectStyle, containerStyle} from '../helpers/styles-uploads';
import {getFileData} from '../helpers/utils-file';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Notification from '../messages/Notification';

const UploadPublicKey = ({setUserPrivateKey}) => {

  const [openBadDigest, setOpenBadDigest] = useState(false)

  const handleCloseBadDigest = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenBadDigest(false);
  }

  // For save in json
  const updateFileInfo = async file => {
    // Check type
    if (file.type !== 'application/x-x509-ca-cert') {
      setOpenBadDigest(true);
      return;
    }

    const base64 = await getFileData(file);
    const decoded = atob(base64);
    let pemPublic = decoded.toString();
    // Check if is valid
    if ((pemPublic.includes('-----BEGIN PUBLIC KEY-----')) && (pemPublic.includes('-----END PUBLIC KEY-----'))){
      // I can get public key from Prueba de Propiedad 
      setUserPrivateKey( prev => ({ ...prev, pemPublic}));
    } else {
      // Its not valid
      setOpenBadDigest(true);
      return;
    }
    // Save
  }

  const onDrop = React.useCallback( async acceptedFiles => {
    // Private PEM
    const file = acceptedFiles[0]; // only one pem
    updateFileInfo(file)
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
        <p>Arraste tu clave Publica PEM o click para seleccionarla</p>
        <VpnKeyIcon  style={{ fontSize: 60 }} />
      </div>
      <Notification 
        open={openBadDigest}
        onClose={handleCloseBadDigest}
        message={'No es una llave publica válida'}
        severity={"error"}
      />
    </section>
  )
}

export default UploadPublicKey;