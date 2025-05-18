import { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguageContext = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'English';
  });
  
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language.toLowerCase());
  }, [language]);
  
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };
  
  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};