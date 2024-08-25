import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import pt from "./locales/pt.json";

export const resources = {
  en: { ...en },
  pt: { ...pt },
} as const;

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: "pt",
    supportedLngs: ["en", "pt"],
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "lang",
    },

    interpolation: {
      escapeValue: false,
    },
  });
