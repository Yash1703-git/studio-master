"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import en from '@/locales/en.json';
import mr from '@/locales/mr.json';

const translations = { en, mr };

type Language = 'en' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, replacements?: { [key: string]: string | number }) => string;
  p: (item: any, field: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string, replacements?: { [key: string]: string | number }) => {
    let translation = translations[language][key as keyof typeof translations[Language]] || key;
    if (replacements) {
      Object.keys(replacements).forEach(rKey => {
        translation = translation.replace(`{{${rKey}}}`, String(replacements[rKey]));
      });
    }
    return translation;
  };
  
  const p = (item: any, field: string) => {
    if (language !== 'en' && item.translations && item.translations[language] && item.translations[language][field]) {
      return item.translations[language][field];
    }
    return item[field];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, p }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
