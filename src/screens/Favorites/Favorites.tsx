import React, { useLayoutEffect } from 'react'
import { View, FlatList, Text, SafeAreaView } from 'react-native'

import { useTheme } from '@context/ThemeProvider'
import getStyles from './Favorites.style'

import { useNavigation, useRoute } from '@react-navigation/native'
import { t } from 'i18next'

const Favorites = () => {
    
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const navigation = useNavigation();
    const route = useRoute();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: t('favorites'),
        })
    })
    
    return (
        <SafeAreaView style={styles.container}>
            <Text>Favorites</Text>
        </SafeAreaView>
    )
}

export default Favorites;