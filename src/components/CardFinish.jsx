import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Button, Paper, Typography, Card, CardHeader, CardContent, FormControl, Input, TextareaAutosize, TextField, FormHelperText, InputLabel, InputAdornment, IconButton } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '120ch',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  instruction: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  card: {
    padding: 4,
    marginBottom: 10,
    wordWrap: 'break-word'
  },
  margins: {
    marginTop: 20,
    outline: 'none',
  }
}));


const CardFinish = ({file}) => {

  const classes = useStyles()
  console.log('El file es ', file)
  return (
    <Card className={classes.card} variant="outlined">
      <CardHeader
        title={ `${file.name}` }
        subheader={file.size}
      />
      <CardContent>
        <TextField
          disabled={true}
          label="Digest del Documento"
          variant="outlined"
          fullWidth
          defaultValue={file.digest}
          className={clsx(classes.margins)}
        />
        <TextField
          disabled={true}
          label="Digest Firmado del Documento"
          variant="outlined"
          fullWidth
          defaultValue={file.digestFirmed || 'Sin digest firmado'}
          className={clsx(classes.margins)}
        />
        <TextField 
          disabled={true}
          label="Documento Firmado"
          rows={8}
          variant="outlined"
          multiline
          defaultValue={file.plainFirmed}
          className={clsx(classes.margins)}
          fullWidth
        />
      </CardContent>
    </Card>
  );
}

export default CardFinish;