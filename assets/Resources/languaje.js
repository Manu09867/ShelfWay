import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import es from './es.json';

const resources = { en: { translation: en }, es: { translation: es } };

// Detector simple: por defecto 'es'
const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: (callback) => {
        callback('es'); // Idioma por defecto
    },
    init: () => { },
    cacheUserLanguage: () => { },
};

i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'es',
        interpolation: { escapeValue: false },
    });

export default i18n;
