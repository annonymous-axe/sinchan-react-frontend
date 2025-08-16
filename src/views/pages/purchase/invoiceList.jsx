// src/pages/UsersTablePage.js
import { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Button } from '@mui/material';
import CustomTable from '../../../ui-component/components/CustomeTable';
import { fetchPurchaseList, fetchPurchaseDetails } from '../../../api/purchase-apis';

export default function Table({ onEdit }){

    const [purchaseList, setPurchaseList] = useState([]);

    const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      { field: 'poNumber', headerName: 'PO Number', flex: 1 },
      { field: 'supplierName', headerName: 'Supplier Name', flex: 1 },
      { field: 'purchaseDate', headerName: 'Purchase Date', width: 150 },
      { field: 'billNumber', headerName: 'Bill Number', width: 150 },
      {
          field: 'Action',
          headerName: 'Action',
          width: 150,
          sortable: false,
          renderCell: (params) => {
          const handleClick = () => {
              const purchase = fetchPurchaseDetails(`${params.row.id}`);
              if(purchase != null){
                  purchase.then(data => {
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

      const list = fetchPurchaseList();
      if(list != null){
          list.then(data => {
            setPurchaseList(data);
          });
      }

    }, []);

  return (
    <MainCard title="Purchase List">
      <CustomTable rows={purchaseList} columns={columns} />
    </MainCard>
  );
};