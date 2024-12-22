import { createThemeColors } from "@utils/themes";
import { ColorSchemeName, StyleSheet } from "react-native";
const getStyles = (theme: ColorSchemeName) => {
    const colors = createThemeColors(theme);
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme === "light" ? colors.white : colors.primary,
            paddingHorizontal: 16,
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
        
        changeProfilePicButton: {
            width: 128,
            height: 128,
            alignSelf: 'center',
        },

        changeAvatarIcon: {
            width: 128,
            height: 128,
            resizeMode: 'contain',
        },

        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },

        rowTitle: {
            fontSize: 16,
            fontWeight: '600',
            color: colors.text,
        },

        rowValue: {
            fontSize: 14,
            fontWeight: '400',
            color: colors.text,
        },

        changePasswordButton: {
            backgroundColor: colors.boxBackground,
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
        },

        changePasswordButtonText: {
            fontSize: 16,
        },

        separatorLine: {
            height: 1,
            backgroundColor: colors.mutedText,
            marginVertical: 16,
        },

        preferencesSectionTitle: {
            fontSize: 20,
            fontWeight: '600',
            color: colors.text,
        },

        changeLanguageButton: {

        },

        changeLanguageButtonIcon: {
            width: 36,
            height: 36,
        },

        preferenceBox: {
            backgroundColor: colors.boxBackground,
            padding: 12,
            borderRadius: 8,
        },

        input: {
            paddingHorizontal: 16,
            paddingVertical: 4,    
            color: colors.text,
        },

        menuOptionContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },

        editButton: {
            position: 'absolute',
            top: 12,
            right: 12,
            backgroundColor: colors.primary,
            width: 48,
            height: 48,
            borderRadius: 24,
            justifyContent: 'center',
            alignItems: 'center',
        }




        


       



    })
}
export default getStyles;