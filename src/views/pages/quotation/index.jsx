import { useState } from "react";
import QuotationTable from "./quotationList";
import QuotationForm from "./quotationCustomeForm";
import { useTranslation } from "react-i18next";

export default function invoice(){

    const {t} = useTranslation();

    const initialStateOfForm = {

        id: '',
        farmer: '',
        farmerNameEn: '',
        farmerNameMh: '',
        email: '',
        contactNo: '',
        address: '',
        createdAt: '',
        manufacturerId: '',    
        manufacturerName: '',    
        grandTotal: '',
        type: '',    
        sanch: '',	
        district: '',	
        tehsil: '',
        districtName: '',
        tehsilName: '',	
        aadharId: '',	
        farmerId: '',
        invoiceItemList: []

    };

    const [showForm, setShowForm] = useState(false);

    const [invoice, setInvoice] = useState(initialStateOfForm);    

    function createInvoice(){
        setInvoice(initialStateOfForm)
        setShowForm(true);
    }

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
                <QuotationTable onCreate={createInvoice} onEdit={editInvoice} translate={t}/>
            }
            
            {showForm &&
                <QuotationForm onBack={backInvoice} invoice={invoice} translate={t}/>
            }
        </div>
    );
}