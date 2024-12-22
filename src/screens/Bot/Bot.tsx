import React, {useEffect, useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// Theme & Styles
import getStyles from './Bot.style';
import {useTheme} from '../../context/ThemeProvider';

// Language
import {useTranslation} from 'react-i18next';

const Bot = () => {
  // Theme & Styles

  const {theme} = useTheme();
  const styles = getStyles(theme);

  // Translation
  const {t} = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <Text>Bot</Text>
    </SafeAreaView>
  );
};

export default Bot;
