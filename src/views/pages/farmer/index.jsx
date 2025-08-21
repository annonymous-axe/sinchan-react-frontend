import { useState } from "react";
import FarmerTable from "./farmerList";
import FarmerForm from "./FarmerCustomeForm";
import { useTranslation } from "react-i18next";

export default function farmer(){

    const { t } = useTranslation(); 

    const initialStateOfForm = {

        id: '',
        farmerNameEn: '',
        farmerNameMh: '',
        email: '',
        contactNo: '',
        addressEn: '',
        addressMh: '',
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
                <FarmerTable onCreate={createFarmer} onEdit={editFarmer} translate={t} />
            }
            
            {showForm &&
                <FarmerForm onBack={backFarmer} onGenerateInvoice={generateInvoice} showInvoiceItemList={showInvoiceForm}  farmer={farmer} translate={t}/>
            }
        </div>
    );
}