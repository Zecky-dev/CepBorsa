import { createThemeColors } from "@utils/themes";
import { ColorSchemeName, StyleSheet } from "react-native";
const getStyles = (theme: ColorSchemeName) => {
    const colors = createThemeColors(theme);
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.primary,
            paddingHorizontal: 12,
            justifyContent: 'center',
        },
        forgotPasswordText: {
            fontSize: 36,
            color: colors.white,
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: 36,
        },
        innerContainer: {
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 12,
        }
    })
}
export default getStyles;