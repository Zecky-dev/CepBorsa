import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// Theme & Styles
import getStyles from './Profile.style';
import {useTheme} from '../../context/ThemeProvider';

// Language
import {useTranslation} from 'react-i18next';
import {useAuth} from '@context/AuthProvider';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {CustomButton, Icon, Space} from '@components';

import auth from '@react-native-firebase/auth';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

const Profile = () => {
  // Theme & Styles
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const {signOut} = useAuth();

  // Translation
  const {t} = useTranslation();

  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const route = useRoute<ProfileScreenRouteProp>();

  const currentUser = auth().currentUser;
  const [editActive, setEditActive] = useState(false);
  const [nameSurname, setNameSurname] = useState(currentUser?.displayName);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.logoutButton}
          onPress={() => signOut()}>
          <Icon name="poweroff" type="antdesign" color={'white'} size={18} />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => console.log('Resim değiştir')}
        style={styles.changeProfilePicButton}>
        <Image
          source={
            theme === 'dark'
              ? require('@assets/images/changeAvatar_dark.png')
              : require('@assets/images/changeAvatar_light.png')
          }
          style={styles.changeAvatarIcon}
        />
      </TouchableOpacity>

      <View>
        <View style={styles.row}>
          <Text style={styles.title}>Ad Soyad:</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              style={styles.nameSurnameInput}
              value={nameSurname as string}
              onChangeText={val => setNameSurname(val)}
            />
            <TouchableOpacity
              onPress={() => setEditActive(!editActive)}
              style={styles.editActiveButton}
            >
              <Icon name='pencil' type='evil' size={24} color='white'/>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>E-posta:</Text>
          <Text style={styles.value}>{currentUser?.email}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>Şifre:</Text>
          <TouchableOpacity
            onPress={() => console.log('Şifre değiştir')}
            style={styles.changePasswordButton}>
            <Icon name="lock" type="evil" size={24} color="black" />
            <Space size={4} direction="x" />
            <Text style={styles.changePasswordText}>Şifre Değiştir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;
