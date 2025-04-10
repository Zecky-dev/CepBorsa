import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';

import {Icon} from '@components';

import getStyles from './MessageInput.style';
import {useTheme} from '@context/ThemeProvider';
import {useTranslation} from 'react-i18next';
import { createThemeColors } from '@utils/themes';

type Props = {
  addMessage: (message: string) => void;
};

const MessageInput = ({addMessage}: Props) => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const colors = createThemeColors(theme);

  const styles = getStyles(theme);

  const [message, setMessage] = useState('');

  const messageEmpty = message.trim().length === 0;

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={val => setMessage(val)}
        value={message}
        style={styles.input}
        placeholder={t('yourMessage')}
        placeholderTextColor={colors.mutedBlack}
      />
      <TouchableOpacity
        disabled={messageEmpty}
        style={styles.sendButton}
        onPress={() => {
            addMessage(message)
            setMessage('')
        }}>
        <Icon name="send-outline" type="ion" color={messageEmpty ? 'rgba(0,0,0,0.5)' : 'black'} size={18} />
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;
