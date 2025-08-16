// src/pages/UsersTablePage.js
import React, { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomTable from '../../../ui-component/components/CustomeTable';
import { fetchItemList, fetchItemDetails } from '../../../api/item-apis';
import { fetchInvoiceList } from '../../../api/invoice-apis';
import { fetchQuotationList } from '../../../api/quotation-apis';
import useConfig from '../../../hooks/useConfig';

export default function Table({ onCreate, onEdit }){

    const { lang } = useConfig();

    var farmerNameFied = 'farmerNameEn';

    if(lang){
      farmerNameFied = 'farmerNameMh';
    }      

    const [invoiceList, setInvoiceList] = useState([]);

    const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      { field: farmerNameFied, headerName: 'Farmer Name', flex: 1 },
      { field: 'contactNo', headerName: 'Contact Number', flex: 1 },
      { field: 'grandTotal', headerName: 'Grand Total', width: 150 },
      {
          field: 'Action',
          headerName: 'Action',
          width: 150,
          sortable: false,
          renderCell: (params) => {
          const handleClick = () => {
              const item = fetchItemDetails(`${params.row.id}`);
              if(item != null){
                  item.then(data => {
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
              Edit
              </Button>
          );
          }
      }  
    ];    

    // initialized list
    useEffect(() => {

      const list = fetchQuotationList();
      if(list != null){
          list.then(data => {
            setInvoiceList(data);
          });
      }

    }, []);

  return (
    <MainCard title="Quotation List">
      <CustomTable rows={invoiceList} columns={columns} />
    </MainCard>
  );
};