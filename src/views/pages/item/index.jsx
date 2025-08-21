import { useState } from "react";
import ItemTable from "./itemList";
import ItemForm from "./ItemCustomeForm";
import { useTranslation } from "react-i18next";

export default function Item(){

    const {t} = useTranslation();

    const initialStateOfForm = {

        id: '',
        categoryId: '',
        categoryNameEn: '',
        categoryNameMh: '',
        itemNameEn: '',
        itemNameMh: '',
        measurementType: '',
        gstRate: ''
    };

    const [showForm, setShowForm] = useState(false);

    const [item, setItem] = useState(initialStateOfForm);    

    function createItem(){
        setItem(initialStateOfForm)
        setShowForm(true);
    }

    function backItem(){
        setShowForm(false);
    }

    function editItem(item){
        setItem(item);
        setShowForm(true);
    }

    return(
        <div>
            {!showForm &&
                <ItemTable onCreate={createItem} onEdit={editItem} translate={t} />
            }
            
            {showForm &&
                <ItemForm onBack={backItem} item={item} translate={t} />
            }
        </div>
    );
}