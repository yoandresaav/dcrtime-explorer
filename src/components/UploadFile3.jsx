import React, {useMemo} from 'react';
import {useDropzone} from 'react-dropzone';

import ListFile from '../components/ListFile'
import ItemFile from '../components/ItemFile'

import {createDigest} from '../helpers/api-decred';
import {bytesToSize} from '../helpers/utils-file';
import {baseStyle, activeStyle, acceptStyle, rejectStyle, containerStyle} from '../helpers/styles-uploads';


const UploadFile3 = ({ files, updateForm }) => {

  const onDrop = React.useCallback( async acceptedFiles => {
    // Add digest to file 
    const copyFiles = await Promise.all( acceptedFiles.map( async (file) => {
      file.digestOriginal = await createDigest(file)
      return file
    }))
    updateForm({files: copyFiles})
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    maxFiles: 10,
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

  const showFiles = files.map(file => (
    <ItemFile
      key={file.digestOriginal}
      name={file.path}
      size={bytesToSize(file.size)}
      digestOriginal={file.digestOriginal}
    />
  ));

  return (
    <section className="container" style={containerStyle}>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Arraste el(los) archivo(s), o click para seleccionar un fichero</p>
      </div>
      {(files.length > 0) &&<aside>
        <h4>Archivos</h4>
        <ListFile>
          <ul>{showFiles}</ul>
        </ListFile>
      </aside>}
    </section>
  )
}
export default UploadFile3