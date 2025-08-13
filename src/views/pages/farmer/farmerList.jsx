// src/pages/UsersTablePage.js
import React, { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomTable from '../../../ui-component/components/CustomeTable';
import { useNavigate } from 'react-router';
import { fetchFarmerList, fetchFarmerDetails } from '../../../api/farmer-apis';

export default function FarmerTable({ onCreate, onEdit }){

    const [farmerList, setFarmerList] = useState([]);

    const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      { field: 'farmerName', headerName: 'Name', flex: 1 },
      { field: 'email', headerName: 'Email', flex: 1 },
      { field: 'contactNo', headerName: 'Contact No', width: 150 },
        {
            field: 'Action',
            headerName: 'Action',
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
                Edit
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

    const navigate = useNavigate();

    function createFarmer(){
        onCreate();
    }

  return (
    <MainCard title="Famers List"
      secondary={
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={createFarmer}
        >
          Create
        </Button>
      }
    >
      <CustomTable rows={farmerList} columns={columns} />
    </MainCard>
  );
};