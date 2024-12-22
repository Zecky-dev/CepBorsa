import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';

import {useTheme} from '@context/ThemeProvider';
import {createThemeColors} from '@utils/themes';
import { useTranslation } from 'react-i18next';

const Loading = () => {
  const {theme} = useTheme();
  const themeColors = createThemeColors(theme);
  const { t } = useTranslation();

  const colors = {
    background: theme === 'light' ? 'white' : themeColors.primary,
    indicator: theme === 'dark' ? 'white' : themeColors.primary,
    text: theme === "dark" ? 'white' : 'black'
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size={'large'} color={colors.indicator} style={styles.indicator} />
      <Text style={[styles.text, { color: colors.text }]}>{t('loading')}...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 32,
    fontWeight: '600',
    fontSize: 18,
  },
  indicator: {transform: [{scaleX: 1.4}, {scaleY: 1.4}]},
});

export default Loading;
