import { createThemeColors } from "@utils/themes";
import { ColorSchemeName, StyleSheet } from "react-native";
const getStyles = (theme: ColorSchemeName) => {
    const colors = createThemeColors(theme)
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        image: {
            width: 250,
            height: 250,
            resizeMode: 'contain',
        },
        text: {
            fontSize: 20,
            color: colors.text,
            fontWeight: '400',
            marginTop: 24,
            textAlign: 'center',
            lineHeight: 32
        }
    })
}
export default getStyles;

