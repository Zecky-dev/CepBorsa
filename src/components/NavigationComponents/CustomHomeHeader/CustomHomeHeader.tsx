import React from 'react';
import {View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {useTheme} from '@context/ThemeProvider';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import getStyles from './CustomHomeHeader.style';
import {CustomButton} from '@components';

const CustomHomeHeader = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {theme} = useTheme();
  const styles = getStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Halka Arz Listesi</Text>
      <View style={{marginRight: 8}}>
        <CustomButton
          onPress={() => navigation.navigate('Favorites')}
          label="Favorilerim"
          icon={{
            name: 'heart',
            color: 'red',
            size: 24,
            type: 'material-community',
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CustomHomeHeader;