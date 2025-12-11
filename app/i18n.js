import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from "./locales/en.default.json";
import hi from "./locales/hi.json";

const resources = {
  en: { translation: en },
  hi: { translation: hi },
};

i18n
  .use(initReactI18next)
  .init({
    resources,

    // ✅ Always fall back to English when unsupported (e.g., 'tr')
    fallbackLng: 'en',
    lng: "en",

    cleanCode: true,
    lowerCaseLng: true,

    // Make sure only these can be picked
    supportedLngs: ['en', 'hi'],

    // If you get codes like 'tr-TR' or 'en-US', load just 'tr'/'en'
    load: 'languageOnly',
    nonExplicitSupportedLngs: true,

    // Keep language codes clean
    cleanCode: true,
    lowerCaseLng: true,

    interpolation: { escapeValue: false },
    react: {
      useSuspense: false,
      bindI18n: false,
      bindI18nStore: false,
    }

  });


export const changeLanguage = (lang) => {
  i18n.changeLanguage(lang);
}
export default i18n;
