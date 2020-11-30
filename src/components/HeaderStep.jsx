import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

import Panel_1 from '../panels/Panel_1'
import Panel_2 from '../panels/Panel_2'
import Panel_3 from '../panels/Panel_3'
import PanelFinish from '../panels/Finish'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  buttonDiv: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    textAlign: 'right',
    paddingRight: 30,
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: '100%',
    minHeight: '70ch',
    [theme.breakpoints.up('md')]: {
      width: '100ch',
    }
  },
}));

function getSteps() {
  return ['Input data', 'Upload files', 'Create an ad'];
}

const HeaderStep = ({data, updateForm, propsKey, onLastStep, resetData}) => {
 
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    setLoading(true)
    if (isLastStep()){
      await onLastStep()
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setLoading(false)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    resetData();
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Panel_1 data={data} updateForm={updateForm} />;
      case 1:
        return <Panel_2 data={data} updateForm={updateForm} />;
      case 2:
        return <Panel_3  propsKey={propsKey} />;
      default:
        return 'Unknown step';
    }
  }

  const isLastStep = () => (activeStep === steps.length - 1)

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <PanelFinish data={data} propsKey={propsKey} />
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <div className={classes.instructions}>{getStepContent(activeStep)}</div>

            <div className={classes.buttonDiv}>
              <Button disabled={activeStep === 0 || loading} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={loading}
                className={classes.button}
              >
                {isLastStep() ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderStep