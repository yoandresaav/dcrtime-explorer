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
            primary="Comprobando que la firma del documento es correcta"
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
            primary="Verificando que el documento firmado existe en la blockchain de Decred"
            secondary={ verificateProcess.isExistInDecred ? "Verificado" : "No existe en la blockchain de decred"}
          />
          {ShowIcon(verificateProcess.isExistInDecred)}
        </ListItem>
    </List>
  )
}

export default ListaVerificate;