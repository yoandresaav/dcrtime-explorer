import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  }
}));

const Copyright = () => {
  const classes = useStyles()
  return (
    <Typography variant="body2" color="textSecondary" align="center" className={classes.root}>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        decred
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
export default Copyright