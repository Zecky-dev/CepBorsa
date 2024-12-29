import {Icon} from '@components';
import {Platform, StatusBar, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Toast, {
  SuccessToast,
  ErrorToast,
  ToastConfig,
  ToastConfigParams,
  ToastProps,
  ToastShowParams,
  BaseToast,
} from 'react-native-toast-message';

const COMMON_TOAST_STYLES = {
  container: {
    borderLeftWidth: 0,
    borderRadius: 4,
  },
  contentContainer: {
    borderLeftWidth: 0,
    marginLeft: 0,
    paddingLeft: 0,
    padding: 0,
  },
  text1Style: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  text2Style: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  iconContainer: {
    justifyContent: "center",
    paddingHorizontal: 8,
  },
};

export const toastConfig: ToastConfig = {
  success: (props: ToastConfigParams<ToastProps>) => (
    <SuccessToast
      {...props}
      style={{
        ...COMMON_TOAST_STYLES.container,
        backgroundColor: '#1DD1A1',
      }}
      contentContainerStyle={COMMON_TOAST_STYLES.contentContainer}
      text1Style={COMMON_TOAST_STYLES.text1Style}
      text2Style={COMMON_TOAST_STYLES.text2Style}
      text1NumberOfLines={2}
      text2NumberOfLines={3}
      renderLeadingIcon={() => (
        <View style={COMMON_TOAST_STYLES.iconContainer}>
          <Icon name="checkmark" size={24} type="ion" color={'white'} />
        </View>
      )}
    />
  ),
  error: (props: ToastConfigParams<ToastProps>) => (
    <ErrorToast
      {...props}
      style={{
        ...COMMON_TOAST_STYLES.container,
        backgroundColor: '#E74C3C',
      }}
      contentContainerStyle={COMMON_TOAST_STYLES.contentContainer}
      text1Style={COMMON_TOAST_STYLES.text1Style}
      text2Style={COMMON_TOAST_STYLES.text2Style}
      text1NumberOfLines={2}
      text2NumberOfLines={3}
      renderLeadingIcon={() => (
        <View style={COMMON_TOAST_STYLES.iconContainer}>
          <Icon name="close" size={24} type="antdesign" color={'white'} />
        </View>
      )}
    />
  ),
  warning: (props: ToastConfigParams<ToastProps>) => (
    <BaseToast
      {...props}
      style={{
        ...COMMON_TOAST_STYLES.container,
        backgroundColor: '#FFAF40',
      }}
      contentContainerStyle={COMMON_TOAST_STYLES.contentContainer}
      text1Style={COMMON_TOAST_STYLES.text1Style}
      text2Style={COMMON_TOAST_STYLES.text2Style}
      text1NumberOfLines={2}
      text2NumberOfLines={3}
      renderLeadingIcon={() => (
        <View style={COMMON_TOAST_STYLES.iconContainer}>
          <Icon name="warning" size={24} type="antdesign" color={'white'} />
        </View>
      )}
    />
  ),
};

export const showToast = (params: Omit<ToastShowParams, 'topOffset'>) => {
  let topOffset = 32;
  const hasNotch = DeviceInfo.hasNotch();
  const platform = Platform.OS;

  if (platform === 'ios') {
    if (hasNotch) {
      topOffset = 64;
    } else {
      topOffset = 32;
    }
  } else {
    topOffset = 16;
  }

  Toast.show({
    topOffset,
    ...params,
  });
};
