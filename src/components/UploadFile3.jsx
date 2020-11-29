import React, {useMemo} from 'react';
import {useDropzone} from 'react-dropzone';

import ListFile from '../components/ListFile'
import ItemFile from '../components/ItemFile'

import {createDigest} from '../helpers/create-digest';
import {bytesToSize} from '../helpers/utils-file';

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
    minWidth: '80ch',
    display: 'block',
  }

  
  const showFiles = files.map(file => (
    <ItemFile
      key={file.digest}
      name={file.path}
      size={bytesToSize(file.size)}
      digest={file.digest}
    />
  ));

  return (
    <section className="container" style={containerStyle}>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {(files.length > 0) &&<aside>
        <h4>Files</h4>
        <ListFile>
          <ul>{showFiles}</ul>
        </ListFile>
      </aside>}
      
    </section>
  )
}
export default UploadFile3