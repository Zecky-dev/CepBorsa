import { createThemeColors } from "@utils/themes";
import { ColorSchemeName, StyleSheet } from "react-native";
const getStyles = (theme: ColorSchemeName) => {
    const colors = createThemeColors(theme);
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.secondary,
            paddingVertical: 8,
        },
        flatlistContentContainer: {
            flexGrow: 1,
            padding: 12,

        }
    })
}
export default getStyles;