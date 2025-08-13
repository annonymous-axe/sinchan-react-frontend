import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import MainCard from '../../../ui-component/cards/MainCard';
import { fetchCategoryList } from '../../../api/category-apis';
import { fetchManufacturerList } from '../../../api/manufacturer-apis';
import { saveItem, updateItem, deleteItem } from '../../../api/item-apis';

const CustomForm = ({ onBack, item }) => {
  const [formData, setFormData] = useState(item);
  const [categoryList, setCategoryList] = useState([]);
  const [manufacturerList, setManufacturerList] = useState([]);

  // Dynamic subtable state
  const [itemManufacturerDetailsList, setItemManufacturerDetailsList] = useState([
      { 
        id: -1,
        manufacturerId: -1,
        cmlNumber: '',
        rate: 0,
        quantity: 0,
        itemId: ''
      }
  ]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Handle change for subtable
  const handleItemChange = (index, field, value) => {
    const updatedList = [...itemManufacturerDetailsList];
    updatedList[index][field] = value;
    setItemManufacturerDetailsList(updatedList);
  };

  const addItemRow = () => {
    setItemManufacturerDetailsList([...itemManufacturerDetailsList, { id: -1,manufacturerId: -1,cmlNumber: '',rate: 0,quantity: 0,itemId: '' }]);
  };

  const removeItemRow = (index) => {
    const updatedList = [...itemManufacturerDetailsList];
    updatedList.splice(index, 1);
    setItemManufacturerDetailsList(updatedList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveItem({ ...formData, itemManufacturerDetailsList: itemManufacturerDetailsList });
    onBack();
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    updateItem({ ...formData, itemManufacturerDetailsList: itemManufacturerDetailsList });
    onBack();
  };

  const handleDeleteItem = (e) => {
    e.preventDefault();
    deleteItem(formData.id);
    onBack();
  };

  useEffect(() => {
    if (item?.itemManufacturerDetailsList?.length) {
      setItemManufacturerDetailsList(item.itemManufacturerDetailsList);
    } else {
      setItemManufacturerDetailsList([{ id: -1, manufacturerId: -1, cmlNumber: '', rate: 0, quantity: 0, itemId: '' }]);
    }
    setFormData(item);
  }, [item]);


  useEffect(() => {
    fetchCategoryList().then((data) => {
      setCategoryList(data || []);
    });

    fetchManufacturerList().then((data) => {
      setManufacturerList(data || []);
    });
  }, []);

  return (
    <MainCard title="Item Form">
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          {/* Main Form Fields */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Item Name"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Category"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
            >
              {categoryList.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Measurement Type"
              name="measurementType"
              value={formData.measurementType}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Gst Rate"
              name="gstRate"
              value={formData.gstRate}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Subtable */}
          <Grid item xs={12}>
            <MainCard title="Item List" content={false}>
              <Paper variant="outlined" sx={{ overflowX: 'auto' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Manufacturer</TableCell>
                      <TableCell>CML Number</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Rate</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {itemManufacturerDetailsList.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <TextField
                            select
                            fullWidth
                            size="small"
                            value={row.manufacturerId}
                            onChange={(e) =>
                              handleItemChange(index, 'manufacturerId', e.target.value)
                            }
                          >
                            {manufacturerList.map((m) => (
                              <MenuItem key={m.id} value={m.id}>
                                {m.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </TableCell>
                        <TableCell>
                          <TextField
                            fullWidth
                            size="small"
                            value={row.cmlNumber}
                            onChange={(e) =>
                              handleItemChange(index, 'cmlNumber', e.target.value)
                            }
                          />
                        </TableCell>                        
                        <TableCell>
                          <TextField
                            fullWidth
                            size="small"
                            type="number"
                            value={row.quantity}
                            onChange={(e) =>
                              handleItemChange(index, 'quantity', e.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            fullWidth
                            size="small"
                            type="number"
                            value={row.rate}
                            onChange={(e) =>
                              handleItemChange(index, 'rate', e.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="error"
                            onClick={() => removeItemRow(index)}
                            disabled={itemManufacturerDetailsList.length === 1}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        <Button
                          startIcon={<Add />}
                          variant="outlined"
                          onClick={addItemRow}
                        >
                          Add Row
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </MainCard>
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
