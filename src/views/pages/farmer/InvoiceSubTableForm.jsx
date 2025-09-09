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
import { fetchItemListFromCategoryId, fetchItemDetailsFromItemId } from '../../../api/item-apis';

const SubTableForm = ({ invoice, setInvoice, tableTitle, translate }) => {
  const [categoryList, setCategoryList] = useState([]);
  // const [itemList, setItemList] = useState([]);

  const [invoiceItemList, setItemDetailsList] = useState([
    { id: -1, categoryId: 0, cmlNumber: '', avlQuantity: 0, rate: 0, quantity: 0, unit: '', total: 0, itemId: '', itemList: [] }
  ]);

  // Sync invoice initially
  useEffect(() => {
    setInvoice({ ...invoice, invoiceItemList });
  }, []);

  // Update row data
  const handleItemChange = async (index, field, value) => {
    const updatedList = [...invoiceItemList];
    updatedList[index][field] = value;

    if (field === 'categoryId') {
      await fetchItemListFromCategoryId(value).then((data) => {
        updatedList[index].itemList = data || [];
      });
    }

    if (field === 'itemId') {
      await fetchItemDetailsFromItemId(value, invoice.manufacturerId).then((data) => {
        updatedList[index]['avlQuantity'] = data.floatKey;
        updatedList[index]['cmlNumber'] = data.stringValue;
        updatedList[index]['rate'] = data.floatKey2;
        updatedList[index]['unit'] = data.stringValue2;
      });
    }

    if (field === 'quantity' || field === 'rate') {
      updatedList[index].total = updatedList[index].quantity * updatedList[index].rate;
    }

    setItemDetailsList(updatedList);
    setInvoice({ ...invoice, invoiceItemList: updatedList });
  };

  const addItemRow = () => {
    const newList = [
      ...invoiceItemList,
      { id: -1, categoryId: 0, cmlNumber: '', avlQuantity: 0, rate: 0, quantity: 0, unit: '', total: 0, itemId: '', itemList: [] }
    ];
    setItemDetailsList(newList);
    setInvoice({ ...invoice, invoiceItemList: newList });
  };

  const removeItemRow = (index) => {
    const updatedList = invoiceItemList.filter((_, i) => i !== index);
    setItemDetailsList(updatedList);
    setInvoice({ ...invoice, invoiceItemList: updatedList });
  };

  useEffect(() => {
    if (invoice?.invoiceItemList?.length) {
      setItemDetailsList(invoice.invoiceItemList);
    }
  }, [invoice]);

  useEffect(() => {
    fetchCategoryList().then((data) => {
      setCategoryList(data || []);
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
                  <TableCell sx={{ fontWeight: 600, minWidth: 200 } }>{translate("app.title.category")}</TableCell>
                  <TableCell sx={{ fontWeight: 600, minWidth: 200 }}>{translate("app.title.item")}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{translate("app.title.avlQty")}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{translate("app.title.cmlNo")}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{translate("app.title.qty")}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{translate("app.title.unit")}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{translate("app.title.rate")}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{translate("app.title.total")}</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>{translate("app.action")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceItemList.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <TextField
                        select
                        fullWidth
                        size="small"
                        value={row.categoryId || 0}
                        onChange={(e) => handleItemChange(index, 'categoryId', e.target.value)}
                      >
                        {categoryList.map((cat) => (
                          <MenuItem key={cat.id} value={cat.id}>
                            {cat.nameEn}
                          </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        select
                        fullWidth
                        size="small"
                        value={row.itemId || ''}
                        onChange={(e) => handleItemChange(index, 'itemId', e.target.value)}
                      >
                        {row.itemList.map((item) => (
                          <MenuItem key={item.intKey} value={item.intKey}>
                            {item.stringValue}
                          </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>
                    <TableCell>
                      <TextField fullWidth size="small" value={row.avlQuantity} InputProps={{ readOnly: true }} />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        size="small"
                        value={row.cmlNumber}
                        onChange={(e) => handleItemChange(index, 'cmlNumber', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
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
                        size="small"
                        value={row.unit}
                        onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
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
                        disabled={invoiceItemList.length === 1}
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
              {translate("app.addRow")}
            </Button>
          </Box>
        </Box>
      </MainCard>
    </Grid>
  );
};

export default SubTableForm;
