import { apiClient } from "./apiClient";

async function fetchPurchaseList(){

    return await apiClient.get('purchase/list').then(response => {
        if(response.status == 200){
            return response.data;
        }else{
            console.warn("Error : "+response);
            return [];
        }
    })
}

async function savePurchase(purchase){

    await apiClient.post('purchase', purchase);

}

async function fetchPurchaseDetails(purchaseId){

    return await apiClient.get('purchase?purchaseOrderId='+purchaseId).then(response => {
        if(response.status == 200){
            return response.data;
        }else{
            console.warn("Error : "+response);
            return null;
        }
    });
}

export {fetchPurchaseList, savePurchase, fetchPurchaseDetails};