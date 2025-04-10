import React from 'react';
import {View, Text, ImageSourcePropType, Image} from 'react-native';
import {CustomButton, Icon, Space} from '@components';

import getStyles from './CurrencyBox.style';
import {useTheme} from '@context/ThemeProvider';
import {IconType} from '@components/Icon/Icon';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {t} from 'i18next';

type Currency = {
  code: string;
  sellingPrice: number;
  buyingPrice: number;
  icon: ImageSourcePropType;
  shortName: string;
};

type CurrencyBoxProps = {
  currency: Currency;
  bgColor: string;
};


const CurrencyBox = ({currency, bgColor}: CurrencyBoxProps) => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const styles = getStyles(theme);
  
  if (currency) {
    return (
      <View style={[styles.container, {backgroundColor: bgColor}]}>
        <View style={{alignItems: 'center'}}>
          <Image source={currency.icon} style={styles.icon} />
          <Text style={styles.currencyCode}>{t(currency.code)}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {t('buyPrice')}: {currency.buyingPrice?.toFixed(3)} TL
            </Text>
            <Text style={styles.price}>
              {t('sellPrice')}: {currency.sellingPrice?.toFixed(3)} TL
            </Text>
          </View>
        </View>

        <CustomButton
          label={t('convert')}
          type="neutral"
          onPress={() => navigation.navigate('ExchangeConvert', {currency})}
        />
      </View>
    );
  }
};

export default CurrencyBox;
