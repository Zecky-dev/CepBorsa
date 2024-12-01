import {ColorSchemeName, StyleSheet} from 'react-native';
import {createThemeColors} from '../../../utils/themes';
import DeviceInfo from 'react-native-device-info';

export const getStyles = (theme: ColorSchemeName) => {
  const colors = createThemeColors(theme);
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
      paddingHorizontal: 18,
      justifyContent: 'center',
    },
    text: {
      color: colors.secondary, 
    },
    appTextsContainer: {
      marginBottom: 64,
    },
    appName: {
      fontWeight: 'semibold',
      fontSize: 36,
      color: colors.white,
    },
    appSlogan: {
      fontWeight: 'light',
      fontSize: 16,
      color: colors.white,
      marginTop: 4,
    },
    alreadyRegisteredText: {
      color: colors.white,
      fontWeight: 'semibold',
      fontSize: 16,
    },
    registerButtonText: {
      color: colors.white,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      marginTop: 4,
      fontSize: 16,
    },
    registerAreaContainer: {
      alignItems: 'center',
    },
    forgotPasswordButton: {
      position: "absolute",
      bottom: DeviceInfo.hasNotch() ? 48 : 24,
      alignSelf: 'center',
    },
    forgotPasswordText: {
      color: colors.white,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      fontSize: 16,
    },
    
  });
};
