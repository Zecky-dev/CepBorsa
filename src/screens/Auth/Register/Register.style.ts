import { createThemeColors } from "@utils/themes";
import { ColorSchemeName, StyleSheet, StatusBar, NativeModules } from "react-native";
const {StatusBarManager} = NativeModules;
const getStyles = (theme: ColorSchemeName) => {
    const colors = createThemeColors(theme);
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.primary,
            justifyContent: 'center',
        },
        innerContainer: {
            paddingHorizontal: 16,
            justifyContent: 'center',
            flexGrow: 1,
        },
        registerText: {
            color: 'white',
            fontSize: 36,
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: 36,
        }
    })
}
export default getStyles;