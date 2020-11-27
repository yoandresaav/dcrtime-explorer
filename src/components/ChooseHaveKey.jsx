import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: 20,
    marginLeft: 20,
    display: 'inline-block',
  },
}));

const ChooseHaveKey = ({checkedA, handleChange, label}) => {
  const classes = useStyles()
  return (
    <FormGroup row className={clsx(classes.root)}>
      <FormControlLabel
        control={<Switch checked={checkedA} onChange={handleChange} name="checkedA" />}
        label={label}
      />
    </FormGroup>
  )
}

export default ChooseHaveKey 