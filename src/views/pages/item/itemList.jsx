// src/pages/UsersTablePage.js
import { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomTable from '../../../ui-component/components/CustomeTable';
import { fetchItemList, fetchItemDetails } from '../../../api/item-apis';
import useConfig from '../../../hooks/useConfig';

export default function Table({ onCreate, onEdit }){

    const [itemList, setItemList] = useState([]);
    const { lang } = useConfig();

    var langFieds = {itemName: 'itemNameEn', categoryName: 'categoryNameEn'};

    if(lang){
      langFieds.itemName = 'itemNameMh';
      langFieds.categoryName = 'categoryNameMh';
    }    

    const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      { field: langFieds.categoryName, headerName: 'Category Name', flex: 1 },
      { field: langFieds.itemName, headerName: 'Item Name', flex: 1 },
      { field: 'measurementType', headerName: 'Measurement Type', width: 150 },
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

      const list = fetchItemList();
      if(list != null){
          list.then(data => {
            setItemList(data);
          });
      }

    }, []);

  return (
    <MainCard title="Item List"
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
      <CustomTable rows={itemList} columns={columns} />
    </MainCard>
  );
};