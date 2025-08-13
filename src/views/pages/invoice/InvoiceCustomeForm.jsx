// src/components/CustomForm.js
import { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';
import { useEffect } from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import { fetchDistrictList, fetchTehsilList } from '../../../api/util-apis';
import { saveFarmer, updateFarmer, deleteFarmer } from '../../../api/farmer-apis';
import SubTableForm from './InvoiceSubTableForm';
import { fetchManufacturerList } from '../../../api/manufacturer-apis';
import { saveInvoice } from '../../../api/invoice-apis';

const CustomForm = ({ onBack, invoice }) => {

    // to handle form data
    const [formData, setFormData] = useState(invoice);

  return (
    <MainCard title="Invoice Form">
      <Box component="form">
        <Grid container spacing={3}>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Farmer Name"
              name="farmerName"
              value={formData.farmerName}
              InputProps={{ readonly: true }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              InputProps={{ readonly: true }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contact No."
              name="contactNo"
              value={formData.contactNo}
              InputProps={{ readonly: true }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Aadhar ID"
              name="aadharId"
              value={formData.aadharId}
              InputProps={{ readonly: true }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Farmer ID"
              name="farmerId"
              value={formData.farmerId}
              InputProps={{ readonly: true }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Sanch"
              name="sanch"
              value={formData.sanch}
              InputProps={{ readonly: true }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="District"
              name="districtName"
              value={formData.districtName}
              InputProps={{ readonly: true }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Tehsil"
              name="tehsilName"
              value={formData.tehsilName}
              InputProps={{ readonly: true }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Manufacturer"
              name="manufacturer"
              value={formData.manufacturerName}
              InputProps={{ readonly: true }}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              InputProps={{ readonly: true }}
              multiline
              rows={4}
            />
          </Grid>      

          <SubTableForm invoice={formData} tableTitle={"Invoice List"}/>

          {/* Buttons */}
          <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onBack}
            >
              Back
            </Button>

          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default CustomForm;
