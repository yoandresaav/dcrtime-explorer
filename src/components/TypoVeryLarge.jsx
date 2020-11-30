import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowWrap: 'break-word'
  }
}));

const TypoVeryLarge = ({title}) => {
  const classes = useStyles();
  return (
    <Typography noWrap component="p" variant="body2"  className={classes.root}>{title}</Typography>
  )
}

export default TypoVeryLarge