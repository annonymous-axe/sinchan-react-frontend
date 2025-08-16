import { useState } from "react";
import InvoiceTable from "./invoiceList";
// import CustomForm from "./InvoiceCustomeForm";

export default function invoice(){

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
        farmerId: ''

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
                <InvoiceTable onCreate={createInvoice} onEdit={editInvoice} />
            }
            
            {/* {showForm &&
                <CustomForm onBack={backInvoice} invoice={invoice}/>
            } */}
        </div>
    );
}