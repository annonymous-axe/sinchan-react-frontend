import { apiClient } from "./apiClient";

async function fetchFarmerList(){

    var farmerList = null;

    await apiClient.get('farmer/list').then(response => {
        
        if(response.status == 200){
            farmerList = response.data;
            console.log(farmerList);
        }else{
            console.error("Error : "+response.status);
            return null;
        }
    })

    return farmerList;
}

function saveFarmer(farmer){

    apiClient.post('farmer', farmer).then(response => {
        if(response.status != 200){
            console.error(response.status);
        }
    });

}

async function fetchFarmerDetails(farmerId){

    return await apiClient.get('farmer/'+farmerId).then(response => {
        if(response.status == 200){
            return response.data;
        }else{
            console.warn("Error : "+response);
            return null;
        }
    })

}

async function updateFarmer(farmer){

    await apiClient.put('farmer', farmer).then(response => {
        if(!response.ok){
            console.error(response.status);
        }
    });

}

async function deleteFarmer(farmerId){

    await apiClient.delete('farmer?farmerId='+farmerId).then(response => {
        if(!response.ok){
            console.error(response.status);
        }
    });

}



export {fetchFarmerList, saveFarmer, fetchFarmerDetails, updateFarmer, deleteFarmer}