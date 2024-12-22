import {createThemeColors} from '@utils/themes';
import {ColorSchemeName, StyleSheet} from 'react-native';
const getStyles = (theme: ColorSchemeName) => {
  const colors = createThemeColors(theme);
  return StyleSheet.create({
    container: {
      paddingHorizontal: 8,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
    },
    stockLogo: {
      width: 48,
      height: 48,
      borderRadius: 24,
    },
    stockCode: {
        flexWrap: 'wrap',
        color: colors.mutedBlack,
        fontSize: 12,
        fontWeight: '600',
    },
    stockCodeNotFound: {
      flexWrap: 'wrap',
      color: colors.danger,
      fontSize: 12,
      fontWeight: '700',
    },
    stockName: {
        fontSize: 15,
        color: colors.black,
        fontWeight: '600',
        width: '100%', 
        flexWrap: 'wrap'
    },
    rightContainer: {flex: 1, flexWrap: 'wrap', justifyContent: 'center'},
  });
};
export default getStyles;