import { createThemeColors } from "@utils/themes";
import { ColorSchemeName, StyleSheet } from "react-native";
const getStyles = (theme: ColorSchemeName) => {
    const colors = createThemeColors(theme);
    return StyleSheet.create({
        container: {
            flex: 1,
            paddingBottom: 8,
            paddingHorizontal: 6,
        },
        flatlistContentContainer: {
            flexGrow: 1,
            paddingVertical: 12,
        }
    })
}
export default getStyles;