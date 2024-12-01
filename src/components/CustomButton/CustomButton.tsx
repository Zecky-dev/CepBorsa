import {
  TouchableOpacity,
  Text,
  View,
  TouchableOpacityProps,
} from 'react-native';

import styles from './CustomButton.style';
import Icon from '@components/Icon';
import getStyles from './CustomButton.style';
import {useTheme} from '@context/ThemeProvider';
import { createThemeColors } from '@utils/themes';

type ButtonType = 'neutral' | 'primary' | 'danger';

type Props = {
  label: string;
  icon?: IconPropType;
  type?: ButtonType;
} & TouchableOpacityProps;

const CustomButton = ({label, icon, type = 'neutral', ...rest}: Props) => {
  const {theme} = useTheme();
  const colors = createThemeColors(theme);
  const styles = getStyles(theme);

  const createDynamicStyle = (): {
    backgroundColor: string;
    textColor: string;
  } => {
    switch (type) {
      case 'neutral':
        return {
          backgroundColor: colors.white,
          textColor: colors.black,
        };
      case 'primary':
        return {
          backgroundColor: colors.primary,
          textColor: colors.white,
        };
      case 'danger':
        return {
          backgroundColor: colors.danger,
          textColor: colors.white,
        };
    }
  };

  const dynamicStyles = createDynamicStyle();

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: dynamicStyles.backgroundColor }]} activeOpacity={.8} {...rest}>
      {icon && <Icon name={icon.name} size={icon.size} color={icon.color} />}
      <Text style={[styles.label, { color: dynamicStyles.textColor }]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
