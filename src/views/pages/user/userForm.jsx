import Grid from '@mui/material/Grid2';
import MainCard from '../../../ui-component/cards/MainCard';

import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useEffect, useState } from 'react';

// Loader
import { ScaleLoader  } from 'react-spinners';
import { Button, IconButton, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { getUser, saveUser } from '../../../api/user-apis';
import { useNavigate } from 'react-router';

const UserCustomeForm = ({ user, translate }) => {

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(user);
  const [task, setTask] = useState('');
  const [blob, setBlob] = useState(null);
  const navigate = useNavigate();

  const loader = (taskName) => {
    setTask(taskName)
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  useEffect(() => {
      getUser().then(data => setFormData(data.data));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    
  }

  const handleImageChange =(e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setBlob(URL.createObjectURL(file));
    if(file){
      setFormData((prevVal) => ({
        ...prevVal,
        image: file
      }));
    }
  }

  const handleUpdateUser = (e) => {
    e.preventDefault();

    const saveFormData = new FormData();
    saveFormData.append("image", formData.image);
    saveFormData.append("fullNameEn", formData.fullNameEn);
    saveFormData.append("fullNameMh", formData.fullNameMh);
    saveFormData.append("firmNameEn", formData.firmNameEn);
    saveFormData.append("firmNameMh", formData.firmNameMh);
    saveFormData.append("email", formData.email);
    saveFormData.append("contactNumber", formData.contactNumber);
    saveFormData.append("gstNumber", formData.gstNumber);
    saveFormData.append("addressEn", formData.addressEn);
    saveFormData.append("addressMh", formData.addressMh);

    saveUser(saveFormData);
    navigate("/");
  }

  return (
    <MainCard title={translate("app.title.userAccount")}>
      <Stack mb={5} display={'flex'} sx={{justifyContent: 'center', alignItems: 'center'}}>
        <Avatar src={blob} sx={{width: 150, height: 150, marginBottom: 3}}/>

        <input
          type='file'
          accept='image/*'
          id='company-logo'
          onChange={handleImageChange}
          style={{display: 'none'}}
        />

        <label htmlFor='company-logo'>
          <Button color='primary' variant='outlined' component='span' >
            Update Image
          </Button>
        </label>
      </Stack>
      <Divider />
      <Grid container spacing={3} mt={5} mb={3}>
        <Grid size={{xs: 12, sm: 12}}>
          <TextField
            fullWidth
            label="Full Name"
            name='fullNameEn'
            value={formData.fullNameEn}
            onChange={handleChange}
            required
          />        
        </Grid>
        <Grid size={{xs: 12, sm: 12}}>
          <TextField
            fullWidth
            label="Firm Name"
            name='firmNameEn'
            value={formData.firmNameEn}
            onChange={handleChange}
            required
          />        
        </Grid>        
        <Grid size={{xs: 12, sm: 6}}>
          <TextField
            fullWidth
            value={formData.email}
          />        
        </Grid>
        <Grid size={{xs: 12, sm: 6}}>
          <TextField
            fullWidth
            label="Contact No."
            name='contactNumber'
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />        
        </Grid>
        <Grid size={{xs: 12, sm: 12}}>
          <TextField
            fullWidth
            label="Address"
            name='addressEn'
            value={formData.addressEn}
            onChange={handleChange}
            required
          />        
        </Grid>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="contained" color="primary" onClick={handleUpdateUser}>
          {translate("app.update")}
        </Button>
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

export default UserCustomeForm;