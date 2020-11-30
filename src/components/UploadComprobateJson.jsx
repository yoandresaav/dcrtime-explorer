import React, { useMemo, Fragment } from 'react';
import {useDropzone} from 'react-dropzone';

import {baseStyle, activeStyle, acceptStyle, rejectStyle, containerStyle} from '../helpers/styles-uploads';

const UploadComprobateJson = ({saveFile}) => {

  const onDrop = React.useCallback(async acceptedFiles => {
    saveFile(acceptedFiles[0])
  }, [])

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
    <Fragment>
      <section className="container" style={containerStyle}>
        <div {...getRootProps({style})}>
          <input {...getInputProps()} />
          <p>Arraste el(los) archivo(s), o click para seleccionar un fichero verificable</p>
        </div>
      </section>
    </Fragment>
  )
}

export default UploadComprobateJson