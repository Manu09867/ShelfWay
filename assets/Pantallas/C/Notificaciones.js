import * as React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, Platform } from 'react-native';
import { useTheme, Switch, Divider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import { useTranslation } from 'react-i18next';

import CustomAppbar from '../../components/CustomAppbar';

import { useTheme as useAppTheme } from '../../Resources/ThemeProvider'; 

/* //  Lógica de Configuración de Notificaciones (Comentada)
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});
*/

function NotificacionesScreen() {
    const paperTheme = useTheme();
    const { t } = useTranslation();
    const { theme } = useAppTheme();

    // Estados de control
    const [isOffersEnabled, setIsOffersEnabled] = React.useState(false);
    const [isEventsEnabled, setIsEventsEnabled] = React.useState(false);
    const [isProductsEnabled, setIsProductsEnabled] = React.useState(false);
    const [notificationPermission, setNotificationPermission] = React.useState(true); 

    /*
    // --- LÓGICA DE PERMISOS (Comentada) ---
    const registerForPushNotificationsAsync = async () => {
        // ... (Tu código de solicitud de permisos aquí)
    };

    React.useEffect(() => {
        // registerForPushNotificationsAsync();
    }, []);
    */

    // --- Funciones para Switch ---
    const toggleOffersSwitch = () => setIsOffersEnabled(previousState => !previousState);
    const toggleEventsSwitch = () => setIsEventsEnabled(previousState => !previousState);
    const toggleProductsSwitch = () => setIsProductsEnabled(previousState => !previousState);
    const baseSize = theme.baseFontSize || 16;
    const subtitleSize = baseSize - 2;
    const labelSize = baseSize;
    const warningSize = baseSize - 3; 

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: paperTheme.colors.background }]}>
            <StatusBar style="light" backgroundColor={paperTheme.colors.primary} />
            

            <CustomAppbar title={t('notificationsScreen.title')} />

            <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollView}>
                <View style={styles.sectionContainer}>
                    

                    {!notificationPermission && (
                        <View style={[styles.warningBox, { backgroundColor: paperTheme.colors.notification }]}>
                            <Text style={[styles.warningText, { fontSize: warningSize }]}>
                                {t('notificationsScreen.warning')}
                            </Text>
                        </View>
                    )}

                    <Text style={[styles.descriptionText, { 
                        color: paperTheme.colors.onSurfaceVariant,
                        fontSize: subtitleSize
                    }]}>
                        {t('notificationsScreen.description')}
                    </Text>
                    <Divider style={styles.divider} />

                    {/* Interruptores */}
                    <View style={styles.switchContainer}>
                        <Text style={[styles.switchLabel, { 
                            color: paperTheme.colors.text,
                            fontSize: labelSize 
                        }]}>
                            {t('notificationsScreen.offers')}
                        </Text>
                        <Switch
                            value={isOffersEnabled}
                            onValueChange={toggleOffersSwitch}
                            color={paperTheme.colors.primary}
                        />
                    </View>
                    <Divider style={styles.divider} />

                    <View style={styles.switchContainer}>
                        {/* 🔹 CAMBIO: Etiqueta traducida */}
                        <Text style={[styles.switchLabel, { 
                            color: paperTheme.colors.text,
                            fontSize: labelSize 
                        }]}>
                            {t('notificationsScreen.events')}
                        </Text>
                        <Switch
                            value={isEventsEnabled}
                            onValueChange={toggleEventsSwitch}
                            color={paperTheme.colors.primary}
                        />
                    </View>
                    <Divider style={styles.divider} />

                    <View style={styles.switchContainer}>
                        <Text style={[styles.switchLabel, { 
                            color: paperTheme.colors.text,
                            fontSize: labelSize 
                        }]}>
                            {t('notificationsScreen.products')}
                        </Text>
                        <Switch
                            value={isProductsEnabled}
                            onValueChange={toggleProductsSwitch}
                            color={paperTheme.colors.primary}
                        />
                    </View>
                    <Divider style={styles.divider} />

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
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    switchLabel: {
        flex: 1, 
        marginRight: 10,
        lineHeight: 22,
    },
    warningBox: {
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    warningText: {
        color: 'white', 
        textAlign: 'center',
        fontWeight: 'bold',
    }
});

export default NotificacionesScreen;