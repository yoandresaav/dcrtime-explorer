import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Box, Grid, Button, Paper, Typography, Card, CardHeader, CardContent, FormControl, Input, TextareaAutosize, TextField, FormHelperText, InputLabel, InputAdornment, IconButton } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

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
    width: '80%',
    wordWrap: 'break-word'
  },
  margins: {
    marginTop: 20,
    outline: 'none',
  }
}));

const PanelFinish = ({data, propsKey}) => {
  const classes = useStyles()

  console.log('Digest firmado: ', data.files[0].digestFirmed)

  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Grid item className={clsx(classes.instruction, classes.root)}>
        <Typography variant="h4" color="textSecondary" component="h4" className={classes.title}>
          Tu documento se está guardando
        </Typography>

        <Typography variant="body4" color="textSecondary" component="p" className={classes.subtitle}>
          Recibirás un correo con los datos cuando tu documento ya este registrado
        </Typography>

          <Typography variant="body1" color="textSecondary" component="p">
            Email: {data.email}
          </Typography>
          <br />
          
          {data.files.map((file, index) => (
            <Card className={classes.card}>
              <CardHeader
                title={ `${file.name}` }
                subheader={file.size}
              />
              <CardContent>
                <TextField 
                  label="Digest del Documento"
                  variant="outlined"
                  fullWidth
                  defaultValue={file.digest}
                  className={clsx(classes.margins)}
                />
                <TextField 
                  label="Digest Firmado del Documento"
                  variant="outlined"
                  fullWidth
                  defaultValue={file.digestFirmed}
                  className={clsx(classes.margins)}
                />
                <TextField 
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

          ))}

      </Grid>
    </Grid>
  )
}

export default PanelFinish