import React, { useEffect } from 'react';
import {View, Text, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {getStyles} from './Login.style';

import {useTheme} from '../../../context/ThemeProvider';
import {CustomTextInput, Space, CustomButton} from '@components';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const Login = () => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  // Text animation
  const translateY = useSharedValue(-50);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
    opacity: opacity.value,
  }))

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 1000 }); 
    opacity.value = withTiming(1, { duration: 500 });
  }, [])


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appTextsContainer}>
        <Text style={styles.appName}>CepBorsa</Text>
        <Text style={styles.appSlogan}>Cebindeki Borsa</Text>
      </View>

      <CustomTextInput
        label="E-posta Adresi"
        placeholder="test@epostadresi.com"
        icon={{name: "envelope", type: "evil", size: 24,}}
      />

      <Space size={12} />

      <CustomTextInput
        label="Şifre"
        placeholder="************"
        secureTextEntry={true}
        icon={{name: "lock", type: "evil", size: 24,}}
      />

      <Space size={24} />

      <CustomButton
        onPress={() => console.log('Giriş Yap')}
        label="Giriş Yap"
      />

      <Space size={32} />

      <View style={styles.registerAreaContainer}>
        <Text style={styles.alreadyRegisteredText}>
          Henüz Kayıtlı Değil Misin?
        </Text>
        <Pressable onPress={() => console.log('Kayıt Ol')}>
          <Text style={styles.registerButtonText}>Kayıt Ol</Text>
        </Pressable>
      </View>

      <Pressable onPress={() => console.log('Şifremi unuttum')} style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordText}>Şifremi unuttum?</Text>
      </Pressable>



    </SafeAreaView>
  );
};

export default Login;
