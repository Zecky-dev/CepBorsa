import React, {useLayoutEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';

// Theme & Styles
import getStyles from './Profile.style';
import {useTheme} from '../../context/ThemeProvider';

// Language
import {useTranslation} from 'react-i18next';
import {useAuth} from '@context/AuthProvider';
import {useLanguage} from '@context/LanguageProvider';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import {CustomButton, Icon, Space} from '@components';

import auth from '@react-native-firebase/auth';

import {createThemeColors} from '@utils/themes';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

const Profile = () => {
  // Theme & Styles
  const {theme, setTheme} = useTheme();
  const styles = getStyles(theme);

  const {signOut} = useAuth();

  // Translation
  const {t} = useTranslation();
  const {language, changeLanguage} = useLanguage();

  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const currentUser = auth().currentUser;
  const [editActive, setEditActive] = useState(false);
  const [nameSurname, setNameSurname] = useState(currentUser?.displayName);

  const [themePref, setThemePref] = useState(theme);
  const [languagePref, setLanguagePref] = useState(language);

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
      title: t('profile')
    });
  });

  const handleCancelSave = () => {
    setLanguagePref(language);
    setThemePref(theme);
    setNameSurname(currentUser?.displayName);
    setEditActive(false);
  };

  const handleSave = () => {
    setLanguagePref(languagePref);
    setThemePref(themePref);
    setEditActive(false);
    changeLanguage(languagePref);
    setTheme(themePref);
  }

  return (
    <View style={styles.container}>
      {/* Fotoğraf değiştirme */}
      <TouchableOpacity
        disabled={!editActive}
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
      <Space size={32} />
      <View style={{flex: 1}}>
        <View>
          {/* İsim soyisim */}
          <View style={styles.row}>
            <Text style={styles.rowTitle}>{t('nameSurname')}:</Text>
            <View style={styles.row}>
              <TextInput
                value={nameSurname!}
                onChangeText={val => setNameSurname(val)}
                style={[
                  styles.input,
                  editActive && {
                    borderColor: theme === 'light' ? 'black' : 'white',
                    borderWidth: 1,
                  },
                ]}
                editable={editActive}
              />
            </View>
          </View>
          <Space />
          {/* Email */}
          <View style={styles.row}>
            <Text style={styles.rowTitle}>{t('email')}:</Text>
            <Text style={styles.rowValue}>{currentUser?.email}</Text>
          </View>
          <Space />
          {/* Şifre */}
          <View style={styles.row}>
            <Text style={styles.rowTitle}>{t('password')}:</Text>
            <TouchableOpacity
              onPress={() => console.log('Şifre değiştirme yönlendirme')}
              style={[styles.row, styles.changePasswordButton]}>
              <Icon name="lock" type="antdesign" size={18} />
              <Space direction="x" size={4} />
              <Text style={styles.changePasswordButtonText}>
                {t('changePassword')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.separatorLine} />

        {/* Tercihler */}
        <View>
          <Text style={styles.preferencesSectionTitle}>{t('preferences')}</Text>
          <Space />
          {/* Dil */}
          <View style={[styles.row, styles.preferenceBox]}>
            <Text style={[styles.rowTitle, {flex: 1}]}>{t('language')}</Text>
            <Menu>
              <MenuTrigger disabled={!editActive}>
                <Image
                  source={
                    languagePref === 'tr'
                      ? require('@assets/images/turkish.png')
                      : require('@assets/images/english.png')
                  }
                  style={styles.changeLanguageButtonIcon}
                />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption
                  onSelect={() => setLanguagePref('tr')}
                  style={styles.menuOptionContainer}>
                  <Image
                    source={require('@assets/images/turkish.png')}
                    style={styles.changeLanguageButtonIcon}
                  />
                  <Space direction="x" size={8} />
                  <Text>Türkçe</Text>
                </MenuOption>

                <MenuOption
                  onSelect={() => setLanguagePref('en')}
                  style={styles.menuOptionContainer}>
                  <Image
                    source={require('@assets/images/english.png')}
                    style={styles.changeLanguageButtonIcon}
                  />
                  <Space direction="x" size={8} />
                  <Text>English</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
          <Space />
          {/* Tema */}
          <View style={[styles.row, styles.preferenceBox]}>
            <Text style={styles.rowTitle}>{t('theme')}</Text>
            <Menu>
              <MenuTrigger disabled={!editActive}>
                <Image
                  source={
                    themePref === 'dark'
                      ? require('@assets/images/darkMode.png')
                      : require('@assets/images/lightMode.png')
                  }
                  style={styles.changeLanguageButtonIcon}
                />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption
                  onSelect={() => setThemePref('dark')}
                  style={styles.menuOptionContainer}>
                  <Image
                    source={require('@assets/images/darkMode.png')}
                    style={styles.changeLanguageButtonIcon}
                  />
                  <Space direction="x" size={8} />
                  <Text>{t('darkTheme')}</Text>
                </MenuOption>
                <MenuOption
                  onSelect={() => setThemePref('light')}
                  style={styles.menuOptionContainer}>
                  <Image
                    source={require('@assets/images/lightMode.png')}
                    style={styles.changeLanguageButtonIcon}
                  />
                  <Space direction="x" size={8} />
                  <Text>{t('lightTheme')}</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </View>
      </View>
      {editActive && (
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.4}}>
            <CustomButton
              label={t('cancel')}
              onPress={handleCancelSave}
              type="danger"
            />
          </View>
          <Space size={8} direction="x" />
          <View style={{flex: 0.6}}>
            <CustomButton
              label={t('save')}
              onPress={handleSave}
              type="success"
            />
          </View>
        </View>
      )}

      {!editActive && (
        <TouchableOpacity
          onPress={() => setEditActive(true)}
          style={styles.editButton}>
          <Icon name="pencil" type="evil" color={'white'} size={32}/>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Profile;
