import {createThemeColors} from '@utils/themes';
import {ColorSchemeName, StyleSheet} from 'react-native';
const getStyles = (theme: ColorSchemeName) => {
  const colors = createThemeColors(theme);
  return StyleSheet.create({
    container: {
      backgroundColor: colors.secondary,
      flex: 1,
      paddingTop: '15%',
      paddingHorizontal: 24,
    },
    amount: {
      color: colors.text,
      fontSize: 48,
      textAlign: 'center',
      fontWeight: 'bold',
    },

    pickerContainer: {
      backgroundColor: theme === "dark" ? colors.white : colors.boxBackground,
      borderRadius: 6,
      paddingVertical: 4,
    },
    pickerOuterContainer: {
      gap: 8,
    },
    pickerLabel: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '500',
    },
    pickerInput: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 18,
    },

    inputsContainer: {
      gap: 12,
      marginTop: 32,
      marginBottom: 16,
    },

  });
};
export default getStyles;
