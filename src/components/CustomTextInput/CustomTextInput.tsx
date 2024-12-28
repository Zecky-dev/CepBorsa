import React, {useState} from 'react';
import {
  Platform,
  Pressable,
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

// Styles & colors
import getStyles from './CustomTextInput.style';
import {useTheme} from '@context/ThemeProvider';

// Icon
import Icon from '@components/Icon';

type Props = {
  label?: string;
  icon?: IconPropType;
  isPassword?: boolean;
  additionalStyles?: {
    containerStyle?: StyleProp<ViewStyle>,
    labelStyle?: StyleProp<TextStyle>,
    inputContainerStyle?: StyleProp<ViewStyle>,
    inputStyle?: StyleProp<TextStyle>
  }
} & TextInputProps;

const CustomTextInput = ({label, icon, isPassword = false, additionalStyles, ...rest}: Props) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const [isSecure, setIsSecure] = useState(true);

  return (
    <View style={[styles.container, additionalStyles?.containerStyle]}>
      {label && <Text style={[styles.label, additionalStyles?.labelStyle]}>{label}</Text>}
      <View style={styles.innerContainer}>
        <View style={[styles.inputContainer, additionalStyles?.inputContainerStyle]}>
          {icon && (
            <Icon
              name={icon.name}
              color={icon.color}
              size={icon.size}
              type={icon.type}
            />
          )}
          <TextInput
            autoCapitalize="none"
            style={[styles.input, additionalStyles?.inputStyle ,Platform.OS === 'ios' && {paddingLeft: 4}]}
            secureTextEntry={isSecure && isPassword}
            {...rest}
          />
        </View>
        {isPassword && (
          <Pressable onPress={() => setIsSecure(!isSecure)} style={styles.hideUnhidePasswordButton}>
            <Icon name={isSecure ? 'eye-off' : 'eye'} color="black" size={18} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default CustomTextInput;
