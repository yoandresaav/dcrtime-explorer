import React from 'react'
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ProTip from '../components/ProTip';
import { Box, Grid, Button, FormControl, Input, TextareaAutosize, TextField, FormHelperText, InputLabel } from '@material-ui/core';
import 'fontsource-roboto';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import {signData} from '../helpers/utils-keys'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '110ch',
    padding: theme.spacing(3),
  },
  margin: {
    margin: theme.spacing(3),
    padding: theme.spacing(1),
  },
  title: {
    color: 'gray',
    textAlign: 'center',
  },
  card: {
    padding: 28,
    display: 'block',
  }, 
  document: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  grid: {
    textAlign: 'center',
  }
}));

const CheckPage = () => {
  const classes = useStyles()
  return (
    <Grid container justify="center">
      <Grid item className={clsx(classes.root, classes.margin)}>
        <Card className={clsx(classes.margin, classes.root, classes.card)}>
          <Typography variant="h4" component="h4" className={clsx(classes.title)}>
            Comprueba que los documentos ya estan registrados en la blockchain
          </Typography>
          <Typography component="p" className={classes.document}>
            Veniam est commodo eu aliquip do est culpa aliqua do quis. Voluptate velit exercitation do magna magna consectetur laborum ipsum. Voluptate deserunt cillum velit pariatur aute cupidatat sint ex velit. Anim labore qui elit dolore id anim commodo elit fugiat anim elit. Sint pariatur reprehenderit qui do enim. Minim nostrud nulla ullamco minim non voluptate laboris elit minim cupidatat.
          </Typography>
          <Grid item className={clsx(classes.grid)} >

          </Grid>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CheckPage