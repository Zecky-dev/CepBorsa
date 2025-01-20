import { useNavigation } from '@react-navigation/native'
import { t } from 'i18next';
import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

const ExchangeConvert = ({currency}) => {
    console.log(currency)
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            title: t('exchangeConvert')
        })
    }, [])
    
    
    return (
        <View>
            <Text>Exchange convert</Text>
        </View>
    )
}

export default ExchangeConvert;