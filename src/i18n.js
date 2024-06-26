import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./components/locales/en/translation.json";
import translationAR from "./components/locales/ar/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
};

const storedLanguage = localStorage.getItem("language") || "ar";

const changeDirection = (language) => {
  if (language === "ar") {
    document.documentElement.setAttribute("dir", "rtl");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: storedLanguage,
  detection: {
    order: ["localStorage", "navigator"],
    caches: ["localStorage"],
  },
  interpolation: {
    escapeValue: false,
  },
});

changeDirection(storedLanguage);

export default i18n;
