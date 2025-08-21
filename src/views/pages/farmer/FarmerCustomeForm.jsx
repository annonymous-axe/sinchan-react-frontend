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
import { saveFarmer, updateFarmer, deleteFarmer, fetchSanchList } from '../../../api/farmer-apis';
import SubTableForm from './InvoiceSubTableForm';
import { fetchManufacturerList } from '../../../api/manufacturer-apis';
import { saveInvoice } from '../../../api/invoice-apis';
import { saveQuotation } from '../../../api/quotation-apis';
import { Sanscript } from '@indic-transliteration/sanscript';
import useConfig from '../../../hooks/useConfig';

const CustomForm = ({ onBack, onGenerateInvoice, farmer, showInvoiceItemList }) => {

    // to handle form data
    const [formData, setFormData] = useState(farmer);
    const { lang } = useConfig();

    const handleChange = async (e) => {
        setFormData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value
        }));

        if(e.target.name == 'farmerNameEn'){
          const opts = { syncope: true };
          setFormData((prev) => ({
            ...prev,
            farmerNameMh: Sanscript.t(e.target.value, "itrans", "devanagari", opts)
          }));
        }

        if(e.target.name == 'addressEn'){
          const opts = { syncope: true };
          setFormData((prev) => ({
            ...prev,
            addressMh: Sanscript.t(e.target.value, "itrans", "devanagari", opts)
          }));
        }        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await saveFarmer(formData);
        onBack();
    };

    const handleUdateFarmer = async (e) => {
      e.preventDefault();
      await updateFarmer(formData);
      onBack();
    }

    const handleDeleteFarmer = async (e) => {
      e.preventDefault();
      await deleteFarmer(formData.id);
      onBack();
    }

    const handleGenerateInvoice = async (e) => {
      e.preventDefault();
      await onGenerateInvoice(formData);
    }

    const generateInvoice = async (e) => {
      e.preventDefault();
      saveInvoice({...formData, farmer: formData.id});
      onBack();
    }

    const generateQuotation = (e) => {
      e.preventDefault();
      saveQuotation({...formData, farmer: formData.id})
      onBack();
    }

    const [sanchList, setSanchList] = useState([
        {
            intKey: -1,
            stringValue: "--- Select ---",
            stringValue2: ""
        }
    ]);    

    const [tehsilList, setTehsilList] = useState([
        {
            talukaId: -1,
            talukaNameEn: "--- Select ---",
            talukaNameMh: "--- Select ---"
        }
    ]);

    const [districtList, setDistrictList] = useState([
        {
            districtId: -1,
            districtNameEn: "--- Select ---",
            districtNameMh: "--- Select ---"
        }
    ]);

    const [manufacturerList, setManufacturerList] = useState([
        {
            id: -1,
            nameEn: "--- Select ---",
            nameMh: "--- Select ---"
        }
    ]);    

    // load the data at the time of initializing
    useEffect(() => {


        fetchDistrictList().then(data=>{
            
            setDistrictList(data || []);
        });


        fetchManufacturerList().then(data=>{
            
            setManufacturerList(data || []);
        });

        fetchSanchList().then(data=>{
            
            setSanchList(data || []);
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
              name="farmerNameEn"
              value={formData.farmerNameEn}
              onChange={(e) => {
                handleChange(e);
                translateTextToHindi(e);
              }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="शेतकरीचे नाव"
              name="farmerNameMh"
              value={formData.farmerNameMh}
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
                <MenuItem key={option.intKey} value={option.intKey}>
                  {lang ? option.stringValue : option.stringValue2}
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
                <MenuItem key={district.districtId} value={district.districtId}>
                  {lang ? district.districtNameEn : district.districtNameMh}
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
                <MenuItem key={tehsil.tehsilNameEn} value={tehsil.tehsilId}>
                  {lang ? tehsil.tehsilNameEn : tehsil.tehsilNameMh}
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
                    {lang ? man.nameEn : man.nameMh}
                  </MenuItem>
                ))}
              </TextField>
            </Grid> 
          }

          <Grid items xs={12} />

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Address"
              name="addressEn"
              value={formData.addressEn}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>
          
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="पत्ता"
              name="addressMh"
              value={formData.addressMh}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>                


          {showInvoiceItemList &&
            <SubTableForm invoice={formData} setInvoice={setFormData} tableTitle={"Item List"}/>
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
