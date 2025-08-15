import { apiClient } from "./apiClient";

async function fetchDistrictList(){
    
    var districtList = null;

    await apiClient.get('district/list').then(response => {
        if(response.status == 200){
            districtList = response.data;
        }else{
            console.error("Error : "+response);
        }
    })

    return districtList
}

async function fetchTehsilList(districtId){

    var tehsilList = null;

    await apiClient.post('tehsil/list?districtId='+districtId).then(response => {
        if(response.status == 200){
            tehsilList = response.data;
        }else{
            console.error("Error : "+response);
        }
    })

    return tehsilList

}

export {fetchDistrictList, fetchTehsilList};