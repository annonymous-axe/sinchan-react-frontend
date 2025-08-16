import { apiClient } from "./apiClient";


async function fetchItemList(){

    return await apiClient.get('item/list').then(response => {
        return responseData(response);
    });

}

async function fetchUnitList(){

    return await apiClient.get('unit/list').then(response => {
        return responseData(response);
    });

}

async function saveItem(item){

    await apiClient.post('item', item);

}

async function fetchItemDetails(itemId){

    return await apiClient.get('item?itemId='+itemId).then(response => {
        return responseData(response);
    });

}

async function updateItem(item){

    await apiClient.put('item', item);

}

async function deleteItem(itemId){

    await apiClient.delete('item?itemId='+itemId);

}

async function fetchItemListFromCategoryId(categoryId){

    if(categoryId != null && categoryId != undefined){
        return await apiClient.get('item/list/from-category-id?categoryId='+categoryId).then(response => {
            return responseData(response);
        });
    }
}

async function fetchItemDetailsFromItemId(itemId, manufacturerId){

    if(itemId != null && itemId != undefined && manufacturerId != null && manufacturerId != undefined){
        return await apiClient.get('item/details?itemId='+itemId+'&manufacturerId='+manufacturerId).then(response => {
            return responseData(response);
        });
    }else{
        return [];
    }
}

function responseData(response){
    if(response.status){
        return response.data
    }else{
        console.error("Error : "+response);
        return [];
    }
}

export {fetchItemList, saveItem, fetchItemDetails, updateItem, deleteItem, fetchItemListFromCategoryId, fetchItemDetailsFromItemId, fetchUnitList}