import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageContext, LanguageContextType } from "./i18n";

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng);
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  const changeLanguage = useCallback(
    async (language: string) => {
      await i18n.changeLanguage(language);
    },
    [i18n]
  );

  const availableLanguages = useMemo(
    () => [
      { code: "en", name: "English" },
      { code: "de", name: "Deutsch" }
    ],
    []
  );

  const contextValue = useMemo<LanguageContextType>(
    () => ({
      currentLanguage,
      changeLanguage,
      availableLanguages
    }),
    [currentLanguage, changeLanguage, availableLanguages]
  );

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
};
