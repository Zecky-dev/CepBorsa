import React, {createContext, useContext, useState, useEffect} from 'react';
import i18n from '../i18n/i18n/i18n';
import Storage from '@utils/Storage';

interface LanguageContextType {
  language: string;
  changeLanguage: (lng: string) => void;
}

interface LanguageProviderProps {
  children: React.ReactNode;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if(!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

const LanguageProvider = ({children}: LanguageProviderProps) => {
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await Storage.getItem<string>('language');
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
        setLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (lng: string) => {
    await Storage.setItem('language', lng);
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <LanguageContext.Provider value={{language, changeLanguage}}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
