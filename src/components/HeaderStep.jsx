import React, {useState, useEffect} from 'react';
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
    marginLeft: theme.spacing(2),
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
  return ['Entra tu correo', 'Sube los ficheros', 'Firmalos'];
}

const PREV_PAGE_UPLOAD_FILE = 1;
const PREV_PAGE_FIRM = 2;

const HeaderStep = ({data, updateForm, propsKey, onLastStep, resetData}) => {
 
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  useEffect(()=> {
    setErrors(false)
  }, [data.files, propsKey.storeKey.key, propsKey.storeKey.pemPublic  ])

  const setOnError = () => {
      setErrors(true)
      setLoading(false)
  }

  const handleNext = async () => {
    setLoading(true);
    setErrors(false);

    // check if exist file
    if (activeStep === PREV_PAGE_UPLOAD_FILE && data.files.length === 0){
      setOnError(); return;
    }

    // check if keys exist
    if (activeStep === PREV_PAGE_FIRM && (propsKey.storeKey.key === null || propsKey.storeKey.pemPublic === '' )){
      setOnError(); return;
    }

    // Is last step
    if (isLastStep()){
      await onLastStep()
    }

    // Go to new page
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setLoading(false)
  };

  const handleBack = () => {
    setErrors(false);
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
        return <Panel_2  errors ={errors} data={data} updateForm={updateForm} />;
      case 2:
        return <Panel_3  errors ={errors} propsKey={propsKey} />;
      default:
        return 'Ha ocurrido un error';
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
            <Button onClick={handleReset} className={classes.button} variant="contained" color="primary" disableElevation>
              Firmar otros
            </Button>
          </div>
        ) : (
          <div>
            <div className={classes.instructions}>{getStepContent(activeStep)}</div>

            <div className={classes.buttonDiv}>
              <Button disabled={activeStep === 0 || loading} onClick={handleBack} className={classes.button}>
                Atrás
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={loading}
                className={classes.button}
              >
                {isLastStep() ? 'Firmar' : 'Siguiente'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderStep