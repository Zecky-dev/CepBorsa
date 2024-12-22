import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, Pressable, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// Theme & Styles
import getStyles from './Home.style';
import {useTheme} from '../../context/ThemeProvider';

// Navigation
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

// Language
import {useTranslation} from 'react-i18next';
import {CustomButton, Loading, Space} from '@components';

// Services
import {fetchAllStocks} from '@services/stockServices';

import StockItem from './components/StockItem';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const Home = () => {
  // Navigation & route
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Theme & Styles

  const {theme} = useTheme();
  const styles = getStyles(theme);

  // Translation
  const {t} = useTranslation();

  const [stockList, setStockList] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{marginRight: 0}}>
          <CustomButton
            activeOpacity={0.8}
            label="Favorilerim"
            icon={{
              name: 'heart',
              type: 'antdesign',
              color: '#F44336',
              size: 16,
            }}
            onPress={() => navigation.navigate('Favorites')}
          />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true)
      const allStocksRes = await fetchAllStocks();
      setStockList(allStocksRes.data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    } finally {
      setLoading(false)
    }
  };

  if(loading) {
    return <Loading/>
  }

  return (
    <View style={styles.container}>
      <FlatList
        refreshing={refreshing}
        onRefresh={fetchData}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
        data={stockList}
        renderItem={({item}) => <StockItem item={item.data} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default Home;
