// src/pages/UsersTablePage.js
import { useEffect, useState } from 'react';

import useConfig from '../../../hooks/useConfig';
import MainCard from 'ui-component/cards/MainCard';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomTable from '../../../ui-component/components/CustomeTable';
import { fetchPurchaseList, fetchPurchaseDetails } from '../../../api/purchase-apis';

export default function FarmerTable({ onCreate, onEdit }){

    const { lang } = useConfig();
    const [purchaseList, setPurchaseList] = useState([]);

    var supplierNameFied = 'supplierNameEn';

    if(lang){
      supplierNameFied = 'supplierNameMh';
    }
    

    const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      { field: 'poNumber', headerName: 'PO Number', flex: 1 },
      { field: supplierNameFied, headerName: 'Supplier Name', flex: 1 },
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
    <MainCard title="Purchase Order List"
      secondary={
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onCreate}
        >
          Create
        </Button>
      }
    >
      <CustomTable rows={purchaseList} columns={columns} />
    </MainCard>
  );
};