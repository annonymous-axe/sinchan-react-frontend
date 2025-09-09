// src/pages/UsersTablePage.js
import React, { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomTable from '../../../ui-component/components/CustomeTable';
import { fetchManufacturerList, fetchManufacturerDetails } from '../../../api/manufacturer-apis';
import { fetchCategoryList } from '../../../api/category-apis';
import useConfig from '../../../hooks/useConfig';

export default function Table({ onCreate, onEdit, translate }){

    const { lang } = useConfig();

    var categoryNameFied = 'nameEn';

    if(lang){
      categoryNameFied = 'nameMh';
    }  

    const [categoryList, setCategoryList] = useState([]);

    const columns = [
      { field: 'id', headerName: translate("app.title.id"), width: 90 },
      { field: categoryNameFied, headerName: translate("app.title.category"), flex: 1 },
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
    <MainCard title={translate("app.title.categoryListTitle")}
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