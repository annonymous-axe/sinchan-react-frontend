import { lazy, useState } from "react";

import Loadable from '../../../ui-component/Loadable';

const CategoryTable = Loadable(lazy(() => import('./categoryList')));
const CategoryForm = Loadable(lazy(() => import('./categoryForm')));

export default function Item(){

    const initialStateOfForm = {
        id: '',
        nameEn: '',
        nameMh: ''
    };

    const [showForm, setShowForm] = useState(false);

    const [manufacturer, setManufacturer] = useState(initialStateOfForm);    

    function createManufacturer(){
        setManufacturer(initialStateOfForm)
        setShowForm(true);
    }

    function backManufacturer(){
        setShowForm(false);
    }

    function editManufacturer(manufacturer){
        setManufacturer(manufacturer);
        setShowForm(true);
    }

    return(
        <div>
            {!showForm &&
                <CategoryTable onCreate={createManufacturer} onEdit={editManufacturer} />
            }
            
            {showForm &&
                <CategoryForm onBack={backManufacturer} manufacturer={manufacturer}/>
            }
        </div>
    );
}