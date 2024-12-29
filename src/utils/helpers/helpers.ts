import i18next from 'i18next';
import {showToast} from '@utils/config/toastHelper';
import {Dimensions, Platform} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ErrorCode,
} from 'react-native-image-picker';

// Ekran boyutuna göre klavye offset'ini hesaplar
export const getKeyboardVerticalOffset = () => {
  const screenHeight = Dimensions.get('window').height;
  if (Platform.OS === 'ios') {
    if (screenHeight >= 812) return 110;
    return 64;
  }
  return 0;
};

// Hata yönetimi
const handleImagePickError = (errorCode?: ErrorCode, errorMessage?: string) => {
  if (errorCode) {
    const errorMessages: Partial<Record<ErrorCode, string>> = {
      camera_unavailable: i18next.t('camera_unavailable_error'),
      permission: i18next.t('camera_permission_error'),
    };

    const message =
      errorMessages[errorCode] || errorMessage || i18next.t('unknown_error');
    showToast({
      type: 'error',
      text1: i18next.t('error'),
      text2: message,
    });
    return;
  }

  if (errorMessage) {
    showToast({
      type: 'error',
      text1: i18next.t('error'),
      text2: errorMessage,
    });
    return;
  }
};

// Resim seçme işlemi
export const pickImage = async (
  type: 'camera' | 'library',
): Promise<{name: string; uri: string} | void> => {
  try {
    const result =
      type === 'camera'
        ? await launchCamera({
            mediaType: 'photo',
            quality: 1,
            cameraType: 'front',
          })
        : await launchImageLibrary({
            mediaType: 'photo',
            quality: 1,
            selectionLimit: 1,
          });

    if (result.didCancel) {
      return;
    }

    if (result.errorCode || result.errorMessage) {
      handleImagePickError(result.errorCode, result.errorMessage);
      return;
    }

    const assets = result.assets;
    if (assets) {
      const image = assets[0];
      if (image.fileName && image.uri) {
        return {
          name: image.fileName,
          uri: image.uri,
        };
      }
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
