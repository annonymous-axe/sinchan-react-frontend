import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button
} from '@mui/material';
import MainCard from '../../../ui-component/cards/MainCard';
import { saveManufacturer, updateManufacturer, deleteManufacturer } from '../../../api/manufacturer-apis';

const CustomForm = ({ onBack, manufacturer }) => {
  const [formData, setFormData] = useState(manufacturer);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveManufacturer(formData);
    onBack();
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    updateManufacturer(formData);
    onBack();
  };

  const handleDeleteItem = (e) => {
    e.preventDefault();
    deleteManufacturer(formData.id);
    onBack();
  };

  return (
    <MainCard title="Category Form">
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          {/* Main Form Fields */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Category Name"
              name="name"
              value={formData.name}
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
