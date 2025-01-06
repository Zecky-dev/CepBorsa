import React from 'react';
import {View, Image, ActivityIndicator, Text} from 'react-native';
import TypeWriterText from './components/TypeWriterText';

import {useTheme} from '@context/ThemeProvider';
import getStyles from './MessageBubble.style';
import {Message} from '@screens/Bot/types/Message';

type Props = {
  message: Message;
};

const MessageBubble = ({message: {message, sender}}: Props) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  return (
    <View
      style={[
        styles.container,
        sender ? styles.userContainer : styles.botContainer,
      ]}>
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
        ]}>
        <View
          style={[
            styles.bubble,
            sender ? styles.userBubble : styles.botBubble,
          ]}>
          {!sender && <Text style={styles.senderName}>CepBorsa BOT</Text>}

          {!sender ? (
            <TypeWriterText speed={0.5} text={message} />
          ) : (
            <Text>{message}</Text>
          )}
        </View>
      </View>
      {sender && (
        <Image
          source={
            !sender.photoURL
              ? theme === 'dark'
                ? require('@assets/images/user_dark.png')
                : require('@assets/images/user_light.png')
              : {uri: sender.photoURL}
          }
          style={styles.avatar}
        />
      )}
    </View>
  );
};

export default MessageBubble;
