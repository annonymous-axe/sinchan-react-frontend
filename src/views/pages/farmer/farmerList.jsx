// src/pages/UsersTablePage.js
import { useEffect, useState } from 'react';

import useConfig from '../../../hooks/useConfig';
import MainCard from 'ui-component/cards/MainCard';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomTable from '../../../ui-component/components/CustomeTable';
import { fetchFarmerList, fetchFarmerDetails } from '../../../api/farmer-apis';
import { useTranslation } from 'react-i18next';

export default function FarmerTable({ onCreate, onEdit, translate }){

    const { lang } = useConfig();
    const [farmerList, setFarmerList] = useState([]);

    var farmerNameFied = 'farmerNameEn';

    if(lang){
      farmerNameFied = 'farmerNameMh';
    }
    
    const columns = [
      { field: 'id', headerName: translate('app.title.id'), width: 90 },
      { field: farmerNameFied, headerName: translate('app.title.farmerName'), flex: 1 },
      { field: 'email', headerName: translate('app.title.email'), flex: 1 },
      { field: 'contactNo', headerName: translate('app.title.contactNo'), width: 150 },
        {
            field: 'Action',
            headerName: translate('app.action'),
            width: 150,
            sortable: false,
            renderCell: (params) => {
            const handleClick = () => {
                const farmer = fetchFarmerDetails(`${params.row.id}`);
                if(farmer != null){
                    farmer.then(data => {
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

        const list = fetchFarmerList();
        if(list != null){
           list.then(data => {
                setFarmerList(data);
            });
        }

    }, []);

    function createFarmer(){
        onCreate();
    }

  return (
    <MainCard title={translate("app.title.farmerListTitle")}
      secondary={
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={createFarmer}
        >
          {translate("app.create")}
        </Button>
      }
    >
      <CustomTable rows={farmerList} columns={columns} />
    </MainCard>
  );
};