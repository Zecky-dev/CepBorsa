import React from 'react'
import { View, Text } from 'react-native'

import getStyles from './SectionRow.style'
import { useTheme } from '@context/ThemeProvider'

type Props = {
    title: string;
    value: string;
}

const SectionRow = ({title, value}: Props) => {
    
    const { theme } = useTheme();
    const styles = getStyles(theme);
    
    return (
        <View style={styles.rowContainer}>
            <Text style={styles.rowTitle}>{title}:</Text>
            <Text style={[value !== "BULUNAMADI" ? styles.rowValue : styles.rowValueNotFound]}>{value}</Text>
        </View>
    )
}

export default SectionRow;