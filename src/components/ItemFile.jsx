import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import DescriptionIcon from '@material-ui/icons/Description';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ItemFile = ({name, digest, size}) => {
  const classes = useStyles();

  return (
      <ListItem>
        <ListItemAvatar>
          <Tooltip title={size}>
            <Avatar>
              <DescriptionIcon />
            </Avatar>
          </Tooltip>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={digest} />
      </ListItem>
  );
}

export default ItemFile