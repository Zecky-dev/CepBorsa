import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {t} from 'i18next';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import styles from './ExchangeConvert.style';
import {useTheme} from '@context/ThemeProvider';
import getStyles from './ExchangeConvert.style';
import {CustomButton, CustomTextInput} from '@components';
import RNPickerSelect from 'react-native-picker-select';

type ExchangeConvertScreenRouteProp = RouteProp<
  RootStackParamList,
  'ExchangeConvert'
>;

const ExchangeConvert = () => {
  const navigation = useNavigation();
  const route = useRoute<ExchangeConvertScreenRouteProp>();
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [unit, setUnit] = useState<'TL' | 'USD' | 'EUR'>('TL');
  const [type, setType] = useState<'SELL' | 'BUY'>('SELL');
  const [convertDirection, setConvertDirection] = useState<
    'tryToForeign' | 'foreignToTry'
  >('foreignToTry');
  const currency = route.params.currency;

  useEffect(() => {
    navigation.setOptions({
      title: `${t('exchangeConvert')} - ${t(route.params.currency.code)}`,
    });
  }, []);

  const convertCurrency = () => {
    if (amount <= 0 || isNaN(amount)) {
      setConvertedAmount(0);
      return;
    }

    let result = 0;
    let newUnit = 'TL';

    if (convertDirection === 'tryToForeign') {
      newUnit = currency.code;
      result =
        type === 'BUY'
          ? amount / currency.buyingPrice
          : amount / currency.sellingPrice;
    } else {
      newUnit = 'TL';
      result =
        type === 'BUY'
          ? amount * currency.buyingPrice
          : amount * currency.sellingPrice;
    }

    setConvertedAmount(result);
    setUnit(newUnit);
  };

  const isMoneyCurrency = () => {
    const currencyCode = currency.code;
    const codes = ['TL', 'EUR', 'USD'];
    return codes.includes(currencyCode);
  };

  const createCurrencySymbol = () => {
    switch (unit) {
      case 'EUR':
        return '€';
      case 'USD':
        return '$';
      case 'TL':
        return '₺';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.amount}>
        {convertedAmount.toFixed(2)} {createCurrencySymbol()}
      </Text>

      <View style={styles.inputsContainer}>
        <View style={styles.pickerOuterContainer}>
          <Text style={styles.pickerLabel}>{t('convertType')}</Text>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              placeholder={{}}
              onValueChange={setType}
              style={{
                inputAndroid: styles.pickerInput,
                inputIOS: styles.pickerInput,
              }}
              items={[
                {label: t('sell'), value: 'SELL'},
                {label: t('buy'), value: 'BUY'},
              ]}
            />
          </View>
        </View>

        {isMoneyCurrency() && (
          <View style={styles.pickerOuterContainer}>
            <Text style={styles.pickerLabel}>{t('convertDirection')}</Text>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                placeholder={{}}
                onValueChange={value => {
                  setConvertDirection(value);
                }}
                style={{
                  inputAndroid: styles.pickerInput,
                  inputIOS: styles.pickerInput,
                }}
                items={[
                  {
                    label: `${t(currency.code)} - ${t('TRY')}`,
                    value: 'foreignToTry',
                  },
                  {
                    label: `${t('TRY')} - ${t(currency.code)}`,
                    value: 'tryToForeign',
                  },
                ]}
              />
            </View>
          </View>
        )}

        <CustomTextInput
          label={t('amount')}
          additionalStyles={{
            containerStyle: {borderRadius: 6},
            labelStyle: styles.pickerLabel,
            inputStyle: {textAlign: 'center', fontSize: 18},
            inputContainerStyle: styles.pickerContainer,
          }}
          onChangeText={val => setAmount(+val)}
          keyboardType="decimal-pad"
          placeholder={t('enterAmount')}
          multiline={true}
          numberOfLines={1}
        />
      </View>

      <CustomButton
        label={t('convert')}
        onPress={convertCurrency}
        type="primary"
      />
    </View>
  );
};

export default ExchangeConvert;
