import {TouchableOpacity, Text, Image, View} from 'react-native';
import getStyles from './StockItem.style';

import {useTheme} from '@context/ThemeProvider';
import {useNavigation} from '@react-navigation/native';

type Props = {
  item: Stock;
};

import {Stock} from '@types/StockListItemResponse';
import {Space} from '@components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'StockDetail'>;


const StockItem = ({item}: Props) => {

  const {theme} = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const styles = getStyles(theme);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('StockDetail', { stockSubLink: item.subLink, stockCode: item.code, stockName: item.name })}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Image
          source={{uri: item.image}}
          style={styles.stockLogo}
        />
        <Space direction="x" size={8} />
        <View style={styles.rightContainer}>
          <Text style={[item.code ? styles.stockCode : styles.stockCodeNotFound]}>{item.code || 'KOD BULUNAMADI'}</Text>
          <Text style={styles.stockName}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StockItem;
