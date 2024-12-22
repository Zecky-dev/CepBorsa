import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {CustomButton, CustomTextInput, Icon, Space} from '@components';

// Theme & Styles
import {useTheme} from '@context/ThemeProvider';
import getStyles from './Register.style';

// Navigation
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

// Auth
import {useAuth} from '@context/AuthProvider';

// Language
import {useTranslation} from 'react-i18next';

// Helpers
import {showToast} from '@utils/config/toastHelper';

import firestore from '@react-native-firebase/firestore';

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

const Register = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const {theme} = useTheme();
  const {t} = useTranslation();
  const styles = getStyles(theme);
  const {signUp} = useAuth();

  const [nameSurname, setNameSurname] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const register = async (email: string, password: string) => {
    if (nameSurname.trim().length !== 0) {
      setLoading(true);
      try {
        const userCredential = await signUp(email, password);
        await userCredential.user.updateProfile({
          displayName: nameSurname
        });
        const id = userCredential.user.uid;
        const createDate = firestore.FieldValue.serverTimestamp();
        await firestore().collection('users').doc(email).set({
          id,
          email,
          photo: null,
          createDate,
          favorites: [],
          status: 'active',
        });
        console.log("SIGNUP_SUCCESS");
      } catch (error: any) {
        const errorCode = error.code || 'unknown';
        showToast({
          type: 'error',
          text1: t('registerFailTitle'),
          text2:
            errorCode !== 'unknown'
              ? t(`authErrorMessages.${errorCode}`)
              : t('unknown-error'),
        });
        console.log('SIGNUP_ERROR', error);
      } finally {
        setLoading(false);
      }
    } else {
      showToast({
        type: 'error',
        text1: t('error'),
        text2: t('nameSurnameEmpty'),
      });
      setLoading(false);
      console.log('SIGNUP_ERROR_NAMESURNAME_EMPTY');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <Text style={styles.registerText}>{t('register')}</Text>

          <CustomTextInput
            label={t('nameSurname')}
            placeholder="Mehmet Dinçer"
            onChangeText={val => setNameSurname(val)}
          />

          <Space />

          <CustomTextInput
            value={email}
            label={t('email')}
            placeholder="test@cepborsa.com"
            onChangeText={val => setEmail(val)}
          />

          <Space />

          <CustomTextInput
            value={pass}
            label={t('password')}
            placeholder="*********"
            isPassword={true}
            onChangeText={val => setPass(val)}
          />

          <Space size={32} />

          <CustomButton
            label={t('register')}
            type="neutral"
            onPress={() => register(email, pass)}
            loading={loading}
          />
          <View
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              overflow: 'hidden',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon type="antdesign" name="arrowleft" color="white" size={36} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
