import { useState } from "react";
import PurchaseTable from "./purchaseList";
import PurchaseForm from "./purchaseCustomeForm";
import dayjs from "dayjs";

export default function purchase(){

    const initialStateOfForm = {

    id: null,

    poNumber: '',

    supplierNameEn: '',

    supplierNameMh: '',

    purchaseDate: null,

    billNumber: '',

    createdAt: null,

    purchaseOrderItemsList: []

    };

    const [showForm, setShowForm] = useState(false);

    const [purchase, setPurchase] = useState(initialStateOfForm);

    function createPurchase(){
        setPurchase(initialStateOfForm);
        setShowForm(true);
    }

    function backPurchase(){
        setShowForm(false);
    }

    function editPurchase(purchase){
        setPurchase({...purchase, purchaseDate: dayjs(purchase.purchaseDate)});
        setShowForm(true);
    }

    return(
        <div>
            {!showForm &&
                <PurchaseTable onCreate={createPurchase} onEdit={editPurchase} />
            }
            
            {showForm &&
                <PurchaseForm onBack={backPurchase} purchase={purchase}/>
            }
        </div>
    );
}