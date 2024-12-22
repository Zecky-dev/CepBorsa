import React from 'react'
import { View, Text } from 'react-native'

import getStyles from './SectionRow.style'
import { useTheme } from '@context/ThemeProvider'
import { useTranslation } from 'react-i18next'

type Props = {
    title: string;
    value: string;
}

const SectionRow = ({title, value}: Props) => {
    
    const { theme } = useTheme();
    const {t} = useTranslation();
    const styles = getStyles(theme);
    
    return (
        <View style={styles.rowContainer}>
            <Text style={styles.rowTitle}>{title}:</Text>
            <Text style={[value !== t('notFound') ? styles.rowValue : styles.rowValueNotFound]}>{value}</Text>
        </View>
    )
}

export default SectionRow;