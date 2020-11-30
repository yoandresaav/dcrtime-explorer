import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const ListFile = ({children}) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {children}
    </List>
  );
}

export default ListFile