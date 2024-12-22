import {ColorSchemeName} from 'react-native';

const COMMON_COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  danger: '#E74C3C',
  success: '#2ECC71',
  mutedBlack: 'rgba(0,0,0,0.5)',
}

const themes = {
  light: {
    ...COMMON_COLORS,
    primary: '#0652DD',
    secondary: '',
    text: '#000000',
    mutedText: 'rgba(0,0,0,0.5)',
    boxBackground: '#F5F5F5',
  },
  dark: {
    ...COMMON_COLORS,
    primary: '#2F3640',
    secondary: '',
    text: '#FFFFFF',
    mutedText: 'rgba(255,255,255,0.5)',
    boxBackground: 'white',
  },
};

export const createThemeColors = (theme: ColorSchemeName) => {
  const validTheme = theme ?? 'light'; 
  return themes[validTheme];
};

export default themes;
