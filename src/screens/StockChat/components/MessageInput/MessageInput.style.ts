import { createThemeColors } from "@utils/themes";
import { ColorSchemeName, StyleSheet } from "react-native";
const getStyles = (theme: ColorSchemeName) => {
    const colors = createThemeColors(theme);
    return StyleSheet.create({
        container: {
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 4,
        },
        input: {
            flex: 1,
            paddingVertical: 12,
            paddingLeft: 12,
        },
        sendButton: {
            paddingRight: 8
        }
    })
}
export default getStyles;