import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enHome from "./en/home.json";
import ptHome from "./pt/home.json";

export const resources = {
  en: { home: enHome },
  pt: { home: ptHome },
} as const;

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: "pt",
    supportedLngs: ["en", "pt"],
    detection: {
      order: ["path"],
      lookupFromPathIndex: 0,
    },

    interpolation: {
      escapeValue: false,
    },
  });
