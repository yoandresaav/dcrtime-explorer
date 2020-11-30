import React, { Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CircularProgress from '@material-ui/core/CircularProgress';

const ListaVerificate = ({verificateProcess}) => {

  const switchIcon = (isDone) => {
    switch (isDone) {
      case null:
        return <CircularProgress size={25} />
      case 0:
      case 1:
      case true:
          return <DoneIcon color="primary" />
      default:
        return <CloseIcon color="error" />
    }
  }
  const ShowIcon = isDone => (
    <ListItemSecondaryAction>
        <IconButton edge="end">
          {switchIcon(isDone)}
        </IconButton>
      </ListItemSecondaryAction>)
  
  const existsInDecred = (resultDecred) => {
    /* Valid result 0 - Success, 1 - File not found in server , 2 - No anchored in server */
    switch (resultDecred) {
      case 0:
        return "En proceso de anclarse en la blockchain"
      case 1:
          return "El archivo se encuentra en el server"
      default: //2
        return "El archivo no existe en la blockchain de decred"
    }
  }

  return (
    <List>
      {/* Json is good format */}
        <ListItem>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText
            primary="Comprobando que el json es correcto"
            secondary={ verificateProcess.isValidJson ? "Correcto" : "Incorrecto"}
          />
          {ShowIcon(verificateProcess.isValidJson)}
        </ListItem>

        {/* Doc Signed Good */}
        <ListItem>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText
            primary="Comprobando la firma del documento"
            secondary={ verificateProcess.isValidFirmedDigest ? "Comprobado" : "Incorrecto"}
          />
          {ShowIcon(verificateProcess.isValidFirmedDigest)}
        </ListItem>

        {/* Doc exist in blockchain */}
        <ListItem>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText
            primary="Comprobando existencia en la blockchain de Decred"
            secondary={ existsInDecred(verificateProcess.resultDecred)}
          />
          {ShowIcon(verificateProcess.resultDecred)}
        </ListItem>
    </List>
  )
}

export default ListaVerificate;