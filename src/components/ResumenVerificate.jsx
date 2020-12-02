import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TypoVeryLarge from './TypoVeryLarge';


const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden", 
    textOverflow: "ellipsis", 
    width: '18rem',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
  }
}));

const ResumenVerificate = ({checkedInfo}) => {


  const classes = useStyles();

  const {name, sizeHuman, digestFirmed, digestOriginal} = checkedInfo;
  return (
    <div className={classes.root}>
      <Typography component="h4" variant="h5">
        Resumen
      </Typography>
      <Typography component="h4">
        Archivo: {name}
      </Typography>
      <Typography component="h4">
        Tamaño: {sizeHuman}
      </Typography>
      <br />
      <Typography component="h4">
        Hash verificados
      </Typography>
      <TypoVeryLarge title={`original: ${digestOriginal}`} />
      <TypoVeryLarge title={`firmado: ${digestFirmed}`} />
    </div>
  )
}

export default ResumenVerificate;