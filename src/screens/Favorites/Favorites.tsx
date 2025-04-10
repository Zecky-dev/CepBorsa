import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {useTheme} from '@context/ThemeProvider';
import getStyles from './Favorites.style';

import {useNavigation, useRoute} from '@react-navigation/native';
import {t} from 'i18next';

import FavoriteStockCard from './components/FavoriteCard';
import {FavoriteStock} from '@types/FavoriteStock';

import {toggleFavorite, getFavorites} from '@utils/helpers/common';
import {CustomButton, ListEmpty, Space} from '@components';

const NoFavoriteDark = require('@assets/images/noFavorite_dark.png');
const NoFavoriteLight = require('@assets/images/noFavorite_light.png');

const Favorites = () => {
  const [favorites, setFavorites] = useState<FavoriteStock[]>([]);

  const {theme} = useTheme();
  const styles = getStyles(theme);

  const navigation = useNavigation();

  const NoFavoriteIcon = theme === 'dark' ? NoFavoriteDark : NoFavoriteLight;

  const fetchFavorites = async () => {
    const favorites = (await getFavorites()) as FavoriteStock[];
    setFavorites(favorites);
  };

  const removeFavorite = async (stock: any) => {
    await toggleFavorite(stock);
    fetchFavorites();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('favorites'),
    });
  });

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favorites}
        style={{flex: 1}}
        contentContainerStyle={{flex: 1}}
        renderItem={({item}) => (
          <FavoriteStockCard item={item} removeFavorite={removeFavorite} />
        )}
        removeClippedSubviews={false}
        ItemSeparatorComponent={() => <Space size={12} />}
        ListEmptyComponent={() => (
          <ListEmpty image={NoFavoriteIcon} text={t('noFavorites')} />
        )}
      />
    </SafeAreaView>
  );
};

export default Favorites;
