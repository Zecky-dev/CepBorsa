import { createThemeColors } from "@utils/themes";
import { ColorSchemeName, StyleSheet } from "react-native";
const getStyles = (theme: ColorSchemeName) => {
    const colors = createThemeColors(theme);
    return StyleSheet.create({
        container: {
            backgroundColor: colors.boxBackground,
            flexDirection: 'row',
            padding: 12,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 12,
        },
        image: {
            width: 48,
            height: 48,
            borderRadius: 24,
        },
        code: {
            fontSize: 12,
            color: colors.mutedBlack,
            fontWeight: '600',
        },
        name: {
            color: colors.black,
            fontSize: 16,
            fontWeight: 'bold',
        }
    })
}
export default getStyles;