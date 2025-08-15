import { apiClient } from "./apiClient";

async function fetchCategoryList(){

    return await apiClient.get('category/list').then(response => {
        if(response.status == 200){
            return response.data
        }else{
            console.warn("Error : "+response);
            return [];
        }
    })

}

export {fetchCategoryList};