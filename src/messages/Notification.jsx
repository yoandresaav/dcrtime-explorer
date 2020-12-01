import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const  Notification = ({open, onClose, message, severity}) => {
  return (
    <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={onClose}
      >
        <Alert onClose={onClose} severity={severity}>
        {message}
        </Alert>
      </Snackbar>
  );
}

export default Notification;