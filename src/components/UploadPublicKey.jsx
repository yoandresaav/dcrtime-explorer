import React, {useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import {baseStyle, activeStyle, acceptStyle, rejectStyle, containerStyle} from '../helpers/styles-uploads';
import {getFileData} from '../helpers/utils-file';

const UploadPublicKey = ({setUserPrivateKey}) => {

  // For save in json
  const updateFileInfo = async file => {
    const base64 = await getFileData(file);
    const decoded = atob(base64);
    const pemPublic = decoded.toString();
    setUserPrivateKey( prev => ({ ...prev, pemPublic}));
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
      </div>
    </section>
  )
}

export default UploadPublicKey;