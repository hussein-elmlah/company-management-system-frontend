import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './components/locales/en/translation.json'; 
import translationAR from './components/locales/ar/translation.json'; 

const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: 'ar', 
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
