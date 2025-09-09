// src/pages/UsersTablePage.js
import React, { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomTable from '../../../ui-component/components/CustomeTable';
import { fetchManufacturerList, fetchManufacturerDetails } from '../../../api/manufacturer-apis';
import useConfig from '../../../hooks/useConfig';

export default function Table({ onCreate, onEdit, translate }){

    const { lang } = useConfig();

    var nameFied = 'nameEn';

    if(lang){
      nameFied = 'nameMh';
    }    

    const [manufacturerList, setManufacturerList] = useState([]);

    const columns = [
      { field: 'id', headerName: translate("app.title.id"), width: 90 },
      { field: nameFied, headerName: translate("app.title.manufacturer"), flex: 1 },
      {
          field: 'Action',
          headerName: translate("app.action"),
          width: 150,
          sortable: false,
          renderCell: (params) => {
          const handleClick = () => {
              const manufacturer = fetchManufacturerDetails(`${params.row.id}`);
              if(manufacturer != null){
                  manufacturer.then(data => {

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

      const list = fetchManufacturerList();
      if(list != null){
          list.then(data => {
            setManufacturerList(data);
          });
      }

    }, []);

  return (
    <MainCard title={translate("app.title.manufacturerListTitle")}
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
      <CustomTable rows={manufacturerList} columns={columns} />
    </MainCard>
  );
};