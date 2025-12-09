import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../extensions/review-extension/locales/en.default.json";
// import hi from "../extensions/review-extension/locales/hi.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
  },
  interpolation: { escapeValue: false }
});

export default i18n;
