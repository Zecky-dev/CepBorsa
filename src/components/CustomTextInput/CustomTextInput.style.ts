import {ColorSchemeName, StyleSheet, Platform} from 'react-native';
import {createThemeColors} from '../../utils/themes';
const getStyles = (theme: ColorSchemeName) => {
  const colors = createThemeColors(theme);
  return StyleSheet.create({
    container: {},
    label: {
      color: colors.white,
      fontSize: 15,
      fontWeight: 'semibold',
    },
    innerContainer: {
      backgroundColor: colors.white,
      flexDirection: 'row',
      paddingHorizontal: Platform.OS === 'ios' ? 8 : 4,
      paddingVertical: Platform.OS === 'ios' ? 12 : 4,
      borderRadius: 4,
      marginTop: 8,
    },

    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },

    input: {
      flex: 1,
    },

    hideUnhidePasswordButton: {
      justifyContent: 'center',
      paddingHorizontal: 6,
    }

  });
};
export default getStyles;
