// src/components/CustomForm.js
import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';
import { useEffect } from 'react';
import {useTheme} from '@mui/material/styles';
import MainCard from '../../../ui-component/cards/MainCard';
import { fetchDistrictList, fetchTehsilList } from '../../../api/util-apis';
import { saveFarmer, updateFarmer, deleteFarmer } from '../../../api/farmer-apis';
import SubTableForm from './invoiceCustomeForm';
import { fetchManufacturerList } from '../../../api/manufacturer-apis';
import { saveInvoice } from '../../../api/invoice-apis';

const CustomForm = ({ onBack, onGenerateInvoice, farmer, showInvoiceItemList }) => {

    // to handle form data
    const [formData, setFormData] = useState(farmer);

    const handleChange = (e) => {
        setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        saveFarmer(formData);
        onBack();
    };

    const handleUdateFarmer = (e) => {
      e.preventDefault();
      updateFarmer(formData);
      onBack();
    }

    const handleDeleteFarmer = (e) => {
      e.preventDefault();
      deleteFarmer(formData.id);
      onBack();
    }

    const handleGenerateInvoice = (e) => {
      e.preventDefault();
      onGenerateInvoice(formData);
    }

    const generateInvoice = (e) => {
      e.preventDefault();
      saveInvoice({...formData, farmer: formData.id});
      onBack();
    }

    const generateQuotation = (e) => {
      e.preventDefault();
      console.log("item details list : ");
      console.log("\n");
      console.log("Saving quotation....");
      onGenerateInvoice(formData);
    }

    // select fields list
    const sanchList = [
        { value: 'Thibak', label: 'Thibak' },
        { value: 'Tushar', label: 'Tushar' },
        { value: 'Mini-Sprinkal', label: 'Mini-Sprinkal' },
        { value: 'Micro-Sprinkal', label: 'Micro-Sprinkal' }
    ];

    const [tehsilList, setTehsilList] = useState([
        {
            talukaId: -1,
            talukaName: "--- Select ---"
        }
    ]);

    const [districtList, setDistrictList] = useState([
        {
            districtId: -1,
            districtName: "--- Select ---"
        }
    ]);

    const [manufacturerList, setManufacturerList] = useState([
        {
            id: -1,
            name: "--- Select ---"
        }
    ]);    

    // load the data at the time of initializing
    useEffect(() => {


        fetchDistrictList().then(data=>{
            
            setDistrictList(data || []);
        });

    }, []);

    useEffect(() => {


        fetchManufacturerList().then(data=>{
            
            setManufacturerList(data || []);
        });

    }, []);    

    useEffect(() => {

        fetchTehsilList(formData.district).then(data => {
            setTehsilList(data || []);            
        })

    }, [formData.district]);



  return (
    <MainCard title="Farmer Form">
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Farmer Name"
              name="farmerName"
              value={formData.farmerName}
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contact No."
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Aadhar ID"
              name="aadharId"
              value={formData.aadharId}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Farmer ID"
              name="farmerId"
              value={formData.farmerId}
              onChange={handleChange}
              required
            />
          </Grid>                    

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Sanch"
              name="sanch"
              value={formData.sanch}
              onChange={handleChange}
              required
            >
              {sanchList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="District"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
            >
              {districtList.map((district) => (
                <MenuItem key={district.districtName} value={district.districtId}>
                  {district.districtName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Tehsil"
              name="tehsil"
              value={formData.tehsil}
              onChange={handleChange}
              required
            >
              {tehsilList.map((tehsil) => (
                <MenuItem key={tehsil.talukaName} value={tehsil.talukaId}>
                  {tehsil.talukaName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {showInvoiceItemList &&
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Manufacturer"
                name="manufacturerId"
                value={formData.manufacturerId}
                onChange={handleChange}
                required
              >
                {manufacturerList.map((man) => (
                  <MenuItem key={man.id} value={man.id}>
                    {man.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid> 
          }             

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>      


          {showInvoiceItemList &&
            <SubTableForm invoice={formData} setInvoice={setFormData} tableTitle={"Invoice List"}/>
          }

          {/* Buttons */}
          <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onBack}
            >
              Back
            </Button>
            {formData.id=='' &&
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>            
            }
            {formData.id!='' && !showInvoiceItemList &&
              <>
              <Button variant="contained" color="primary" onClick={handleUdateFarmer}>
                Update
              </Button>
              <Button variant="contained" color="error" onClick={handleDeleteFarmer}>
                Delete
              </Button>
              <Button variant="contained" color="success" onClick={handleGenerateInvoice}>
                Generate Invoice/Quotation
              </Button>              
              </>
            }

            {formData.id!='' && showInvoiceItemList &&
              <>
                <Button variant="outlined" color="primary" onClick={generateInvoice}>
                  Generate Invoice
                </Button>
                <Button variant="outlined" color="primary" onClick={generateQuotation}>
                  Generate Quotation
                </Button>
              </>
            }            

          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default CustomForm;
