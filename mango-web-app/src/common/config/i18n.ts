import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import frJSON from './locale/fr.json'
import enJSON from './locale/en.json'
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            fr: {
                translation: { ...frJSON },
            },
            en: {
                translation: { ...enJSON },
            },
        },
        fallbackLng: 'fr',
        interpolation: {
            escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
    })

export default i18next
