import React from 'react';
import Typography from '@material-ui/core/Typography';

const ResumenVerificate = ({checkedInfo}) => {
  const {name, sizeHuman} = checkedInfo;
  return (
    <div>
      <Typography component="h4" variant="h5">
        Resumen
      </Typography>
      <Typography component="h4">
        Archivo: {name}
      </Typography>
      <Typography component="h4">
        Tamaño: {sizeHuman}
      </Typography>
    </div>
  )
}

export default ResumenVerificate;