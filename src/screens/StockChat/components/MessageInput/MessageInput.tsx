import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native'

import { Icon } from '@components';

import getStyles from './MessageInput.style';
import { useTheme } from '@context/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { StockData } from '@types/StockResponse';


type Props = {
    stock: StockData;
    addMessage: (stockCodeOrName: string, message: string) => void;
}


const MessageInput = ({stock,addMessage} : Props) => {
    
    const { theme } = useTheme()
    const {t} = useTranslation();
    
    const styles = getStyles(theme);    

    const [message, setMessage] = useState('');
    
    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={(val) => setMessage(val)}
                value={message}
                style={styles.input}
                placeholder={t('yourMessage')}
            />
            <TouchableOpacity
                style={styles.sendButton}
                onPress={() => addMessage(stock.code || stock.name, message)}
            >
                <Icon name='send-outline' type='ion' color={'black'} size={18}/>
            </TouchableOpacity>

        </View>
    )
}

export default MessageInput;