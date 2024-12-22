import React from 'react';
import {View, Text} from 'react-native';

import getStyles from './Section.style';
import {useTheme} from '@context/ThemeProvider';

type Props = {
  title: string;
  children: React.ReactNode;
};

const Section = ({title, children}: Props) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.contenContainer}>{children}</View>
    </View>
  );
};

export default Section;
