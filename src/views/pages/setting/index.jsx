import { lazy, useState } from "react";

import Loadable from '../../../ui-component/Loadable';
import { useTranslation } from "react-i18next";

const SettingForm = Loadable(lazy(() => import('./settingForm')));

export default function Setting(){

    const {t} = useTranslation();


    return(
        <SettingForm translate={t} />
    );
}