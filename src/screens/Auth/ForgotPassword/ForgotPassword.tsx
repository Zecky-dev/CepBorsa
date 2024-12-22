import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {CustomButton, CustomTextInput, Icon, Space} from '@components';

import getStyles from './ForgotPassword.style';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@context/ThemeProvider';
import { useTranslation } from 'react-i18next';

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ForgotPassword'
>;

const ForgotPassword = () => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.forgotPasswordText}>{t('forgotPassword')}</Text>
        <CustomTextInput
          label={t('email')}
          placeholder="test@cepborsa.com"
        />
        <Space />
        <CustomButton
          label={t('resetPassword')}
          onPress={() => console.log('Şifre sıfırla')}
        />
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
