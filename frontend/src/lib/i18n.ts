import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./translations/en.json";
import urTranslation from "./translations/ur.json";
import arTranslation from "./translations/ar.json";
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ur: {
        translation: urTranslation,
      },
      ar: {
        translation: arTranslation,
      },
    },
    supportedLngs: ["en", "ur", "ar"],
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "cookie", "htmlTag", "path", "subdomain"],
      caches: ["localStorage", "cookie"],
    },
  });
export default i18n;
