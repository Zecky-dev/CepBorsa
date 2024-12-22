import { createThemeColors } from "@utils/themes";
import { ColorSchemeName, StyleSheet } from "react-native";
const getStyles = (theme: ColorSchemeName) => {
    const colors = createThemeColors(theme);
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme === "light" ? colors.white : colors.primary,
            padding: 12,
        },
        innerContainer: {
            flexGrow: 1,
            paddingVertical: 18,
            paddingHorizontal: 12,
        },
        innerTopContainer: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        logo: {
            width: 100,
            height: 100,
            borderRadius: 60,
        },
        name: {
            fontSize: 18,
            color: theme === "light" ? colors.black : colors.white,
            fontWeight: '600',
            textAlign: 'center',
            paddingHorizontal: 16,
        },
        descriptionNotFound: {
            fontSize: 14,
            fontWeight: '500',
            color: colors.danger,
        },
        headerRightContainer: {
            flexDirection: 'row',
        }
    })
}
export default getStyles;