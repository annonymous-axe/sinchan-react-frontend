import { lazy, useState } from "react";

import Loadable from '../../../ui-component/Loadable';
import { useTranslation } from "react-i18next";

const SettingForm = Loadable(lazy(() => import('./settingForm')));

export default function Item(){

    const {t} = useTranslation();


    return(
        <div>
            <SettingForm translate={t} />
        </div>
    );
}