import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, TextField, IconButton } from '@material-ui/core';
import clsx from 'clsx';
import {bytesToSize} from '../helpers/utils-file';
import Avatar from '@material-ui/core/Avatar';
import DescriptionIcon from '@material-ui/icons/Description';
import GetAppIcon from '@material-ui/icons/GetApp';
import Tooltip from '@material-ui/core/Tooltip';
import {downloadJson} from '../helpers/utils-file';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '120ch',
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
    backgroundColor: '#E33E7F',
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
    wordWrap: 'break-word',
    borderRadius: 8,
  },
  margins: {
    marginTop: 20,
    outline: 'none',
  }
}));


const CardFinish = ({file, pemPublic}) => {

  const classes = useStyles()
  console.log(file)
  
  const generateJson = () => {
    const document = JSON.stringify({
      name: file.name,
      digestOriginal: file.digestOriginal,
      digestFirmed: file.digestFirmed,
      documentFirmed: file.plainFirmed,
      size: file.size,
      sizeHuman: bytesToSize(file.size),
      generated: new Date(),
      pemPublic,
    }, null, 2)
    downloadJson(`Firmed - ${file.name}.json`, document)
  }

  return (
    <Card className={classes.card} variant="outlined">
      <CardHeader
        title={ `Archivo: ${file.name}` }
        subheader={bytesToSize(file.size)}
        action={
          <Tooltip title="json format">
            <IconButton aria-label="download json format" onClick={generateJson}>
              <GetAppIcon />
            </IconButton>
          </Tooltip>
        }
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <DescriptionIcon />
          </Avatar>
        }
      />
      <CardContent>
        <TextField
          disabled={true}
          label="Digest del Documento"
          variant="outlined"
          fullWidth
          defaultValue={file.digestOriginal}
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