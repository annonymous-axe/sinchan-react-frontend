import { apiClient } from "./apiClient";

async function fetchInvoiceList(){

    return await apiClient.get('invoice/list').then(response => {
        if(response.status == 200){
            return response.data;
        }else{
            console.warn("Error : "+response);
            return [];
        }
    })
}

async function saveInvoice(invoice){

    await apiClient.post('invoice', invoice);

}

async function fetchInvoiceDetails(invoiceId){

    return await apiClient.get('invoice?invoiceId='+invoiceId).then(response => {
        if(response.status == 200){
            return response.data;
        }else{
            console.warn("Error : "+response);
            return null;
        }
    });
}

export {fetchInvoiceList, saveInvoice, fetchInvoiceDetails};