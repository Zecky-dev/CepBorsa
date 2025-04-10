import React, { useState, useCallback } from 'react';
import { View, Image, ActivityIndicator, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // 🔹 Eklendi

import { useTheme } from '@context/ThemeProvider';
import getStyles from './MessageBubble.style';
import { Message } from '@screens/Bot/types/Message';
import { createThemeColors } from '@utils/themes';

import auth from '@react-native-firebase/auth';

type Props = {
  message: Message;
};

const MessageBubble = ({ message: { message, sender, id, loading } }: Props) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const colors = createThemeColors(theme);

  const [user, setUser] = useState(auth().currentUser); // Kullanıcıyı state olarak tut

  // Ekran her odaklandığında kullanıcı bilgilerini güncelle
  useFocusEffect(
    useCallback(() => {
      setUser(auth().currentUser);
    }, [])
  );

  return (
    <View
      style={[
        styles.container,
        sender ? styles.userContainer : styles.botContainer,
      ]}
    >
      {!sender && (
        <Image
          source={
            theme === 'dark'
              ? require('../../../../assets/images/bot_dark.png')
              : require('../../../../assets/images/bot_light.png')
          }
          style={styles.avatar}
        />
      )}
      <View
        style={[
          styles.bubbleWrapper,
          sender ? styles.userBubbleWrapper : styles.botBubbleWrapper,
        ]}
      >
        <View
          style={[
            styles.bubble,
            sender ? styles.userBubble : styles.botBubble,
          ]}
        >
          {!sender && <Text style={styles.senderName}>CepBorsa BOT</Text>}
          <Text>{loading ? <ActivityIndicator size={'small'} color={colors.primary} /> : message}</Text>
        </View>
      </View>
      {sender && (
        <Image
          source={
            !user?.photoURL
              ? theme === 'dark'
                ? require('@assets/images/user_dark.png')
                : require('@assets/images/user_light.png')
              : { uri: user.photoURL }
          }
          style={styles.avatar}
        />
      )}
    </View>
  );
};

export default MessageBubble;