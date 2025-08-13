import { useState } from "react";
import ItemTable from "./itemList";
import ItemForm from "./ItemCustomeForm";

export default function Item(){

    const initialStateOfForm = {

        id: '',
        categoryId: '',
        categoryName: '',
        itemName: '',
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
                <ItemTable onCreate={createItem} onEdit={editItem} />
            }
            
            {showForm &&
                <ItemForm onBack={backItem} item={item}/>
            }
        </div>
    );
}