import { useState } from "react";
import InvoiceTable from "./invoiceList";
import CustomForm from "./InvoiceCustomeForm";

export default function invoice(){

    const [showForm, setShowForm] = useState(false);
    const [invoice, setInvoice] = useState({

        id: '',
        farmerNameEn: '',
        farmerNameMh: '',
        email: '',
        contactNo: '',
        address: '',
        sanch: '',
        district: '',
        tehsil: '',
        aadharId: '',
        farmerId: '',
        manufacturerId: '',
        invoiceItemList: []

    });

    function backInvoice(){
        setShowForm(false);
    }

    function editInvoice(invoice){
        setInvoice(invoice);
        setShowForm(true);
    }

    return(
        <div>
            {!showForm &&
                <InvoiceTable onEdit={editInvoice} />
            }
            
            {showForm &&
                <CustomForm onBack={backInvoice} invoice={invoice}/>
            }
        </div>
    );
}