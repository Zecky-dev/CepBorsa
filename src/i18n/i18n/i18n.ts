import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Storage from '@utils/Storage'
import * as RNLocalize from 'react-native-localize'

import en from './locales/en/translation.json'
import tr from './locales/tr/translation.json'

const getDefaultLanguage = async () => {
    const savedLanguage = await Storage.getItem<string>('language');
    if(savedLanguage) return savedLanguage
    const locales = RNLocalize.getLocales();
    return locales[0]?.languageCode || 'tr';
}


i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            tr: { translation: tr },
        },
        lng: 'tr',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        }
    })

getDefaultLanguage().then((lng) => i18n.changeLanguage(lng))

export default i18n;