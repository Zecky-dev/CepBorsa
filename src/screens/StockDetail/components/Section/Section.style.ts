import { createThemeColors } from "@utils/themes";
import { ColorSchemeName, StyleSheet } from "react-native";
const getStyles = (theme: ColorSchemeName) => {
    const colors = createThemeColors(theme)
    return StyleSheet.create({
        container: {
        },
        title: {
            color: theme === "light" ? colors.black : colors.white,
            fontSize: 24,
            fontWeight: '800',
        },
        titleContainer: {
            paddingBottom: 8,
            borderBottomWidth: 1,
            borderBottomColor: theme === "light" ? colors.black : colors.white,
        },
        contenContainer: {
            marginVertical: 12
        }
    })
}
export default getStyles;