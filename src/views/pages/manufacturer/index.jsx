import { lazy, useState } from "react";

import Loadable from '../../../ui-component/Loadable';
import { useTranslation } from "react-i18next";

const ManufacturerTable = Loadable(lazy(() => import('./manufacturerList')));
const ManufacturerForm = Loadable(lazy(() => import('./manufacturerForm')));

export default function Item(){

    const {t} = useTranslation();

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
                <ManufacturerTable onCreate={createManufacturer} onEdit={editManufacturer} translate={t} />
            }
            
            {showForm &&
                <ManufacturerForm onBack={backManufacturer} manufacturer={manufacturer} translate={t} />
            }
        </div>
    );
}