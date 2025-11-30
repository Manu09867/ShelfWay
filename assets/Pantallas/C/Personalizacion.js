import * as React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';


import { useTranslation } from 'react-i18next';

import CustomAppbar from '../../components/CustomAppbar';
import PersonalizacionButton from '../../components/PersonalizacionButton'; 
import { useNavigation } from '@react-navigation/native';
import { useTheme as useAppTheme } from '../../Resources/ThemeProvider'; 

function PersonalizacionScreen() {
    const paperTheme = useTheme(); 
    

    const { t } = useTranslation();


    const { theme } = useAppTheme(); 
    const navigation = useNavigation();

    // --- Navegación ---
    const goToPreferencias = () => navigation.navigate('Preferencias');
    const goToNotificaciones = () => navigation.navigate('Notificaciones');
    const goToIdioma = () => navigation.navigate('Idioma');

    const baseSize = theme.baseFontSize || 16; 
    const titleSize = baseSize + 2;

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: paperTheme.colors.background }]}>
            <StatusBar style="light" backgroundColor={paperTheme.colors.primary} />
            
            {/* Título de la pantalla */}
            <CustomAppbar title={t('customizationScreen.title')} />

            <View style={styles.contentContainer}> 
                <PersonalizacionButton
                    // ⭐ Usamos la nueva clave específica para el botón Preferencias
                    title={t('customizationScreen.btn_preferences')}
                    iconName="tune"
                    onPress={goToPreferencias}
                />
                <PersonalizacionButton
                    // ⭐ Usamos la nueva clave específica para el botón Notificaciones
                    title={t('customizationScreen.btn_notifications')}
                    iconName="bell-outline"
                    onPress={goToNotificaciones}
                />
                <PersonalizacionButton
                    // ⭐ Usamos la nueva clave específica para el botón Idioma
                    title={t('customizationScreen.btn_language')}
                    iconName="web"
                    onPress={goToIdioma}
                />
            </View>
        </SafeAreaView>
    );
}

// --- Estilos ---
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 80,              
    },
});

export default PersonalizacionScreen;