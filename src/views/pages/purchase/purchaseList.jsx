// src/pages/UsersTablePage.js
import { useEffect, useState } from 'react';

import useConfig from '../../../hooks/useConfig';
import MainCard from 'ui-component/cards/MainCard';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomTable from '../../../ui-component/components/CustomeTable';
import { fetchPurchaseList, fetchPurchaseDetails } from '../../../api/purchase-apis';

export default function FarmerTable({ onCreate, onEdit, translate }){

    const { lang } = useConfig();
    const [purchaseList, setPurchaseList] = useState([]);

    var supplierNameFied = 'supplierNameEn';

    if(lang){
      supplierNameFied = 'supplierNameMr';
    }
    

    const columns = [
      { field: 'id', headerName: translate("app.title.id"), width: 90 },
      { field: 'poNumber', headerName: translate("app.title.poNumber"), flex: 1 },
      { field: supplierNameFied, headerName: translate("app.title.supplierName"), flex: 1 },
      { field: 'purchaseDate', headerName: translate("app.title.purchaseDate"), width: 150 },
      { field: 'billNumber', headerName: translate("app.title.billNumber"), width: 150 },
        {
            field: 'Action',
            headerName: translate("app.action"),
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
                {translate("app.edit")}
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
    <MainCard title={translate("app.title.pOListTitle")}
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