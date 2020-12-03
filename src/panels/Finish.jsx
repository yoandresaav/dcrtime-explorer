import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import CardFinish from '../components/CardFinish';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      minWidth: '120ch',
    },
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
    fontSize: 18,
    paddingTop: 30,
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

const PanelFinish = ({data, propsKey}) => {
  const classes = useStyles()
  const pemPublic = propsKey.storeKey.pemPublic;
  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Grid item className={clsx(classes.instruction, classes.root)}>
        <Typography variant="h4" color="textSecondary" component="h4" className={classes.title}>
          Tu fichero se está guardando
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p" className={classes.subtitle}>
          El proceso de anclado en la cadena de bloques de Decred demora por lo general unos 30 minutos.
        </Typography>

        {(!!data.mail) &&
          <Typography variant="body1" color="textSecondary" component="p">
            Email: {data.email}
          </Typography>
        }

        {/* Card  */}
        {data.files.map((file, index) => (
          <CardFinish 
            key={index}
            file={file}
            data={data}
            pemPublic={pemPublic}
          />
        ))}

      </Grid>
    </Grid>
  )
}

export default PanelFinish