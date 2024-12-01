import { ColorSchemeName, StyleSheet, Platform } from "react-native";
import { createThemeColors } from "../../utils/themes";
const getStyles = (theme: ColorSchemeName) => {
    const colors = createThemeColors(theme);
    return StyleSheet.create({
        container: {

        },
        label: {
            color: colors.white,
            fontWeight: 'semibold',
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 8,
            backgroundColor: colors.white,
            padding: Platform.OS === "android" ? 6 : 12,
            borderRadius: 6,
        },
        input: {
            flex: 1, 
            textAlignVertical: 'center',
        }
    })
}
export default getStyles;