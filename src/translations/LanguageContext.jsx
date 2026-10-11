import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { en } from './en';
import { ar } from './ar';

const LANG_KEY = 'coco-sheesh-lang';
const dictionaries = { en, ar };

const LanguageContext = createContext(null);

function resolve(dict, key) {
  return key.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), dict);
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    return localStorage.getItem(LANG_KEY) || 'en';
  });

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = useCallback(
    (key, fallback) => {
      const val = resolve(dictionaries[lang], key);
      if (val !== undefined) return val;
      const enVal = resolve(en, key);
      if (enVal !== undefined) return enVal;
      return fallback !== undefined ? fallback : key;
    },
    [lang]
  );

  const toggleLang = useCallback(() => setLang((l) => (l === 'en' ? 'ar' : 'en')), []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, isRTL: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
