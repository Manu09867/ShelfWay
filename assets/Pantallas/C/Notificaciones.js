import * as React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, Platform } from 'react-native';
import { useTheme, Switch, Divider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
// import * as Notifications from 'expo-notifications'; // ⭐ Comentado temporalmente

import CustomAppbar from '../../components/CustomAppbar';
import { useTheme as useAppTheme } from '../../Resources/ThemeProvider'; 

/* // ⭐ Lógica de Configuración de Notificaciones (Comentada)
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
    // 🔹 CAMBIO: Obtenemos theme E i18n
    const { theme, i18n } = useAppTheme();

    // Estados de control
    const [isOffersEnabled, setIsOffersEnabled] = React.useState(false);
    const [isEventsEnabled, setIsEventsEnabled] = React.useState(false);
    const [isProductsEnabled, setIsProductsEnabled] = React.useState(false);
    
    // ⭐ Simulamos que el permiso siempre está concedido (true)
    const [notificationPermission, setNotificationPermission] = React.useState(true); 

    /*
    // --- LÓGICA DE PERMISOS (Comentada) ---
    const registerForPushNotificationsAsync = async () => {
        // ... (Tu código de solicitud de permisos aquí)
        // Por ahora, lo dejamos vacío para evitar el error de importación.
    };

    React.useEffect(() => {
        // registerForPushNotificationsAsync();
    }, []);
    */

    // --- Funciones para Switch ---
    const toggleOffersSwitch = () => setIsOffersEnabled(previousState => !previousState);
    const toggleEventsSwitch = () => setIsEventsEnabled(previousState => !previousState);
    const toggleProductsSwitch = () => setIsProductsEnabled(previousState => !previousState);

    // ⭐ Tamaños de fuente basados en theme.baseFontSize
    const baseSize = theme.baseFontSize || 16;
    const subtitleSize = baseSize - 2;
    const labelSize = baseSize;
    const warningSize = baseSize - 3; 

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: paperTheme.colors.background }]}>
            <StatusBar style="light" backgroundColor={paperTheme.colors.primary} />
            
            {/* 🔹 CAMBIO: Título traducido */}
            <CustomAppbar title={i18n.header_title_notifications} />

            <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollView}>
                <View style={styles.sectionContainer}>
                    
                    {/* El mensaje de advertencia NO se mostrará ya que el permiso es true por defecto */}
                    {!notificationPermission && (
                        <View style={[styles.warningBox, { backgroundColor: paperTheme.colors.notification }]}>
                            {/* 🔹 CAMBIO: Texto de advertencia traducido */}
                            <Text style={[styles.warningText, { fontSize: warningSize }]}>
                                {i18n.notifications_warning}
                            </Text>
                        </View>
                    )}

                    {/* 🔹 CAMBIO: Descripción traducida */}
                    <Text style={[styles.descriptionText, { 
                        color: paperTheme.colors.onSurfaceVariant,
                        fontSize: subtitleSize
                    }]}>
                        {i18n.notifications_description}
                    </Text>
                    <Divider style={styles.divider} />

                    {/* Interruptores (mantienen la funcionalidad local) */}
                    <View style={styles.switchContainer}>
                        {/* 🔹 CAMBIO: Etiqueta traducida */}
                        <Text style={[styles.switchLabel, { 
                            color: paperTheme.colors.text,
                            fontSize: labelSize 
                        }]}>
                            {i18n.notifications_label_offers}
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
                            {i18n.notifications_label_events}
                        </Text>
                        <Switch
                            value={isEventsEnabled}
                            onValueChange={toggleEventsSwitch}
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
                            {i18n.notifications_label_products}
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