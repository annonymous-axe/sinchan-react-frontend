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

  const changeLanguage = (e) => {
    if(e.target.value){
      i18n.changeLanguage(e.target.value);
    }
  }

  return (
    <MainCard title={translate("app.title.setting")}>
      <Grid size={12} sx={{ mb: 3 }}>
        <FontFamily />
        <Divider />
      </Grid>
      <Grid size={12}>

        <Stack spacing={2.5} sx={{ p: 2, width: '100%' }}>

          <Typography 
            variant='h4'
          >
              Lanaguage
          </Typography>
          <Grid container spacing={1.25}>
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
          <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
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
    </MainCard>
  );
};

export default CustomForm;