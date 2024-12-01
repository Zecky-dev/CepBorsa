import {ColorSchemeName} from 'react-native';

const COMMON_COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  danger: '#E74C3C',
}

const themes = {
  light: {
    ...COMMON_COLORS,
    primary: '#0652DD',
    secondary: '',
  },
  dark: {
    ...COMMON_COLORS,
    primary: '#2F3640',
    secondary: '',
  },
};

export const createThemeColors = (theme: ColorSchemeName) => {
  const validTheme = theme ?? 'light'; 
  return themes[validTheme];
};

export default themes;
