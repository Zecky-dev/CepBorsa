import React from 'react';
import {View, Text, ImageSourcePropType, Image} from 'react-native';
import {CustomButton, Icon, Space} from '@components';

import getStyles from './CurrencyBox.style';
import {useTheme} from '@context/ThemeProvider';
import {IconType} from '@components/Icon/Icon';
import { useNavigation } from '@react-navigation/native';

type Currency = {
  code: string;
  sellingPrice: number;
  buyingPrice: number;
  icon: ImageSourcePropType
};

type CurrencyBoxProps = {
  currency: Currency;
  bgColor: string;
};

const CurrencyBox = ({currency, bgColor}: CurrencyBoxProps) => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const styles = getStyles(theme);

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <View style={{alignItems: 'center'}}>
        <Image source={currency.icon} style={styles.icon}/>
        <Text style={styles.currencyCode}>1 {currency.code}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>Alış: {currency.buyingPrice} TL</Text>
          <Text style={styles.price}>Satış: {currency.sellingPrice} TL</Text>
        </View>
      </View>

      <CustomButton
        label="Hesapla"
        type="neutral"
        onPress={() => navigation.navigate('ExchangeConvert', {currency})}
      />
    </View>
  );
};

export default CurrencyBox;
