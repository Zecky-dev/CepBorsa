import React from 'react'
import { View, Text, Image, ImageSourcePropType } from 'react-native'

import getStyles from './ListEmpty.style'
import { useTheme } from '@context/ThemeProvider'

type Props = {
    image: ImageSourcePropType;
    text: string;
}

const ListEmpty = ({image,text}: Props) => {
    
    const { theme } = useTheme();
    const styles = getStyles(theme);
    
    return (
        <View style={styles.container}>
            <Image source={image} style={styles.image}/>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

export default ListEmpty;