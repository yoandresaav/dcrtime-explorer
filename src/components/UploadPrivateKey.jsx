import React, {useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import {baseStyle, activeStyle, acceptStyle, rejectStyle, containerStyle} from '../helpers/styles-uploads';
import {getFileData} from '../helpers/utils-file';
import {importPrivateKey, exportPrivateCryptoKey, exportPublicCryptoKey} from '../helpers/utils-keys';


const UploadPrivateKey = ({userPrivateKey, setUserPrivateKey}) => {

  // save private key
  const updateFileInfo = async file => {
    const base64 = await getFileData(file);
    const key = await importPrivateKey(base64);
    const privatePemKey = await exportPrivateCryptoKey(key);
    setUserPrivateKey(prev => ({ ...prev, pemPrivate: privatePemKey, key: {privateKey: key}}))
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
        <p>Arraste tu clave Privada PEM o click para seleccionarla</p>
      </div>
    </section>
  )
}

export default UploadPrivateKey;