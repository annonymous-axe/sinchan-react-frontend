// src/pages/UsersTablePage.js
import React, { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomTable from '../../../ui-component/components/CustomeTable';
import { fetchManufacturerList, fetchManufacturerDetails } from '../../../api/manufacturer-apis';
import { fetchCategoryList } from '../../../api/category-apis';
import useConfig from '../../../hooks/useConfig';

export default function Table({ onCreate, onEdit }){

    const { lang } = useConfig();

    var categoryNameFied = 'nameEn';

    if(lang){
      categoryNameFied = 'nameMh';
    }  

    const [categoryList, setCategoryList] = useState([]);

    const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      { field: categoryNameFied, headerName: 'Category Name', flex: 1 },
    ];    

    // initialized list
    useEffect(() => {

      const list = fetchCategoryList();
      if(list != null){
          list.then(data => {
            setCategoryList(data);
          });
      }

    }, []);

  return (
    <MainCard title="Category List"
      // secondary={
      //   <Button
      //     variant="contained"
      //     color="primary"
      //     startIcon={<AddIcon />}
      //     onClick={onCreate}
      //   >
      //     Create
      //   </Button>
      // }
    >
      <CustomTable rows={categoryList} columns={columns} />
    </MainCard>
  );
};