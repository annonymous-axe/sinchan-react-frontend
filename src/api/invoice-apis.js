import Request from "./api-request";

async function fetchInvoiceList(){

    return await Request('invoice/list').then(response => {
        if(response!=null && response!=undefined){  
            return response.json();
        }else{
            return [];
        }
    })
}

async function saveInvoice(invoice){

    await Request('invoice', 'POST', invoice);
}

async function fetchInvoiceDetails(invoiceId){

    return Request('invoice?invoiceId='+invoiceId).then(response => {
        return response.json();
    });
}

export {fetchInvoiceList, saveInvoice, fetchInvoiceDetails};