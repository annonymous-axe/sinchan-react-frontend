// src/pages/UsersTablePage.js
import React, { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomTable from '../../../ui-component/components/CustomeTable';
import { fetchItemList, fetchItemDetails } from '../../../api/item-apis';
import { fetchInvoiceList, fetchInvoiceDetails } from '../../../api/invoice-apis';
import useConfig from '../../../hooks/useConfig';

export default function Table({ onEdit, translate }){

    const { lang } = useConfig();

    var farmerNameFied = 'farmerNameEn';

    if(lang){
      farmerNameFied = 'farmerNameMh';
    }    
    
    const [invoiceList, setInvoiceList] = useState([]);

    const columns = [
      { field: 'id', headerName: translate("app.title.id"), width: 90 },
      { field: farmerNameFied, headerName: translate("app.title.farmerName"), flex: 1 },
      { field: 'contactNo', headerName: translate("app.title.contactNo"), flex: 1 },
      { field: 'grandTotal', headerName: translate("app.title.total"), width: 150 },
      {
          field: 'Action',
          headerName: translate("app.action"),
          width: 150,
          sortable: false,
          renderCell: (params) => {
          const handleClick = () => {
              const invoice = fetchInvoiceDetails(`${params.row.id}`);
              if(invoice != null){
                  invoice.then(data => {
                      onEdit(data);
                  })
              }
          };

          return ( 
              <Button
              variant="contained"
              color="primary"
              onClick={handleClick}
              >
              {translate("app.edit")}
              </Button>
          );
          }
      }  
    ];    

    // initialized list
    useEffect(() => {

      const list = fetchInvoiceList();
      if(list != null){
          list.then(data => {
            setInvoiceList(data);
          });
      }

    }, []);

  return (
    <MainCard title={translate("app.title.invoiceListTitle")}>
      <CustomTable rows={invoiceList} columns={columns} />
    </MainCard>
  );
};