import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        supportedLng: ["en", "mr"],
        ns: ["translation"],
        defaultNS: "translation",
        load: "languageOnly",
        debug: true,

        backend: {
            loadPath: "public/locales/{{lng}}/{{ns}}.json"
        },

        detection: {
            order: ["localStorage", "navigator", "htmlTag", "querystring", "cookies"],
            caches: ["localStorage"]
        },

        interpolation: {
            escapeValue: false
        }
    });

    export default i18n;