import {createThemeColors} from '@utils/themes';
import {ColorSchemeName, StyleSheet} from 'react-native';
const getStyles = (theme: ColorSchemeName) => {
  const colors = createThemeColors(theme);
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 30,
    },
    rightContainer: {
        flexShrink: 1,
        marginLeft: 12,
        justifyContent: 'center',
    },
    rightTopContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    message: {
      color: colors.text,
      fontWeight: '400',
      fontSize: 14,
      marginTop: 4,
    },
    name: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '600',
    },
    date: {
        fontSize: 12,
        color: colors.mutedText,
        fontWeight: '500',
    },
  });
};
export default getStyles;
