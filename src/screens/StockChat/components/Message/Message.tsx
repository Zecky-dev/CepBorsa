import React from 'react';
import {Image, Text, View} from 'react-native';

import getStyles from './Message.style';
import {useTheme} from '@context/ThemeProvider';

const Message = ({message}: {message: any}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
        <Image source={{uri:message.image}} style={styles.image}/>
        <View style={styles.rightContainer}>
            <View style={styles.rightTopContainer}>
                <Text style={styles.name}>{message.name}</Text>
                <Text style={styles.date}>{message.date}</Text>
            </View>
            <Text style={styles.message}>
                {message.message}
            </Text>
        </View>
    </View>
  );
};

export default Message;
