import {Dimensions, Platform} from 'react-native';

export const getKeyboardVerticalOffset = () => {
  const screenHeight = Dimensions.get('window').height;
  if (Platform.OS === 'ios') {
    if (screenHeight >= 812) return 110;
    return 64;
  }
  return 0;
};
