import { createThemeColors } from "@utils/themes";
import { ColorSchemeName, StyleSheet } from "react-native";
const getStyles = (theme: ColorSchemeName) => {
    const colors = createThemeColors(theme);
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme === "light" ? colors.white : colors.primary,
            paddingVertical: 12,
        },
        logoutButton: {
            backgroundColor: colors.danger,
            width: 30,
            height: 30,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 8,
        },
        
        changeAvatarIcon: {
            width: 128,
            height: 128,
            resizeMode: 'contain',
        },

        changeProfilePicButton: {
            width: 128,
            height: 128,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
        },

        row: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 24,
            justifyContent: 'space-between',
            marginBottom: 16,
        },

        title: {
            color: colors.text,
            fontSize: 16,
            fontWeight: '600',
        },

        changePasswordButton: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F5F5F5',
            padding: 12,
            borderRadius: 4,
        },

        editActiveButton: {
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
            borderRadius: 16,
        }

       



    })
}
export default getStyles;