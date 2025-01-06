import React, {useRef, useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MessageBubble from './components/MessageBubble';

import auth from '@react-native-firebase/auth';

// Theme & Styles
import getStyles from './Bot.style';
import {useTheme} from '../../context/ThemeProvider';

// Language
import {useTranslation} from 'react-i18next';
import {Icon, MessageInput} from '@components';
import {Message} from './types/Message';
import {askQuestion} from '@services/botServices';
import {useNavigation} from '@react-navigation/native';

import Storage from '@utils/Storage';

const Bot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const currentUser = auth().currentUser;

  // Theme & Styles
  const {theme} = useTheme();
  const styles = getStyles(theme);

  // Translation
  const {t} = useTranslation();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (messages.length > 0) {
          return (
            <TouchableOpacity
              onPress={clearMessageHistory}
              style={{marginRight: 18}}>
              <Icon name="trash" type="evil" size={32} color={'white'} />
            </TouchableOpacity>
          );
        }
      },
    });
  }, [messages]);

  // Fonksiyonu tekrar ele
  const addMessage = async (message: string) => {
    const userMessage = {
      message: message,
      sender: currentUser,
    };

    // Önce kullanıcı mesajını ekle
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      // Bot yanıtını al
      const res = await askQuestion(message);

      if ('data' in res && res.success) {
        const botMessage = {
          message: res.data,
        };

        // Bot mesajını ekle
        setMessages(prevMessages => [...prevMessages, botMessage]);
      } else {
        // Hata durumunda bot hata mesajı
        const botErrorMessage = {
          message: res.error.message,
        };

        setMessages(prevMessages => [...prevMessages, botErrorMessage]);
      }
    } catch (error) {
      const botErrorMessage = {
        message: 'Bir hata oluştu',
      };

      setMessages(prevMessages => [...prevMessages, botErrorMessage]);
    }
  };

  const clearMessageHistory = () => {
    Alert.alert(
      'Emin misiniz?',
      'Bot ile olan sohbet geçmişinizi temizlemek istediğinize emin misiniz?',
      [
        {
          text: 'Evet',
          onPress: async () => {
            if (currentUser) {
              await Storage.removeItem(`chat_messages_${currentUser.uid}`);
              setMessages([]);
            }
          },
        },
        {
          text: 'Hayır',
          onPress: () => {},
          style: 'cancel',
        },
      ],
    );
  };

  const loadMessageHistory = async () => {
    try {
      if (currentUser) {
        const savedMessages = await Storage.getItem(
          `chat_messages_${currentUser.uid}`,
        );
        if (savedMessages) {
          setMessages(JSON.parse(savedMessages));
        }
      }
    } catch (error) {}
  };

  const saveMessagesToHistory = async () => {
    try {
      if (currentUser) {
        await Storage.setItem(
          `chat_messages_${currentUser.uid}`,
          JSON.stringify(messages),
        );
      }
    } catch (error) {
      console.error('Mesajlar kaydedilirken hata oluştu:', error);
    }
  };

  // Mesajları yükle
  useEffect(() => {
    loadMessageHistory();
  }, [currentUser]);

  // Mesajlar değiştiğinde kaydet
  useEffect(() => {
    if (currentUser && messages.length > 0) {
      saveMessagesToHistory();
    }
  }, [messages, currentUser]);

  if (currentUser) {
    return (
      <SafeAreaView style={styles.container}>
        {messages.length !== 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollContainer}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({animated: true})
            }>
            {messages?.map((val, i) => (
              <MessageBubble message={val} key={i} />
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyBotMessageContainer}>
            <Text style={styles.emptyBotMessageText}>
              {t('emptyBotMessageText')}
            </Text>
          </View>
        )}
        <View style={{marginBottom: 8}}>
          <MessageInput addMessage={addMessage} />
        </View>
      </SafeAreaView>
    );
  }
};

export default Bot;
