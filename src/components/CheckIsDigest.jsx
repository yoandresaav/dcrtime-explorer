import React from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

const CheckIsDigest = ({res}) => {

  const {chaininformation} = res;

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }
  
  return (
    <List>
      <ListItem >
        <ListItemText 
          primary="Estado: El hash esta anclado en la blockchain de Decred." 
          secondary="Revisa haciendo click en la transacción"
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="comments">
            <CheckCircleOutlineIcon color="primary" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem  role={undefined} dense >
        <ListItemText primary={`Raiz de Merkle: ${chaininformation.merkleroot}`} />
      </ListItem>
      <ListItemLink href={`https://dcrdata.decred.org/tx/${chaininformation.transaction}`}>
        <ListItemText primary={'Tx: ' + chaininformation.transaction} />
      </ListItemLink>
    </List>
  )
}
export default CheckIsDigest;