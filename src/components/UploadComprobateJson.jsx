import React, { useMemo, Fragment } from 'react';
import {useDropzone} from 'react-dropzone';
import {baseStyle, activeStyle, acceptStyle, rejectStyle, containerStyle} from '../helpers/styles-uploads';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';


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
          <p>Arraste o click para seleccionar un Archivo de Verificación</p>
          <AssignmentTurnedInIcon  style={{fontSize: 60}} />
        </div>
      </section>
    </Fragment>
  )
}

export default UploadComprobateJson