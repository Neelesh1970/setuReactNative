import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../assets/language/en.json";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: en,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
