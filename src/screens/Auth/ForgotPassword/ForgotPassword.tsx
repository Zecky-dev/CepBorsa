import React, {useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {CustomButton, CustomTextInput, Icon, Space} from '@components';

import getStyles from './ForgotPassword.style';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@context/ThemeProvider';
import {useTranslation} from 'react-i18next';
import {validateEmail} from '@utils/helpers/helpers';
import auth from '@react-native-firebase/auth';
import {showToast} from '@utils/config/toastHelper';
import {useLoading} from '@context/LoadingContext';
import {useLanguage} from '@context/LanguageProvider';

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ForgotPassword'
>;

const ForgotPassword = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const {theme} = useTheme();
  const {language} = useLanguage();
  const {showLoading, hideLoading} = useLoading();

  const styles = getStyles(theme);

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const resetPassword = () => {
    if (validateEmail(email)) {
      setLoading(true);
      auth().setLanguageCode(language);
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          showToast({
            type: 'info',
            text1: t('emailSent'),
            text2: t('emailSentDescription'),
          });
        })
        .catch(error => {
          console.log('PASSWORD_RESET_EMAIL_SENT_ERROR', error);
          showToast({
            type: 'error',
            text1: t('error'),
            text2: t('unknownError'),
          });
        })
        .finally(() => {
          setLoading(false)
        });
    } else {
      showToast({
        type: 'error',
        text1: t('error'),
        text2: t('emailValidationError'),
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.forgotPasswordText}>{t('forgotPassword')}</Text>
        <CustomTextInput
          label={t('email')}
          placeholder="test@cepborsa.com"
          onChangeText={val => setEmail(val)}
        />
        <Space />
        <CustomButton label={t('resetPassword')} onPress={resetPassword} loading={loading} />
        <View
          style={{position: 'absolute', top: 12, left: 12, overflow: 'hidden'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon type="antdesign" name="arrowleft" color="white" size={36} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
