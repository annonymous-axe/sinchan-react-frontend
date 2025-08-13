import { useState } from "react";
import FarmerTable from "./farmerList";
import FarmerForm from "./FarmerCustomeForm";
import InvoiceForm from "./invoiceCustomeForm";

export default function farmer(){

    const initialStateOfForm = {

        id: '',
        farmerName: '',
        email: '',
        contactNo: '',
        address: '',
        sanch: '',
        district: '',
        tehsil: '',
        aadharId: '',
        farmerId: '',
        manufacturerId: ''

    };

    const [showForm, setShowForm] = useState(false);

    const [farmer, setFarmer] = useState(initialStateOfForm);

    const [showInvoiceForm, setShowInvoiceForm] = useState(false);

    function createFarmer(){
        setFarmer(initialStateOfForm);
        setShowInvoiceForm(false);
        setShowForm(true);
    }

    function backFarmer(){
        setShowForm(false);
        setShowInvoiceForm(false);
    }

    function editFarmer(farmer){
        setFarmer(farmer);
        setShowInvoiceForm(false);
        setShowForm(true);
    }

    function generateInvoice(){
        setShowInvoiceForm(true);
    }

    return(
        <div>
            {!showForm &&
                <FarmerTable onCreate={createFarmer} onEdit={editFarmer} />
            }
            
            {showForm &&
                <FarmerForm onBack={backFarmer} onGenerateInvoice={generateInvoice} showInvoiceItemList={showInvoiceForm}  farmer={farmer}/>
            }
        </div>
    );
}