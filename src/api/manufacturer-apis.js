import Request from "./api-request";
import { apiClient } from "./apiClient";

async function fetchManufacturerList(){

    return await apiClient.get('manufacturer/list').then(response => {
        if(response.status == 200){
            return response.data;
        }else{
            console.error("Error : "+response);
        }
    });
}

async function saveManufacturer(manufacturer){

    return await apiClient.post('manufacturer', manufacturer).then(response => {
        if(response.status == 200){
            return response.data;
        }else{
            console.error("Error : "+response);
        }
    });
}

async function fetchManufacturerDetails(manufacturerId){

    return await apiClient.get('manufacturer?manufacturerId='+manufacturerId).then(response => {
        if(response.status == 200){
            return response.data;
        }else{
            console.error("Error : "+response);
        }
    });

}

async function updateManufacturer(manufacturer){

    return await apiClient.put('manufacturer', manufacturer).then(response => {
        if(response.status == 200){
            return response.data;
        }else{
            console.error("Error : "+response);
        }
    });

}

async function deleteManufacturer(manufacturerId){

    return await apiClient.delete('manufacturer?manufacturerId='+manufacturerId).then(response => {
        if(response.status == 200){
            return response.data;
        }else{
            console.error("Error : "+response);
        }
    });

}

export {fetchManufacturerList, saveManufacturer, fetchManufacturerDetails, updateManufacturer, deleteManufacturer}