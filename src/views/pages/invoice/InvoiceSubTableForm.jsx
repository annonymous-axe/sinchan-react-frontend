import { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box
} from '@mui/material';
import MainCard from '../../../ui-component/cards/MainCard';

const SubTableForm = ({ invoice, tableTitle, lang, translate }) => {

  return (
    <Grid item xs={12}>
      <MainCard title={tableTitle} content={false}>
        <Box>
          <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Table   sx={{ borderCollapse: 'collapse', borderSpacing: 0, '& td, & th': { padding: '8px 2px', } }}>
              <TableHead sx={{ backgroundColor: 'primary.light' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, minWidth: 200 } }>{translate("app.title.category")}</TableCell>
                  <TableCell sx={{ fontWeight: 600, minWidth: 200 }}>{translate("app.title.item")}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{translate("app.title.cmlNo")}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{translate("app.title.qty")}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{translate("app.title.unit")}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{translate("app.title.rate")}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{translate("app.title.total")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoice.invoiceItemList.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <TextField
                        fullWidth
                        size="small"
                        value={lang ? row.categoryNameMr : row.categoryNameEn}
                        InputProps={{ readOnly: true }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        size="small"
                        value={lang ? row.itemNameMr : row.itemNameEn}
                        InputProps={{ readOnly: true }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        size="small"
                        value={row.cmlNumber}
                        InputProps={{ readOnly: true }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        value={row.quantity}
                        InputProps={{ readOnly: true }}
                        sx={{ textAlign: 'right' }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        size="small"
                        value={row.unit}
                        InputProps={{ readOnly: true }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        value={row.rate}
                        InputProps={{ readOnly: true }}
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      </MainCard>
    </Grid>
  );
};

export default SubTableForm;
