import { createThemeColors } from "@utils/themes";
import { ColorSchemeName, StyleSheet } from "react-native";
const getStyles = (theme: ColorSchemeName) => {
    const colors = createThemeColors(theme);
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme === "light" ? colors.white : colors.primary,
            
        },
        separator: {
            height: 1,
            backgroundColor: theme === "light" ? colors.boxBackground : colors.primary,
        },
        flatlistLoadingFooterContainer: {
            flexDirection: 'row',
            gap: 4,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 8,
            backgroundColor: theme === "light" ? 'transparent' : colors.secondary
        },
        flatlistLoadingText: {
            color: colors.text,
            fontSize: 16,
            fontWeight: 'bold',
        }
    })
}
export default getStyles;