// src/components/CustomForm.js
import { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import MainCard from '../../../ui-component/cards/MainCard';
import SubTableForm from './quotationSubTableForm';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import { generateInvoice } from '../../../api/invoice-apis';
import Loader from '../../../ui-component/Loader';
import useConfig from '../../../hooks/useConfig';

const CustomForm = ({ onBack, invoice }) => {

    const{ lang } = useConfig();

    // to handle form data
    const [formData, setFormData] = useState(invoice);
    const [loading, setLoading] = useState(false);

    const handleGenerateInvoice = async(e) => {
      e.preventDefault();
      setLoading(true);
      generateInvoice(invoice.id, "quotation");
      setLoading(false);
    }

  return (
    <>
      {loading && <Loader />}
      <MainCard title="Invoice Form">
        <Box component="form">
          <Grid container spacing={3}>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Farmer Name"
                name="farmerName"
                value={lang ? formData.farmerNameMh : formData.farmerNameEn}
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
                value={formData.districtNameEn}
                InputProps={{ readonly: true }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tehsil"
                name="tehsilName"
                value={formData.tehsilNameEn}
                InputProps={{ readonly: true }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Manufacturer"
                name="manufacturer"
                value={formData.manufacturerNameEn}
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

            <SubTableForm invoice={formData} tableTitle={"Item List"} lang={lang}/>

            {/* Buttons */}
            <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={onBack}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleGenerateInvoice}
                startIcon={<SimCardDownloadIcon />}
              >
                Download
              </Button>
            </Grid>
          </Grid>
        </Box>
      </MainCard>
    </>
  );
};

export default CustomForm;
