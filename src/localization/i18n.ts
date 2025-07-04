import * as Localization from "expo-localization";
import i18n, { LanguageDetectorAsyncModule } from "i18next";
import { createContext } from "react";
import { initReactI18next } from "react-i18next";
import { interpolationFormat } from "src/localization/i18nUtil";
import deJson from "src/translations/de.json";
import enJson from "src/translations/en.json";

const languageDetector: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  detect: (callback) => {
    const locales = Localization.getLocales();
    callback(locales[0].languageTag);
  },
  init: () => {},
  cacheUserLanguage: () => {}
};

// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: __DEV__,
    interpolation: {
      escapeValue: false,
      ...interpolationFormat
    },
    resources: {
      en: {
        translation: enJson
      },
      de: {
        translation: deJson
      }
    },
    react: {
      useSuspense: false
    }
  });

export interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => void;
  availableLanguages: { code: string; name: string }[];
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export default i18n;
