import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Text, SafeAreaView, Image, View, ScrollView, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';

// Theme & Styles
import getStyles from './StockDetail.style';
import {useTheme} from '../../context/ThemeProvider';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

// Navigation & Route types
type StockDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'StockDetail'
>;
type StockDetailScreenRouteProp = RouteProp<RootStackParamList, 'StockDetail'>;

import {fetchStock} from '@services/stockServices';
import {StockData} from '@types/StockResponse';
import {Icon, Loading, Space} from '@components';

import Section from './components/Section';
import SectionRow from './components/Section/components/SectionRow/SectionRow';

const StockDetail = () => {
  const [stock, setStock] = useState<StockData>();
  const [loading, setLoading] = useState(true);

  const {theme} = useTheme();
  const styles = getStyles(theme);

  // Navigation & route
  const navigation = useNavigation<StockDetailScreenNavigationProp>();
  const route = useRoute<StockDetailScreenRouteProp>();

  const fetchStockData = async () => {
    try {
      setLoading(true);
      const stockRes = await fetchStock(route.params.stockSubLink);
      setStock(stockRes.data);
    } catch (error) {
      console.error(`Error fetching ${route.params.stockName} stock: `, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.stockCode || route.params.stockName,
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <TouchableOpacity
            onPress={() => {
              if(stock) {
                navigation.navigate('StockChat', { stock })
              }
            }}
          >
            <Icon name='chatbox-ellipses-outline' color={'white'} size={24} type='ion'/>
          </TouchableOpacity>
          <Space direction='x' size={16}/>
          <TouchableOpacity
            onPress={() => console.log("Halka arz favori")}
          >
            <Icon name='hearto' color={'white'} size={24} type='antdesign'/>
          </TouchableOpacity>

        </View>
      )
    });
  }, [navigation, stock]);

  if (loading) {
    return <Loading />;
  }

  const keyTranslations: Record<string, string> = {
    ipoDate: 'İlk Halka Arz Tarihi',
    ipoPrice: 'İlk Halka Arz Fiyatı',
    distrubitionMethod: 'Dağıtım Yöntemi',
    shares: 'Pay Adedi',
    broker: 'Aracı Kurum',
    sharesActual: 'Gerçekleşen Pay Adedi',
    sharesActualPercentage: 'Gerçekleşen Pay Yüzdesi',
    bistCode: 'BIST Kodu',
    market: 'Pazar',
    firstTradingDate: 'İlk İşlem Tarihi',
    image: 'Resim',
    code: 'Kod',
    name: 'Şirket Adı',
    companyInfo: 'Şirket Hakkında',
  };

  const { image, companyInfo, ...filteredStockData } = stock as StockData;


  return (
    <View style={styles.container}>
      {stock && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.innerTopContainer}>
            <Image source={{uri: stock.image}} style={styles.logo} />
            <Space />
            <Text style={styles.name}>{stock.name}</Text>
          </View>

          <Space size={24} />

          {/* Arz Bilgileri */}
          <Section title="Arz Bilgileri">
            {/* companyInfo dışındaki key-value çiftlerini render ediyoruz */}
            {Object.entries(filteredStockData)
              .map(([key, value]) => (
                <SectionRow
                  key={key}
                  title={keyTranslations[key]}
                  value={value || 'BULUNAMADI'}
                />
              ))}
          </Section>

          {/* Şirket Hakkında */}
          <Section title="Şirket Hakkında">
            {stock.companyInfo.descriptionHTML !== '' ? (
              <View style={{height: 300}}>
                <WebView
                  source={{
                    html: `
                    <html>
                      <head>
                        <style>
                          body {
                            font-family: Arial, sans-serif;
                            font-size: 32px;
                            line-height: 1.6;
                            color: ${theme === 'dark' ? 'white' : 'black'};
                          }
                          h1, h2, h3 {
                            color: #007BFF;
                          }
                          p {
                            margin-bottom: 16px;
                          }
                        </style>
                      </head>
                      <body>
                        ${
                          stock.companyInfo.descriptionHTML
                        }                        
                          <p><strong>Kuruluş:</strong> ${
                            stock.companyInfo.foundCity
                          }, ${stock.companyInfo.foundYear}</p>
                      </body>
                    </html>
                    `,
                  }}
                  style={{width: '100%'}}
                />
              </View>
            ) : (
              <Text style={styles.descriptionNotFound}>
                Şirket hakkında bir bilgi verilmemiş!
              </Text>
            )}
          </Section>
        </ScrollView>
      )}
    </View>
  );
};

export default StockDetail;
