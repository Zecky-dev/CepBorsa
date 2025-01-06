import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';

import getStyles from './Message.style';
import {useTheme} from '@context/ThemeProvider';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import {formatFirebaseDate} from '@utils/helpers/helpers';

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

  // Kullanıcı detaylarını getir
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const owner = await firestore()
      .collection('users')
      .doc(message.owner)
      .get();
    console.log('OWNER', owner.data());
    setOwner(owner.data());
  };

  if (isValidMessage(message) && owner) {
    return (
      <View style={[styles.container , owner.email === currentUser?.email && {backgroundColor: '#F5F5F5'}]}>
        <Image source={{uri: owner.photo}} style={styles.image} />
        <View style={styles.rightContainer}>
          <View style={styles.rightTopContainer}>
            <Text style={styles.name}>{owner.nameSurname}</Text>
            <Text style={styles.date}>{formatFirebaseDate(message.createDate)}</Text>
          </View>
          <Text style={styles.message}>{message.message}</Text>
        </View>
      </View>
    );
  }
};

export default Message;
