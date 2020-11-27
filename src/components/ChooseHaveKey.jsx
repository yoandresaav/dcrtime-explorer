import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const ChooseHaveKey = ({checkedA, handleChange, label}) => {
  return (
    <FormGroup row>
      <FormControlLabel
        control={<Switch checked={checkedA} onChange={handleChange} name="checkedA" />}
        label={label}
      />
    </FormGroup>
  )
}

export default ChooseHaveKey 