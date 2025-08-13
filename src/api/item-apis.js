import Request from "./api-request";


async function fetchItemList(){

    return await Request('item/list').then(response => {
        return response.json();
    });

}

async function saveItem(item){

    return await Request('item', 'POST', item);

}

async function fetchItemDetails(itemId){

    return await Request('item?itemId='+itemId).then(response => {
        return response.json();
    });

}

async function updateItem(item){

    return await Request('item', 'PUT', item);

}

async function deleteItem(itemId){

    return await Request('item?itemId='+itemId, 'DELETE').then(response => {
        return response.json();
    });

}

async function fetchItemListFromCategoryId(categoryId){

    if(categoryId != null && categoryId != undefined){
        return await Request('item/list/from-category-id?categoryId='+categoryId).then(response => {
            return response.json();
        });
    }
}

async function fetchItemDetailsFromItemId(itemId, manufacturerId){

    console.log(itemId+" && "+manufacturerId);
    

    if(itemId != null && itemId != undefined && manufacturerId != null && manufacturerId != undefined){
        return await Request('item/details?itemId='+itemId+'&manufacturerId='+manufacturerId).then(response => {
            return response.json();
        });
    }else{
        return [];
    }
}

export {fetchItemList, saveItem, fetchItemDetails, updateItem, deleteItem, fetchItemListFromCategoryId, fetchItemDetailsFromItemId}