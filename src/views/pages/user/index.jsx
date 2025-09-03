import { lazy } from "react";

import Loadable from '../../../ui-component/Loadable';
import { useTranslation } from "react-i18next";

const UserForm = Loadable(lazy(() => import('./userForm')));

export default function User(){

    const {t} = useTranslation();

    const user = {
        image: "",
        fullNameEn: "",
        fullNameMh: "",
        firmNameEn: "",
        firmNameMh: "",
        email: "",
        contactNumber: "",
        gstNumber: "",
        addressEn: "",
        addressMh: ""
    };

    return(
        <UserForm user={user} translate={t} />
    );
}