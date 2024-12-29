import React, {useLayoutEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  SafeAreaView,
} from 'react-native';
import {CustomButton, Icon, Space} from '@components';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Modal from 'react-native-modal';

// Theme & Styles
import getStyles from './Profile.style';
import {useTheme} from '../../context/ThemeProvider';
import {createThemeColors} from '@utils/themes';

// Language
import {useTranslation} from 'react-i18next';
import {useAuth} from '@context/AuthProvider';
import {useLanguage} from '@context/LanguageProvider';

// Navigation
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import {pickImage} from '@utils/helpers/helpers';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;

const Profile = () => {
  // Hooks
  const {t} = useTranslation();
  const {language, changeLanguage} = useLanguage();
  const {signOut} = useAuth();
  const {theme, setTheme} = useTheme();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  // Theme & Styles
  const styles = getStyles(theme);
  const colors = createThemeColors(theme);

  const currentUser = auth().currentUser;

  // Edit mode
  const [editActive, setEditActive] = useState(false);
  const [pickImageModalVisible, setPickImageModalVisible] = useState(false);

  // Preferences
  const [nameSurname, setNameSurname] = useState(currentUser?.displayName);
  const [themePref, setThemePref] = useState(theme);
  const [languagePref, setLanguagePref] = useState(language);
  const [image, setImage] = useState<{
    name: string;
    uri: string;
  } | null>(null);

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
      title: t('profile'),
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
  };

  const handleImageSelection = async (type: 'camera' | 'library') => {
    try {
      const image = await pickImage(type);
      if (image) {
        setImage(image);
      }
    } catch (error) {
      console.error('Image selection failed:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fotoğraf değiştirme */}
      <TouchableOpacity
        disabled={!editActive}
        onPress={() => setPickImageModalVisible(true)}
        style={styles.changeProfilePicButton}>
        <Image
          source={
            image?.uri
              ? {
                  uri: image.uri,
                }
              : theme === 'dark'
              ? require('@assets/images/changeAvatar_dark.png')
              : require('@assets/images/changeAvatar_light.png')
          }
          style={[styles.changeAvatarIcon, image && {
            resizeMode: 'cover',
            borderWidth: 1,
            borderColor: colors.mutedText,
          }]}
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
              onPress={() => navigation.navigate('ChangePassword')}
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
            <Text style={[styles.rowTitle, {flex: 1, color: colors.black}]}>
              {t('language')}
            </Text>
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
            <Text style={[styles.rowTitle, {color: colors.black}]}>
              {t('theme')}
            </Text>
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
          <Icon name="pencil" type="evil" color={'white'} size={32} />
        </TouchableOpacity>
      )}

      <Modal
        style={[
          styles.pickImageModalContainer,
          Platform.OS === 'android'
            ? {
                marginTop: 0,
                marginHorizontal: 0,
              }
            : {
                margin: 0,
              },
        ]}
        isVisible={pickImageModalVisible}
        useNativeDriver={true}
        onBackButtonPress={() => setPickImageModalVisible(false)}
        onBackdropPress={() => setPickImageModalVisible(false)}>
        <SafeAreaView style={styles.pickImageModalContentContainer}>
          <TouchableOpacity
            onPress={() => {
              setPickImageModalVisible(false);
              handleImageSelection('camera')
            }}
            style={styles.pickImageModalButton}>
            <View style={styles.pickImageModalButtonContent}>
              <Icon
                name="camera"
                type="evil"
                size={28}
                color={colors.primary}
              />
              <Space size={8} direction="x" />
              <Text style={styles.pickImageModalButtonText}>
                Kamera ile çek
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await handleImageSelection('library')
              setPickImageModalVisible(false);
            }}
            style={styles.pickImageModalButton}>
            <View style={styles.pickImageModalButtonContent}>
              <Icon name="image" type="evil" size={28} color={colors.primary} />
              <Space size={8} direction="x" />
              <Text style={styles.pickImageModalButtonText}>Galeriden Seç</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;
