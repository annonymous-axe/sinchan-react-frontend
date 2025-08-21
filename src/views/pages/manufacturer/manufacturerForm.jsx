import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button
} from '@mui/material';
import MainCard from '../../../ui-component/cards/MainCard';
import { saveManufacturer, updateManufacturer, deleteManufacturer } from '../../../api/manufacturer-apis';
import Sanscript from '@indic-transliteration/sanscript';

const CustomForm = ({ onBack, manufacturer }) => {
  const [formData, setFormData] = useState(manufacturer);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

    if(e.target.name == 'nameEn'){
      const opts = { syncope: true };
      setFormData((prev) => ({
        ...prev,
        nameMh: Sanscript.t(e.target.value, "itrans", "devanagari", opts)
      }));
    }    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveManufacturer(formData);
    onBack();
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    await updateManufacturer(formData);
    onBack();
  };

  const handleDeleteItem = async (e) => {
    e.preventDefault();
    await deleteManufacturer(formData.id);
    onBack();
  };

  return (
    <MainCard title="Manufacturer Form">
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          {/* Main Form Fields */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Manufacturer Name"
              name="nameEn"
              value={formData.nameEn}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="निर्माताचे नाव"
              name="nameMh"
              value={formData.nameMh}
              onChange={handleChange}
              required
            />
          </Grid>          

          {/* Action Buttons */}
          <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" color="secondary" onClick={onBack}>
              Back
            </Button>
            {formData.id === '' ? (
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            ) : (
              <>
                <Button variant="contained" color="primary" onClick={handleUpdateItem}>
                  Update
                </Button>
                <Button variant="contained" color="error" onClick={handleDeleteItem}>
                  Delete
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default CustomForm;
