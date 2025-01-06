import { createThemeColors } from "@utils/themes";
import { ColorSchemeName, StyleSheet } from "react-native";
const getStyles = (theme: ColorSchemeName) => {
    const colors = createThemeColors(theme);
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme === "light" ? colors.white : colors.secondary,
        },
        scrollContainer: {
            flexGrow: 1,
            paddingVertical: 10,
        },
        emptyBotMessageContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        emptyBotMessageText: {
            textAlign: 'center',
            fontSize: 20,
            color: colors.text,
        },
        emptyBotMessageIcon: {
            width: 128,
            height: 128,
        }
    })
}
export default getStyles;