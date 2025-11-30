import * as React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import { useTheme, RadioButton, Divider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import { useTranslation } from 'react-i18next';

import CustomAppbar from '../../components/CustomAppbar';

import { useTheme as useAppTheme } from '../../Resources/ThemeProvider'; 

function IdiomaScreen() {
    const paperTheme = useTheme();
    const { t, i18n } = useTranslation();
    const { theme } = useAppTheme(); 


    const getCurrentVisualLanguage = () => {
        if (!i18n.language) return 'ESPAÑOL'; 
        return i18n.language.startsWith('en') ? 'ENGLISH' : 'ESPAÑOL';
    };

    // Estado local para la selección visual del RadioButton
    const [checkedLanguage, setCheckedLanguage] = React.useState(getCurrentVisualLanguage());

    // Sincronizamos el estado local por si el idioma cambia desde otro lugar
    React.useEffect(() => {
        setCheckedLanguage(getCurrentVisualLanguage());
    }, [i18n.language]);

    // Maneja el cambio de selección del usuario
    const handleLanguageChange = (newValue) => {
        setCheckedLanguage(newValue);
        

        const langCode = newValue === 'ENGLISH' ? 'en' : 'es';

        i18n.changeLanguage(langCode); 
    };

    const baseSize = theme.baseFontSize || 16;
    const subtitleSize = baseSize - 2;
    const labelSize = baseSize;

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: paperTheme.colors.background }]}>
            <StatusBar style="light" backgroundColor={paperTheme.colors.primary} />

            <CustomAppbar title={t('languageScreen.header_title_language')} />

            <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollView}>
                <View style={styles.sectionContainer}>

                    <Text style={[styles.descriptionText, { 
                        color: paperTheme.colors.onSurfaceVariant,
                        fontSize: subtitleSize
                    }]}>

                        {t('languageScreen.language_description')}
                    </Text>
                    <Divider style={styles.divider} />

                    <RadioButton.Group onValueChange={handleLanguageChange} value={checkedLanguage}>
                        
                        {/* Opción ESPAÑOL */}
                        <View style={styles.radioButtonContainer}>
                            <Text style={[styles.radioButtonLabel, { 
                                color: paperTheme.colors.text,
                                fontSize: labelSize 
                            }]}>ESPAÑOL</Text>
                            <RadioButton value="ESPAÑOL" color={paperTheme.colors.primary} />
                        </View>
                        <Divider style={styles.divider} />

                        {/* Opción ENGLISH */}
                        <View style={styles.radioButtonContainer}>
                            <Text style={[styles.radioButtonLabel, { 
                                color: paperTheme.colors.text,
                                fontSize: labelSize 
                            }]}>ENGLISH</Text>
                            <RadioButton value="ENGLISH" color={paperTheme.colors.primary} />
                        </View>
                        <Divider style={styles.divider} />

                    </RadioButton.Group>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    sectionContainer: {
        marginBottom: 30,
    },
    descriptionText: {
        marginBottom: 15,
        textAlign: 'center', 
    },
    divider: {
        marginVertical: 10,
        backgroundColor: '#ccc',
        height: 1,
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    radioButtonLabel: {
       
    },
});

export default IdiomaScreen;