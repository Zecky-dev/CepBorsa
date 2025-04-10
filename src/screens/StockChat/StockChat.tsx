import React, {useEffect, useLayoutEffect, useState} from 'react';
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

import {ListEmpty, Space, MessageInput} from '@components';

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

  const [messages, setMessages] = useState<any[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${route.params.stock.code || route.params.stock.name} ${t(
        'chat',
      )}`,
    });
  }, []);

  const {theme} = useTheme();
  const styles = getStyles(theme);

  const currentUser = auth().currentUser;

  useEffect(() => {
    const fetchInitialMessages = async () => {
      try {
        const snapshot = await firestore()
          .collection('messages')
          .doc(route.params.stock.id)
          .collection('messages')
          .orderBy('createDate', 'desc')
          .get();

        // Tüm dokümanları işlemeden önce beklet
        const initialMessages = await Promise.all(
          snapshot.docs.map(async doc => doc.data()),
        );
        setMessages(initialMessages);
      } catch (error) {
        console.error('Mesajlar yüklenirken hata:', error);
      }
    };
    fetchInitialMessages();
  }, []);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('messages')
      .doc(route.params.stock.id)
      .collection('messages')
      .orderBy('createDate', 'desc')
      .onSnapshot(
        snapshot => {
          const fetchedMessages = snapshot.docs.map(doc => doc.data());
          setMessages(fetchedMessages);
        },
        error => {
          console.error('Mesajlar getirilirken hata:', error);
        },
      );
    return () => unsubscribe();
  }, [route.params.stock.id]);

  const addMessage = async (message: string) => {
    try {
      await firestore()
        .collection('messages')
        .doc(route.params.stock.id)
        .collection('messages')
        .add({
          owner: currentUser?.email,
          createDate: firestore.FieldValue.serverTimestamp(),
          message,
        });
    } catch (error) {
      console.error('ERROR_ADD_MESSAGE:', error);
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
        data={messages}
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
        removeClippedSubviews={false}
      />

      <MessageInput addMessage={addMessage} />
    </KeyboardAvoidingView>
  );
};

export default StockChat;
