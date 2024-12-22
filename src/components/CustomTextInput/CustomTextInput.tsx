import React, {useState} from 'react';
import {
  Platform,
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  View,
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
} & TextInputProps;

const CustomTextInput = ({label, icon, isPassword = false, ...rest}: Props) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const [isSecure, setIsSecure] = useState(true);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.innerContainer}>
        <View style={styles.inputContainer}>
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
            style={[styles.input, Platform.OS === 'ios' && {paddingLeft: 4}]}
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
