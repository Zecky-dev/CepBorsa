import { createThemeColors } from "@utils/themes";
import { ColorSchemeName, Platform, StyleSheet } from "react-native";
const getStyles = (theme: ColorSchemeName) => {
    const colors = createThemeColors(theme);
    return StyleSheet.create({
        titleContainer: {
            flex: 1,
        },
        title: {
            color: colors.white,
            fontSize: 18,
            fontWeight: '600',
            marginLeft: 12,
        },
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: colors.primary,
            alignItems: 'center',
            padding: 12,
        }
    })
};

export default getStyles;