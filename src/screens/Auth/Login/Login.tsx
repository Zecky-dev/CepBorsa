import React, {useEffect, useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// Theme & Styles
import {getStyles} from './Login.style';
import {useTheme} from '../../../context/ThemeProvider';

// Components
import {CustomTextInput, Space, CustomButton} from '@components';

// Animation
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

// Navigation
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

// Language
import {useTranslation} from 'react-i18next';
import {showToast} from '@utils/config/toastHelper';
import {useAuth} from '@context/AuthProvider';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

const Login = () => {
  // Navigation & route
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const route = useRoute<LoginScreenRouteProp>();

  // Theme & Styles

  const {theme} = useTheme();
  const styles = getStyles(theme);

  // Text animation
  const translateX = useSharedValue(-50);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
    opacity: opacity.value,
  }));

  useEffect(() => {
    translateX.value = withSpring(0, {
      damping: 100,
      stiffness: 100,
    });
    opacity.value = withTiming(1, {duration: 500});
  }, []);

  // Translation
  const {t} = useTranslation();

  // Form
  const [email, setEmail] = useState(route.params?.email || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Auth
  const {signIn} = useAuth();

  // Login

  const login = async () => {
    const errors = [];
    if (email.trim().length === 0) errors.push('emailEmpty');
    if (password.trim().length === 0) errors.push('passwordEmpty');

    if (errors.length === 0) {
      try {
        setLoading(true);
        await signIn(email, password);
        console.info('LOGIN_SUCCESS');
      } catch (error: any) {
        const errorCode = error.code || 'unknown';
        showToast({
          type: 'error',
          text1: t('loginFailTitle'),
          text2:
            errorCode !== 'unknown'
              ? t(`authErrorMessages.${errorCode}`)
              : t('unknown-error'),
        });
        console.log('LOGIN_ERROR', error);
      }
      finally {
        setLoading(false);
      }
    } else {
      showToast({
        type: 'error',
        text1: t('loginFailTitle'),
        text2: t(errors[0]),
      });
      console.log('LOGIN_ERROR', errors);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appTextsContainer}>
        <Text style={styles.appName}>CepBorsa</Text>
        <Animated.Text style={[styles.appSlogan, animatedStyle]}>
          {t('appSlogan')}
        </Animated.Text>
      </View>

      <CustomTextInput
        label={t('email')}
        placeholder="test@cepborsa.com"
        value={route.params?.email}
        onChangeText={val => setEmail(val)}
        icon={{name: 'envelope', type: 'evil', size: 24}}
        isPassword={false}
      />

      <Space size={12} />

      <CustomTextInput
        label={t('password')}
        onChangeText={val => setPassword(val)}
        placeholder="************"
        icon={{name: 'lock', type: 'evil', size: 24}}
        isPassword={true}
      />

      <Space size={24} />

      <CustomButton onPress={login} label={t('login')} loading={loading}/>

      <Space size={32} />

      <View style={styles.registerAreaContainer}>
        <Text style={styles.alreadyRegisteredText}>
          {t('notRegisteredYet')}
        </Text>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerButtonText}>{t('register')}</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => navigation.navigate('ForgotPassword')}
        style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordText}>{t('forgotPassword')}</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Login;
