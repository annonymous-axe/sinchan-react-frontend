import { useState } from "react";
import InvoiceTable from "./invoiceList";
// import CustomForm from "../farmer/invoiceCustomeForm";

export default function invoice(){



    function backInvoice(){
        // setShowForm(false);
    }

    function editInvoice(invoice){
        // setInvoice(invoice);
        // setShowForm(true);
    }

    return(
        <div>
            {/* {!showForm && */}
                <InvoiceTable onEdit={editInvoice} />
            {/* } */}
            
            {/* {showForm &&
                <CustomForm onBack={backInvoice} invoice={invoice}/>
            } */}
        </div>
    );
}