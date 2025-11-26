import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import i18n from '../../Resources/languaje';

export default function MainForm({ navigation }) {
    const { t } = useTranslation();
    const [language, setLanguage] = useState(i18n.language || 'es');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const selectLanguage = (lang) => {
        setLanguage(lang);
        i18n.changeLanguage(lang);
        setDropdownOpen(false);
    };
    
    return (
        <View style={styles.container}>
            {/* Selector de idioma simple */}
            <View style={styles.dropdownContainer}>
                <TouchableOpacity onPress={toggleDropdown} style={styles.languageButton}>
                    <Text style={styles.languageText}>{language === 'es' ? 'Español' : 'English'}</Text>
                </TouchableOpacity>
                {dropdownOpen && (
                    <View style={styles.dropdownList}>
                        <TouchableOpacity onPress={() => selectLanguage('es')} style={styles.dropdownItem}>
                            <Text style={{color:'#fff'}}>Español</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => selectLanguage('en')} style={styles.dropdownItem}>
                            <Text style={{color:'#fff'}} >English</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* Contenido original intacto */}
            <Text style={styles.text}>{t('appName')}</Text>
            <Image source={require('../../Splash.png')} style={styles.image} resizeMode="contain" />
            <Text style={styles.text2}>{t('welcomeText')}</Text>

            <Button
                mode='contained'
                style={styles.button}
                labelStyle={{ fontSize: 18 }}
                onPress={() => navigation.navigate('LoginSC')}
            >
                {t('login')}
            </Button>
            <Button
                mode='contained'
                style={styles.button}
                labelStyle={{ fontSize: 18 }}
                onPress={() => navigation.navigate('RegisterSC')}
            >
                {t('registerB')}
            </Button>
            <Button
                mode='contained'
                style={styles.button}
                labelStyle={{ fontSize: 18 }}
                onPress={() => navigation.navigate('Main')}
            >
                {t('skipLogin')}
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    dropdownContainer: {
        position: 'absolute',
        top: 50,
        right: 20,
    },
    languageButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#1976d2ff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    languageText: {
        fontSize: 16,
        color: '#ffffffff',
    },
    dropdownList: {
        marginTop: 5,
        backgroundColor: '#1976d2ff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        overflow: 'hidden',
    },
    dropdownItem: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        color: '#fff'
    },
    image: {
        width: 230,
        height: 230,
        marginBottom: 20,
    },
    text: {
        fontSize: 65,
        color: '#000',
        marginBottom: 10,
    },
    text2: {
        fontSize: 18.5,
        color: '#000',
        textAlign: 'center',
        marginBottom: 25,
    },
    button: {
        width: 300,
        height: 43,
        marginBottom: 20,
    },
});
