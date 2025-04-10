import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';

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
import { createThemeColors } from '@utils/themes';
import { Text } from 'react-native';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const Home = () => {
  // Navigation & route
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Theme & Styles
  const {theme} = useTheme();
  const colors = createThemeColors(theme);
  const styles = getStyles(theme);
  

  // Translation
  const {t} = useTranslation();

  const [stockList, setStockList] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isFetchingNew, setIsFetchingNew] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  /*
    - Sayfa sonuna gelinir
    - Page değeri 1 azaltılır
    - Eğer page azaltıldıktan sonra veri gelir ise (boş değil ise), önceki verilerin üzerine ekleme yapılarak devam edilir.
    - Eğer page azaldıktan sonra veri gelmez ise sene azaltılır, page = 1 yapılır. Sonraki page'den veri gelmeyene kadar 2. adım tekrarlanır gelmediği zaman 3. adıma geri dönülür.
    - Eğer year arttırıldıktan sonra ve page = 1 yapıldıktan sonra yeni bir veri gelmezse bütün veri bitmiş demektir.
  */

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

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    fetchMore();
  }, [page, year]);

  const fetchMore = useCallback(async () => {
    setIsFetchingNew(true);
    try {
      const data = (await fetchAllStocks(year, page)).data;
      if (data.length === 0) {
        setYear(year - 1);
        setPage(1);
      } else {
        setStockList(prevStockList => [...prevStockList, ...data]);
      }
    }
    catch (error) {
      console.log('FETCH_MORE_ERROR', error);
    }
    finally {
      setIsFetchingNew(false);
    }
  }, [year, page]);

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
        removeClippedSubviews={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={() => isFetchingNew && (
          <View style={styles.flatlistLoadingFooterContainer}>
            <ActivityIndicator size={"small"} color={theme === "light" ? colors.primary : colors.white}/>
            <Text style={styles.flatlistLoadingText}>Yükleniyor..</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Home;
