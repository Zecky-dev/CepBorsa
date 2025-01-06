import React, {useEffect, useState} from 'react';
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
import {useLoading} from '@context/LoadingContext';

// Navigation
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

// Firebase
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

// Helpers
import {pickImage} from '@utils/helpers/helpers';
import {showToast} from '@utils/config/toastHelper';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;

const Profile = () => {
  // Hooks
  const {t} = useTranslation();
  const {language, changeLanguage} = useLanguage();
  const {showLoading, hideLoading} = useLoading();
  const {signOut} = useAuth();
  const {theme, setTheme} = useTheme();
  const {user} = useAuth();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  // Theme & Styles
  const styles = getStyles(theme);
  const colors = createThemeColors(theme);


  const [editActive, setEditActive] = useState(false);
  const [pickImageModalVisible, setPickImageModalVisible] = useState(false);

  // Preferences
  const [nameSurname, setNameSurname] = useState(
    user?.displayName || '',
  );
  const [themePref, setThemePref] = useState(theme);
  const [languagePref, setLanguagePref] = useState(language);
  const [image, setImage] = useState<{
    name: string;
    uri: string;
  } | null>(null);

  useEffect(() => {
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
  }, [navigation, t]);

  const handleCancelSave = () => {
    setLanguagePref(language);
    setThemePref(theme);
    setNameSurname(user?.displayName!);
    setEditActive(false);
  };

  const handleSave = async () => {
    try {
      showLoading();
      // Yerel değişimler
      changeLanguage(languagePref);
      setTheme(themePref);
      // İsim soyisim ve fotoğraf güncellemesi
      await updateNameAndSurname();
      await uploadAndUpdatePhoto();
      setEditActive(false);
      hideLoading();
      showToast({
        type: 'success',
        text1: t('success'),
        text2: t('profileUpdateSuccess'),
      });
    } catch (error) {
      console.error('PROFILE_UPDATE_ERROR', error);
      hideLoading();
      showToast({
        type: 'error',
        text1: t('error'),
        text2: t('profileUpdateError'),
      });
    }
  };

  const updateNameAndSurname = async () => {
    try {
      await firestore().collection('users').doc(user?.email!).update({
        nameSurname: nameSurname,
      });
      await user?.updateProfile({
        displayName: nameSurname,
      });
    } catch (error) {
      console.error('Name Surname update failed!', error);
    }
  };

  const uploadAndUpdatePhoto = async () => {
    try {
      const username = user?.email!.split('@')[0];
      const referenceName = `profileImages/${username}.png`;
      const reference = storage().ref(referenceName);
      if (image?.uri) {
        await reference.putFile(image.uri);
        const imageURL = await reference.getDownloadURL();
        await user?.updateProfile({
          photoURL: imageURL,
        });
        await firestore().collection('users').doc(user?.email!).update({
          photo: imageURL,
        });
      } else {
        reference.getDownloadURL().then(async () => {
          await reference.delete();
          await user?.updateProfile({
            photoURL: null,
          });
          await firestore()
            .collection('users')
            .doc(user?.email!)
            .update({
              photo: null,
            });
        });
      }
    } catch (error) {
      console.log('UPLOAD_IMAGE_FAILED', error);
    }
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


  if (user) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Fotoğraf değiştirme */}
        <TouchableOpacity
          disabled={!editActive}
          onPress={() => setPickImageModalVisible(true)}
          style={styles.changeProfilePicButton}>
          <Image
            source={
              image?.uri || user?.photoURL
                ? {
                    uri: image?.uri || user?.photoURL,
                  }
                : theme === 'dark'
                ? require('@assets/images/changeAvatar_dark.png')
                : require('@assets/images/changeAvatar_light.png')
            }
            style={[
              styles.changeAvatarIcon,
              image && {
                resizeMode: 'cover',
                borderWidth: 1,
                borderColor: colors.mutedText,
              },
            ]}
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
              <Text style={styles.rowValue}>{user?.email}</Text>
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
            <Text style={styles.preferencesSectionTitle}>
              {t('preferences')}
            </Text>
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
                handleImageSelection('camera');
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
                await handleImageSelection('library');
                setPickImageModalVisible(false);
              }}
              style={styles.pickImageModalButton}>
              <View style={styles.pickImageModalButtonContent}>
                <Icon
                  name="image"
                  type="evil"
                  size={28}
                  color={colors.primary}
                />
                <Space size={8} direction="x" />
                <Text style={styles.pickImageModalButtonText}>
                  Galeriden Seç
                </Text>
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    );
  }
};

export default Profile;
