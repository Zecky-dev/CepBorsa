import React from 'react'
import { View } from 'react-native'

type Props = {
    direction?: 'x' | 'y';
    size?: number;
}

const Space = ({direction = "y", size = 16}: Props) => {
    return <View style={direction === "x" ? { width: size } : { height: size}}/>
}

export default Space