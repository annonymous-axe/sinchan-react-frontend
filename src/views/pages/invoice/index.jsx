import { useState } from "react";
import InvoiceTable from "./invoiceList";
import CustomForm from "./InvoiceCustomeForm";
import { useTranslation } from "react-i18next";

export default function invoice(){

    const {t} = useTranslation();
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
                <InvoiceTable onEdit={editInvoice} translate={t}/>
            }
            
            {showForm &&
                <CustomForm onBack={backInvoice} invoice={invoice} translate={t}/>
            }
        </div>
    );
}