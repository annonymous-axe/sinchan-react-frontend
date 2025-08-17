// src/components/CustomForm.js
import { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import MainCard from '../../../ui-component/cards/MainCard';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SubTableForm from './purchaseItemTableForm';
import { savePurchase } from '../../../api/purchase-apis';

const CustomForm = ({ onBack, purchase }) => {

    // to handle form data
    const [formData, setFormData] = useState(purchase);

    const handleChange = (e) => {
        setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await savePurchase(formData);
        onBack();
    };



  return (
    <MainCard title="Farmer Form">
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="PO Number"
              name="poNumber"
              value={formData.poNumber}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Suplier"
              name="supplierNameEn"
              value={formData.supplierNameEn}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Purchase Date"
                value={formData.purchaseDate}
                onChange={(newValue) =>
                  setFormData((prev) => ({ ...prev, purchaseDate: newValue }))
                }
                slotProps={{ textField: { fullWidth: true, required: true } }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Bill No"
              name="billNo"
              value={formData.billNo}
              onChange={handleChange}
              required
            />
          </Grid>

          <SubTableForm purchase={formData} setPurchase={setFormData} tableTitle={"Item List"}/>

          {/* Buttons */}
          <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onBack}
            >
              Back
            </Button>
            {formData.id==null &&
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>            
            }
            {/* {formData.id!='' &&
              <>
              <Button variant="contained" color="primary" onClick={handleUdateFarmer}>
                Update
              </Button>
              <Button variant="contained" color="error" onClick={handleDeleteFarmer}>
                Delete
              </Button>
              </>
            } */}

          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default CustomForm;
