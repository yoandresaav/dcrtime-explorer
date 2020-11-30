import React from 'react';
import Typography from '@material-ui/core/Typography';

const ResumenVerificate = ({checkedInfo}) => {
  const {name, sizeHuman, digestFirmed, digestOriginal} = checkedInfo;
  console.log(
    checkedInfo)
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
      <Typography component="h4">
        Hash original: {digestOriginal}
      </Typography>
      <Typography component="h4">
        Hash firmado: {digestFirmed}
      </Typography>
    </div>
  )
}

export default ResumenVerificate;