import React, { useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Theme & Styles
import getStyles from './Exchange.style';
import { useTheme } from '../../context/ThemeProvider';

// Language & Navigation
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import CurrencyBox from './components/CurrencyBox';
import { Loading, Space } from '@components';
import { fetchAllCurrencies } from '@services/currencyServices';
import { showToast } from '@utils/config/toastHelper';

type Currency = {
  FullName: string;
  ShortName: string;
  buying: number;
  selling: number;
  code: string;
  dayMax: number;
  dayMin: number;
  lastupdate: string;
  latest: string;
  changeRate: number;
};

const Exchange = () => {
  // Theme & Styles
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  // Translation
  const { t } = useTranslation();

  useEffect(() => {
    navigation.setOptions({
      title: t('exchange'),
    });
  }, [navigation, t]);

  const fetchCurrencyData = async (isRefreshing = false) => {
    if (!isRefreshing) setLoading(true);
    setRefreshing(isRefreshing);

    const res = await fetchAllCurrencies();
    if (res.success) {
      setCurrencies(res.data);
    } else {
      showToast({
        text1: t('error'),
        text2: t('exchangeError'),
        type: 'error',
      });
    }

    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchCurrencyData();
  }, []);

  const onRefresh = () => {
    fetchCurrencyData(true);
  };

  if (loading && !refreshing) {
    return <Loading />;
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.currencyContainer}>
          <CurrencyBox
            currency={{
              buyingPrice: currencies[0]?.buying,
              sellingPrice: currencies[0]?.selling,
              code: currencies[0]?.code,
              icon: require('./components/CurrencyBox/icons/dollar.png'),
            }}
            bgColor="#27AE60"
          />
        </View>
        <Space direction="x" size={8} />
        <View style={styles.currencyContainer}>
          <CurrencyBox
            currency={{
              buyingPrice: currencies[1]?.buying,
              sellingPrice: currencies[1]?.selling,
              code: currencies[1]?.code,
              icon: require('./components/CurrencyBox/icons/euro.png'),
            }}
            bgColor="#0A399C"
          />
        </View>
      </View>
      <Space size={12} />
      <CurrencyBox
        currency={{
          buyingPrice: currencies[2]?.buying,
          sellingPrice: currencies[2]?.selling,
          code: 'Gram Altın',
          icon: require('./components/CurrencyBox/icons/gold.png'),
        }}
        bgColor="#EFBF04"
      />
      <Space size={12} />
      <CurrencyBox
        currency={{
          buyingPrice: currencies[3]?.buying,
          sellingPrice: currencies[3]?.selling,
          code: 'Gram Gümüş',
          icon: require('./components/CurrencyBox/icons/gold.png'),
        }}
        bgColor="#BDC3C7"
      />
    </ScrollView>
  );
};

export default Exchange;
