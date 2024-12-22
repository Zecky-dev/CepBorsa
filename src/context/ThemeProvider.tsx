import React, {
  useState,
  createContext,
  useEffect,
  ReactNode,
  useContext,
} from 'react';
import {ColorSchemeName, useColorScheme} from 'react-native';
import Storage from '../utils/Storage';

interface ThemeContextType {
  theme: ColorSchemeName;
  setTheme: (theme: ColorSchemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const deviceTheme = useColorScheme();
  const [theme, setTheme] = useState<ColorSchemeName>(deviceTheme || 'light');

  const getSavedTheme = async () => {
    try {
      const savedTheme = await Storage.getItem<ColorSchemeName>('theme');
      if (savedTheme !== null) {
        setTheme(savedTheme);
      } else {
        setTheme(deviceTheme || 'light');
      }
    } catch (error) {
      console.error('Error fetching theme:', error);
      setTheme(deviceTheme || 'light');
    }
  };

  const changeTheme = async (newTheme: ColorSchemeName) => {
    try {
      await Storage.setItem('theme', newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  useEffect(() => {
    getSavedTheme();
  }, [deviceTheme]);

  return (
    <ThemeContext.Provider value={{theme, setTheme: changeTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;