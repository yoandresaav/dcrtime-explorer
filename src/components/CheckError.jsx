import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const CheckError = ({title}) => {

  return (
    <List>
      <ListItem >
        <ListItemText primary={title} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="comments">
            <CloseIcon color="error" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  )
}
export default CheckError;