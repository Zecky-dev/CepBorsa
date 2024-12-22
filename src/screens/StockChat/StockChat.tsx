import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';

import getStyles from './StockChat.style';
import {useTheme} from '@context/ThemeProvider';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useRoute} from '@react-navigation/native';

import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import MessageInput from './components/MessageInput';
import {ListEmpty, Space} from '@components';

import mockMessages from './mockMessages.json';
import Message from './components/Message';

import {getKeyboardVerticalOffset} from '@utils/helpers/helpers';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

type StockChatScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'StockChat'
>;
type StockChatScreenRouteProp = RouteProp<RootStackParamList, 'StockChat'>;

const StockChat = () => {
  const navigation = useNavigation<StockChatScreenNavigationProp>();
  const route = useRoute<StockChatScreenRouteProp>();
  const {t} = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${route.params.stockCode} ${t('chat')}`,
    });
  }, []);

  const {theme} = useTheme();
  const styles = getStyles(theme);

  const currentUser = auth().currentUser;

  const addMessage = async (stockCodeOrName: string, message: string) => {
    try {
      await firestore()
        .collection('messages')
        .doc(stockCodeOrName)
        .collection('messages')
        .add({
          owner: {
            nameSurname: currentUser?.displayName,
            email: currentUser?.email,
          },
          createDate: firestore.FieldValue.serverTimestamp(),
          message,
        });
        console.log('Mesaj ekleme başarılı!')
    } catch (error) {

    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={getKeyboardVerticalOffset()}>
      <FlatList
        contentContainerStyle={styles.flatlistContentContainer}
        showsVerticalScrollIndicator={false}
        data={mockMessages}
        renderItem={({item}) => <Message message={item} />}
        ListEmptyComponent={() => (
          <ListEmpty
            image={
              theme === 'dark'
                ? require('@assets/images/chatEmpty_dark.png')
                : require('@assets/images/chatEmpty_light.png')
            }
            text={t('noMessageYet')}
          />
        )}
        ItemSeparatorComponent={() => <Space />}
      />
      <MessageInput addMessage={addMessage} stock={route.params.stock} />
    </KeyboardAvoidingView>
  );
};

export default StockChat;
