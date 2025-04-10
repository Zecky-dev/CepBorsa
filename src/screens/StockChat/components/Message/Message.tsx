import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';

import getStyles from './Message.style';
import {useTheme} from '@context/ThemeProvider';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {formatFirebaseDate} from '@utils/helpers/helpers';
import {createThemeColors} from '@utils/themes';

const USER_DARK_ICON = require('@assets/images/user_dark.png');
const USER_LIGHT_ICON = require('@assets/images/user_light.png');

type Props = {
  message: {
    createDate: {
      seconds: number;
      nanoseconds: number;
    };
    message: string;
    owner: string;
  };
};

const Message = ({message}: Props) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const colors = createThemeColors(theme);

  const currentUser = auth().currentUser;
  const [owner, setOwner] = useState<any>();
  const isValidMessage = (message: any) => {
    return (
      message &&
      message.createDate &&
      message.createDate.seconds &&
      message.createDate.nanoseconds &&
      message.owner &&
      message.message &&
      message.message.trim() !== ''
    );
  };

  const DEFAULT_USER_ICON = theme === 'dark' ? USER_DARK_ICON : USER_LIGHT_ICON;

  // Kullanıcı detaylarını getir
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const owner = await firestore()
      .collection('users')
      .doc(message.owner)
      .get();
    setOwner(owner.data());
  };

  if (isValidMessage(message) && owner) {
    const isMessageOwner = owner.email === currentUser?.email;
    return (
      <View
        style={[
          styles.container,
          isMessageOwner && {
            backgroundColor:
              theme === 'dark' ? colors.primary : colors.boxBackground,
          },
        ]}>
        <Image
          source={owner.photo ? {uri: owner.photo} : DEFAULT_USER_ICON}
          style={styles.image}
        />
        <View style={styles.rightContainer}>
          <View style={styles.rightTopContainer}>
            <Text style={styles.name}>{owner.nameSurname}</Text>
            <Text style={styles.date}>
              {formatFirebaseDate(message.createDate)}
            </Text>
          </View>
          <Text style={styles.message}>{message.message}</Text>
        </View>
      </View>
    );
  }
};

export default Message;
