import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import {isDigestAnchored, isDigestAnchorPending, isDigestFound} from '../helpers/api-decred';
import TypoVeryLarge from '../components/TypoVeryLarge';

const useStyles = makeStyles((theme) => ({
  lextLong: {
    overflow: "hidden", 
    textOverflow: "ellipsis", 
    width: '3rem'
  }
}));

// overflow-wrap: break-word; 
const ListaVerificate = ({verificateProcess, responseDecred}) => {

  const classes = useStyles()

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
  
  const existsInDecred = (responseDecred) => {
    /* Valid result 0 - Success, 1 - File not found in server , 2 - No anchored in server */
    if (responseDecred && isDigestAnchored(responseDecred)){
      return "El archivo se encuentra anclado en la cadena de bloques de Decred"
    } else if (responseDecred && isDigestAnchorPending(responseDecred)){
      return "En proceso de anclarse en la cadena de bloques de Decred"
    } else if (responseDecred && isDigestFound(responseDecred)){
      return "El archivo esta en proceso de anclarse en la cadena de bloques de Decred"
    } else {
      return "El archivo no esta anclado en la cadena de bloques de Decred"
    }
  }

  const resolveTx = digest => {
    const {chaininformation} = digest;
    return  {tx: chaininformation.transaction, merkle: chaininformation.merkleroot} 
  }

  const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
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
            primary="Comprobando la firma del archivo"
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
            primary="Comprobando existencia en la cadena de bloques de Decred"
            secondary={ existsInDecred(responseDecred)}
          />
          {ShowIcon(verificateProcess.resultDecred)}
        </ListItem>

        {/* Comprobate merkle transaction */}
        {(responseDecred && isDigestAnchored(responseDecred)) &&
          <Fragment>
            <ListItem>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText
                primary="Raiz de Merkle. Comprueba haciendo click en la transacción"
                secondary={ <TypoVeryLarge title={resolveTx(responseDecred).merkle} /> }
                className={classes.lextLong}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemLink href={`https://dcrdata.decred.org/tx/${resolveTx(responseDecred).tx}`}>
                <ListItemText 
                  className={classes.lextLong} 
                  primary={<TypoVeryLarge  title={`Tx: ${resolveTx(responseDecred).tx}`} />}
                />
              </ListItemLink>
            </ListItem>
          </Fragment>
        }
    </List>
  )
}

export default ListaVerificate;