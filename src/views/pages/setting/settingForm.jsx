import Grid from '@mui/material/Grid2';
import MainCard from '../../../ui-component/cards/MainCard';

import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import FontFamily from '../../../layout/Customization/FontFamily';

import i18n from '../../../i18n';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { Switch } from '@mui/material';
import { useState } from 'react';

// Loader
import { ScaleLoader  } from 'react-spinners';

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
  ({ theme }) => ({
    variants: [
      {
        props: { checked: true },
        style: {
          '.MuiFormControlLabel-label': {
            color: theme.palette.primary.main,
          },
        },
      },
    ],
  }),
);


function ControlLabel( props ){

  const radioGroup = useRadioGroup();

  let checked = false;

  const currentLang = i18n.language;

  if(radioGroup){
    checked = radioGroup.value === props.value;
    if(radioGroup.value === 'first'){
      checked = props.value === currentLang;
    }
  }

  return <StyledFormControlLabel checked={checked} {...props} />
}

ControlLabel.propTypes = {
  value: PropTypes.any
}

const CustomForm = ({ translate }) => {

  const [notification, setNotification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState();

  const loader = (taskName) => {
    setTask(taskName)
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
    window.location.reload();
  }

  const changeLanguage = (e) => {
    
    if(e.target.value){
      loader("Translating");
      i18n.changeLanguage(e.target.value);
    }
  }

  return (
    <MainCard title={translate("app.title.setting")}>
      <Grid size={12} sx={{ mb: 3 }}>
        <FontFamily loader={loader}/>
        <Divider />
      </Grid>
      <Grid size={12}>

        <Stack spacing={2.5} sx={{ p: 2, width: '100%' }}>

          <Typography 
            variant='h4'
          >
              Lanaguage
          </Typography>
            <Grid container spacing={1.25} sx={{ p: 1, }}>
            <RadioGroup name="use-radio-group" defaultValue="first" onClick={changeLanguage}>
              <ControlLabel value="mr" label="Marathi" control={<Radio />}/>
              <ControlLabel value="en" label="English" control={<Radio />} />
            </RadioGroup>
            </Grid>          
        </Stack>
      </Grid>
      <Divider />
      <Grid size={12}>
        <Stack spacing={2.5} sx={{ p: 2, width: '100%' }}>
          <Typography 
            variant='h4'
          >
              Other Settings
          </Typography>          
          <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between', padding: 1 }}>
            <Grid>
              <Typography variant="subtitle1">Allow Notifications</Typography>
            </Grid>
            <Grid>
              <Switch
                checked={notification}
                onChange={(e) => setNotification(e.target.checked)}
                name="sdm"
                size="small"
              />
            </Grid>
          </Grid>
        </Stack>
      </Grid>  
      
    {loading && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(4px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1300,
        }}
      >
        <Typography variant='h3' color='#8B5CF6'>{task}</Typography>
        <ScaleLoader  size={35} color="#8B5CF6" speed={1} />
      </div>
    )}
    </MainCard>
  );
};

export default CustomForm;