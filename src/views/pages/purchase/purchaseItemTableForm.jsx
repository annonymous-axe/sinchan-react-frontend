import { useState, useEffect } from 'react';
import {
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
  Paper,
  Typography,
  Box
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import MainCard from '../../../ui-component/cards/MainCard';
import { fetchCategoryList } from '../../../api/category-apis';
import { fetchItemListFromCategoryId, fetchItemDetailsFromItemId, fetchUnitList } from '../../../api/item-apis';
import { fetchManufacturerList } from '../../../api/manufacturer-apis';

const SubTableForm = ({ purchase, setPurchase, tableTitle, lang }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const [manufacturerList, setManufacturerList] = useState([]);

  const [purchaseOrderItemsList, setPOItemList] = useState([
    { 
      itemId: null,

      manufacturerId: -1,

      quantity: 0,

      rate: 0,

      categoryId: -1,

      cmlNumber: '',

      totalAmount: 0,

      purchaseOrderId: null,
      
      itemLblValList: [] 
    }
  ]);

  // Sync invoice initially
  // useEffect(() => {
  //   setPurchase({ ...purchase, purchaseOrderItemsList });
  // }, []);

  // Update row data
  const handleItemChange = async (index, field, value) => {
    const updatedList = [...purchaseOrderItemsList];
    updatedList[index][field] = value;

    if (field === 'categoryId') {
      await fetchItemListFromCategoryId(value).then((data) => {
        updatedList[index].itemLblValList = data || [];
      });
    }

    if (field === 'quantity' || field === 'rate') {
      updatedList[index].total = updatedList[index].quantity * updatedList[index].rate;
    }

    setPOItemList(updatedList);
    setPurchase({ ...purchase, purchaseOrderItemsList: updatedList });
  };

  const addItemRow = () => {
    const newList = [
      ...purchaseOrderItemsList,
      { 
        itemId: null,

        manufacturerId: -1,

        quantity: 0,

        rate: 0,

        categoryId: -1,

        cmlNumber: '',

        totalAmount: 0,

        purchaseOrderId: null,
        
        itemLblValList: [] 
      }
    ];
    setPOItemList(newList);
    setPurchase({ ...purchase, purchaseOrderItemsList: newList });
  };

  const removeItemRow = (index) => {
    const updatedList = purchaseOrderItemsList.filter((_, i) => i !== index);
    setPOItemList(updatedList);
    setPurchase({ ...purchase, purchaseOrderItemsList: updatedList });
  };

  useEffect(() => {
    if (purchase?.purchaseOrderItemsList?.length) {
      setPOItemList(purchase.purchaseOrderItemsList);
    }
  }, [purchase]);

  useEffect(() => {
    fetchCategoryList().then((data) => {
      setCategoryList(data || []);
    });

    fetchUnitList().then((data) => {
      setUnitList(data || []);
    });

    fetchManufacturerList().then((data) => {
      setManufacturerList(data || []);
    });    
  }, []);

  return (
    <Grid item xs={12}>
      <MainCard title={tableTitle} content={false}>
        <Box>
          <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Table sx={{ borderCollapse: 'collapse', borderSpacing: 0, '& td, & th': { padding: '8px 2px', } }}>
              <TableHead sx={{ backgroundColor: 'primary.light' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, minWidth: 150 } }>Category</TableCell>
                  <TableCell sx={{ fontWeight: 600, minWidth: 150 }}>Item</TableCell>
                  <TableCell sx={{ fontWeight: 600, minWidth: 150 }}>Manufacturer</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>CML No.</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Qty</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Rate</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {purchaseOrderItemsList.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <TextField
                        select
                        fullWidth
                        label="Category"
                        size="small"
                        value={row.categoryId || ''}
                        onChange={(e) => handleItemChange(index, 'categoryId', e.target.value)}
                      >
                        {categoryList.map((cat) => (
                          <MenuItem key={cat.id} value={cat.id}>
                            {lang ? cat.nameMh : cat.nameEn}
                          </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        select
                        fullWidth
                        label="Item"
                        size="small"
                        value={row.itemId || ''}
                        onChange={(e) => handleItemChange(index, 'itemId', e.target.value)}
                      >
                        {row.itemLblValList.map((item) => (
                          <MenuItem key={item.intKey} value={item.intKey}>
                            {lang ? item.stringValue2 : item.stringValue}
                          </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        select
                        fullWidth
                        label="Manufacturer"
                        size="small"
                        value={row.manufacturerId || ''}
                        onChange={(e) => handleItemChange(index, 'manufacturerId', e.target.value)}
                      >
                        {manufacturerList.map((man) => (
                          <MenuItem key={man.id} value={man.id}>
                            {lang ? man.nameMh : man.nameEn}
                          </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>                    
                    <TableCell>
                      <TextField
                        fullWidth
                        label="CML"
                        size="small"
                        value={row.cmlNumber}
                        onChange={(e) => handleItemChange(index, 'cmlNumber', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        label="QTY"
                        size="small"
                        type="number"
                        value={row.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                        sx={{ textAlign: 'right' }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        label="Rate"
                        size="small"
                        type="number"
                        value={row.rate}
                        onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                        sx={{ textAlign: 'right' }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        label="Total"
                        size="small"
                        value={row.total}
                        InputProps={{ readOnly: true }}
                        sx={{ textAlign: 'right' }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="error"
                        onClick={() => removeItemRow(index)}
                        disabled={purchaseOrderItemsList.length === 1}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <Box mt={2} textAlign="center">
            <Button variant="outlined" startIcon={<Add />} onClick={addItemRow}>
              Add Row
            </Button>
          </Box>
        </Box>
      </MainCard>
    </Grid>
  );
};

export default SubTableForm;
