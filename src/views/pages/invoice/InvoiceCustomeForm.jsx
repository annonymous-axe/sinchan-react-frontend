// src/components/CustomForm.js
import { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import MainCard from '../../../ui-component/cards/MainCard';
import SubTableForm from './InvoiceSubTableForm';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import { generateInvoice } from '../../../api/invoice-apis';
import Loader from '../../../ui-component/Loader';
import useConfig from '../../../hooks/useConfig';

const CustomForm = ({ onBack, invoice, translate }) => {

    const { lang } = useConfig();
    

    // to handle form data
    const [formData, setFormData] = useState(invoice);
    const [loading, setLoading] = useState(false);

    const handleGenerateInvoice = async(e) => {
      e.preventDefault();
      setLoading(true);
      generateInvoice(invoice.id, "invoice");
      setLoading(false);
    }

  return (
    <>
      {loading && <Loader />}
      <MainCard title={translate("app.title.invoiceFormTitle")}>
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
                value={lang ? formData.sanch : formData.sanch}
                InputProps={{ readonly: true }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="District"
                name="districtName"
                value={lang ? formData.districtNameMh : formData.districtNameEn}
                InputProps={{ readonly: true }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tehsil"
                name="tehsilName"
                value={lang ? formData.tehsilNameMh : formData.tehsilNameEn}
                InputProps={{ readonly: true }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Manufacturer"
                value={lang ? formData.manufacturerNameMh : formData.manufacturerNameEn}
                InputProps={{ readonly: true }}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={lang ? formData.addressMh : formData.addressEn}
                InputProps={{ readonly: true }}
                multiline
                rows={4}
              />
            </Grid>      

            <SubTableForm invoice={formData} tableTitle={translate("app.itemListTitle")} lang={lang} translate={translate}/>

            {/* Buttons */}
            <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={onBack}
              >
                {translate("app.back")}
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleGenerateInvoice}
                startIcon={<SimCardDownloadIcon />}
              >
                {translate("app.download")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </MainCard>
    </>
  );
};

export default CustomForm;
