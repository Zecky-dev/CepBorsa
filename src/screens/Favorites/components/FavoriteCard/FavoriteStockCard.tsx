import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import getStyles from './FavoriteStockCard.style';
import {useTheme} from '@context/ThemeProvider';

import {FavoriteStock} from '@types/FavoriteStock';
import {Icon} from '@components';
import {useNavigation} from '@react-navigation/native';

type FavoriteStockCardProps = {
  item: FavoriteStock;
  removeFavorite: (stock: FavoriteStock) => void;
};

const FavoriteStockCard = ({item, removeFavorite}: FavoriteStockCardProps) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}
        onPress={() => {
          navigation.navigate('StockDetail', {
            stockSubLink: item.sublink,
            stockCode: item.code,
            stockName: item.name,
          });
        }}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View style={{maxWidth: 200}}>
          <Text style={styles.code}>{item.code}</Text>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => removeFavorite(item)}>
        <Icon name="heart" color="red" size={32} type="antdesign" />
      </TouchableOpacity>
    </View>
  );
};

export default FavoriteStockCard;
