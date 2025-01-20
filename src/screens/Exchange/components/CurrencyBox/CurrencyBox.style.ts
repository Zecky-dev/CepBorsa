import { createThemeColors } from "@utils/themes";
import { ColorSchemeName, StyleSheet } from "react-native";

const getStyles = (theme: ColorSchemeName) => {
    const colors = createThemeColors(theme);
    return StyleSheet.create({
        container: {
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 24,
        },
        currencyCode: {
            marginVertical: 4,
            color: colors.white,
            fontSize: 24,
            fontWeight: '300',
        },
        priceContainer: {
            marginBottom: 8,
        },
        price: {
            color: colors.white,
            fontSize: 18,
            fontWeight: '300',
        },
        icon: {
            width: 48,
            height: 48,
        }
    });
}

export default getStyles;
