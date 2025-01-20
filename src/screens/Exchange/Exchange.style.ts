import { createThemeColors } from "@utils/themes";
import { ColorSchemeName, StyleSheet } from "react-native";
const getStyles = (theme: ColorSchemeName) => {
    const colors = createThemeColors(theme);
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme === "light" ? colors.white : colors.primary,
            padding: 8
        },
        currencyContainer: {
            flex: 1,
        }
    })
}
export default getStyles;