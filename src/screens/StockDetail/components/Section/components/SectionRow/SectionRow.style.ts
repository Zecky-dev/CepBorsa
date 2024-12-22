import { createThemeColors } from "@utils/themes";
import { ColorSchemeName, StyleSheet } from "react-native";
const getStyles = (theme: ColorSchemeName) => {
    const colors = createThemeColors(theme)
    return StyleSheet.create({
        rowContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
            flexWrap: 'wrap',
        },
        rowTitle: {
            color: theme === "dark" ? colors.white : colors.black,
            fontSize: 14,
            fontWeight: '700',
        },
        rowValue: {
            fontSize: 13,
            fontWeight: '500',
            color: theme === "dark" ? colors.white : colors.black,
            textAlign: 'right',
        },
        rowValueNotFound: {
            fontSize: 13,
            fontWeight: '700',
            color: colors.danger,
            textAlign: 'right',
        }
    })
}
export default getStyles;