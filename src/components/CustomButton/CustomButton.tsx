import {
  TouchableOpacity,
  Text,
  View,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';

import styles from './CustomButton.style';
import Icon from '@components/Icon';
import getStyles from './CustomButton.style';
import {useTheme} from '@context/ThemeProvider';
import {createThemeColors} from '@utils/themes';

type ButtonType = 'neutral' | 'primary' | 'danger' | 'success';

type Props = {
  label: string;
  icon?: IconPropType;
  type?: ButtonType;
  loading?: boolean;
} & TouchableOpacityProps;

const CustomButton = ({
  label,
  icon,
  type = 'neutral',
  loading = false,
  ...rest
}: Props) => {
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
      case 'success':
        return {
          backgroundColor: colors.success,
          textColor: colors.white,
        };
    }
  };

  const dynamicStyles = createDynamicStyle();

  return (
    <TouchableOpacity
      disabled={loading}
      style={[
        styles.container,
        {backgroundColor: dynamicStyles.backgroundColor},
      ]}
      activeOpacity={0.8}
      {...rest}>
      {loading ? (
        <ActivityIndicator size={'small'} color={colors.primary} />
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {icon && (
            <View style={{marginRight: 4}}>
              <Icon name={icon.name} size={icon.size} color={icon.color} />
            </View>
          )}
          <Text style={[styles.label, {color: dynamicStyles.textColor}]}>
            {label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
