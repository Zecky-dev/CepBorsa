import {ColorSchemeName, StyleSheet} from 'react-native';
import {createThemeColors} from '@utils/themes';
const getStyles = (
  theme: ColorSchemeName,
) => {
  const colors = createThemeColors(theme);
  return StyleSheet.create({
    container: {
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
    },
  });
};
export default getStyles;
