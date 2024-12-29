import React, {useLayoutEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@context/ThemeProvider';
import { useAuth } from '@context/AuthProvider';
import {t} from 'i18next';
import getStyles from './ChangePassword.style';
import {CustomButton, CustomTextInput, Space} from '@components';

import {showToast} from '@utils/config/toastHelper';
import {createThemeColors} from '@utils/themes';


const ChangePassword = () => {
  const {theme} = useTheme();
  const { changePassword } = useAuth();
  const colors = createThemeColors(theme);
  const styles = getStyles(theme);
  const navigation = useNavigation();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordAgain, setNewPasswordAgain] = useState('');
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('changePassword'),
    });
  });

  const handleChangePassword = async () => {
    try {
      setLoading(true);
      const res = await changePassword(oldPassword, newPassword, newPasswordAgain);
      showToast({
        type: res.status,
        text1: t(res.status),
        text2: t(res.message),
      })
    }
    catch(error: any) {
      showToast({
        type: error.status,
        text1: t(error.status),
        text2: t(error.message),
      })
    }
    finally {
      setLoading(false)
    }
  };

  const CUSTOM_TEXTINPUT_ADDITIONAL_STYLES = {
    labelStyle: {
      color: colors.text,
    },
    innerContainer: {
      borderColor: colors.mutedText,
      borderWidth: 1,
    },
  };

  return (
    <View style={styles.container}>
      <CustomTextInput
        placeholder="***************"
        label={t('oldPassword')}
        isPassword={true}
        onChangeText={setOldPassword}
        additionalStyles={CUSTOM_TEXTINPUT_ADDITIONAL_STYLES}
      />
      <Space />
      <CustomTextInput
        placeholder="***************"
        label={t('newPassword')}
        isPassword={true}
        onChangeText={setNewPassword}
        additionalStyles={CUSTOM_TEXTINPUT_ADDITIONAL_STYLES}
      />
      <Space />
      <CustomTextInput
        placeholder="***************"
        label={t('newPasswordAgain')}
        isPassword={true}
        onChangeText={setNewPasswordAgain}
        additionalStyles={CUSTOM_TEXTINPUT_ADDITIONAL_STYLES}
      />
      <Space size={32} />
      <CustomButton
        loading={loading}
        type="primary"
        label={t('changePassword')}
        onPress={handleChangePassword}
      />
    </View>
  );
};

export default ChangePassword;
