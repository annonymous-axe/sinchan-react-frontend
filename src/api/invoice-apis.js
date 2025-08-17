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

async function generateInvoice(invoiceId, docType){

    return await apiClient.post('/invoice/generate?invoiceId='+invoiceId+"&doc_type="+docType, 
        null,
        {
            responseType: "blob",
        }
    ).then(response => {
        if(response.status == 200){

            const file = new Blob([response.data], { type: "application/pdf" });
            const fileURL = window.URL.createObjectURL(file);
                        
            const a = document.createElement('a');
            a.download = 'invoice';
            a.href = fileURL;
            a.click();
            
            return response.data;
        }else{
            console.warn("Error : "+response);
            return null;
        }
    });
}

export {fetchInvoiceList, saveInvoice, fetchInvoiceDetails, generateInvoice};