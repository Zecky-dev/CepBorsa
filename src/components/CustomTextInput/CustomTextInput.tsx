import React from 'react'
import { Platform, Text, TextInput, TextInputProps, View } from 'react-native'

// Styles & colors
import getStyles from './CustomTextInput.style'
import { useTheme } from '@context/ThemeProvider';

// Icon
import Icon from '@components/Icon';

type Props = {
    label?: string;
    icon?: IconPropType;
} & TextInputProps


const CustomTextInput = ({label, icon, ...rest}: Props) => {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    return (
        <View style={styles.container}>
            {label && (
                <Text style={styles.label}>{label}</Text>
            )}
            <View style={styles.inputContainer}>
                {icon && <Icon name={icon.name} color={icon.color} size={icon.size} type={icon.type}/>}
                <TextInput autoCapitalize='none' style={[styles.input, Platform.OS === "ios" && { paddingLeft: 4, }]} {...rest}/>
            </View>
        </View>
    )
}

export default CustomTextInput;