import { apiClient } from "./apiClient";

async function fetchQuotationList(){

    return await apiClient.get('quotation/list').then(response => {
        if(response.status == 200){
            console.log(response.data);
            
            return response.data;
        }else{
            console.warn("Error : "+response);
            return [];
        }
    })
}

async function saveQuotation(quotation){

    await apiClient.post('quotation', quotation);

}

async function fetchQuotationDetails(quotationId){

    return await apiClient.get('quotation?quotationId='+quotationId).then(response => {
        if(response.status == 200){ 
            return response.data;
        }else{
            console.warn("Error : "+response);
            return null;
        }
    });
}

export {fetchQuotationList, saveQuotation, fetchQuotationDetails};