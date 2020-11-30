import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import DescriptionIcon from '@material-ui/icons/Description';
import Tooltip from '@material-ui/core/Tooltip';
import TypoVeryLarge from './TypoVeryLarge';

const ItemFile = ({name, digestOriginal, size}) => {

  return (
      <ListItem>
        <ListItemAvatar>
          <Tooltip title={size}>
            <Avatar>
              <DescriptionIcon />
            </Avatar>
          </Tooltip>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={ <TypoVeryLarge  title={digestOriginal} />} />
      </ListItem>
  );
}

export default ItemFile