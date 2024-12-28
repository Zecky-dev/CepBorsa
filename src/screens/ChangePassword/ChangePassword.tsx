import React, {useLayoutEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';

const ChangePassword = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('changePassword'),
    });
  });


  return (
    <View style={{flex: 1, backgroundColor: '#F5F7F9'}}>
      
    </View>
  );
};

export default ChangePassword;
