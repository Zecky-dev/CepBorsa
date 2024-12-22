import React from 'react'
import { View, FlatList, Text, SafeAreaView } from 'react-native'

import { useTheme } from '@context/ThemeProvider'
import getStyles from './Favorites.style'


const Favorites = () => {
    
    const { theme } = useTheme();
    const styles = getStyles(theme);

    
    return (
        <SafeAreaView>
            <Text>Favorites</Text>
        </SafeAreaView>
    )
}

export default Favorites;