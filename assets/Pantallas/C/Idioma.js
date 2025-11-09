import * as React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import { useTheme, RadioButton, Divider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import CustomAppbar from '../../components/CustomAppbar';
import { useTheme as useAppTheme } from '../../Resources/ThemeProvider'; 

function IdiomaScreen() {
    const paperTheme = useTheme();
    // ⭐ Extraemos theme, i18n, currentLanguage, y setLanguage
    const { theme, i18n, currentLanguage, setLanguage } = useAppTheme(); 

    // Estado local para la selección del idioma, sincronizado con el estado global
    const [checkedLanguage, setCheckedLanguage] = React.useState(currentLanguage || 'ESPAÑOL');

    // Maneja el cambio de selección y actualiza el estado global
    const handleLanguageChange = (newValue) => {
        setCheckedLanguage(newValue);
        // ⭐ LÓGICA ACTIVADA: Llama a la función global para cambiar el idioma
        setLanguage(newValue); 
    };

    // ⭐ Tamaños de fuente basados en theme.baseFontSize
    const baseSize = theme.baseFontSize || 16;
    const subtitleSize = baseSize - 2;
    const labelSize = baseSize;

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: paperTheme.colors.background }]}>
            <StatusBar style="light" backgroundColor={paperTheme.colors.primary} />
            
            {/* ⭐ Usamos la cadena traducida para el título */}
            <CustomAppbar title={i18n.header_title_language} />

            <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollView}>
                <View style={styles.sectionContainer}>
                    
                    {/* ⭐ CAMBIO: Texto de descripción alineado al centro */}
                    <Text style={[styles.descriptionText, { 
                        color: paperTheme.colors.onSurfaceVariant,
                        fontSize: subtitleSize
                    }]}>
                        {i18n.language_description}
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
        textAlign: 'center', // Alineación central
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
        // La fuente se define dinámicamente
    },
});

export default IdiomaScreen;