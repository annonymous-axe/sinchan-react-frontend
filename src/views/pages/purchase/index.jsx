import { useState } from "react";
import PurchaseTable from "./invoiceList";
import CustomForm from "./InvoiceCustomeForm";

export default function purchase(){

    const [showForm, setShowForm] = useState(false);
    const [purchase, setPurchase] = useState({

        id: '',
        poNumber: '',
        supplierName: '',
        purchaseDate: '',
        billNumber: '',
        createdAt: '',
        purchaseOrderItemsList: []

    });

    function backPurchase(){
        setShowForm(false);
    }

    function editPurchase(purchase){
        setPurchase(purchase);
        setShowForm(true);
    }

    return(
        <div>
            {!showForm &&
                <PurchaseTable onEdit={editPurchase} />
            }
            
            {showForm &&
                <CustomForm onBack={backPurchase} purchase={purchase}/>
            }
        </div>
    );
}