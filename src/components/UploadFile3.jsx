import React, {useMemo} from 'react';
import {useDropzone} from 'react-dropzone';

import {createDigest} from '../helpers/create-digest'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};


const UploadFile3 = ({ files, updateForm }) => {

  
  const onDrop = React.useCallback( async acceptedFiles => {
    // Add digest to file 
    const copyFiles = await Promise.all( acceptedFiles.map( async (file) => {
      file.digest = await createDigest(file)
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

  const containerStyle = {
    width: '100%',
  }

  
  const showFiles = files.map(file => (
    <li key={file.path}>
      {file.path} - {bytesToSize(file.size)} bytes <br />
      <br />
      <br />
      {file.digest} <br />
    </li>
  ));

  function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
 }

  return (
    <section className="container" style={containerStyle}>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {(files.length > 0) &&<aside>
        <h4>Files</h4>
        <ul>{showFiles}</ul>
      </aside>}
      
    </section>
  )
}
export default UploadFile3