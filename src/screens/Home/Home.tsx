import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';

// Theme & Styles
import getStyles from './Home.style';
import {useTheme} from '../../context/ThemeProvider';

// Navigation
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

// Language
import {useTranslation} from 'react-i18next';
import {Loading, Space} from '@components';

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const allStocksRes = await fetchAllStocks();
      setStockList(allStocksRes.data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
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
