import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, Chip, BottomNavigation, ActivityIndicator } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../Resources/ThemeProvider';

const MapaScreen = ({ navigation, route }) => {
    const { theme } = useTheme();
    const [index, setIndex] = React.useState(1);
    const [loading, setLoading] = React.useState(true);
    const [loadError, setLoadError] = React.useState(false);

    // Recibimos la URL pasada desde MainScreen
    const mapUrl = route?.params?.mapUrl || null;

    const [routes] = React.useState([
        { key: 'ofertas', title: 'Ofertas', icon: 'tag-outline' },
        { key: 'mapa', title: 'Mapa', icon: 'map-marker-outline' },
        { key: 'config', title: 'Configuración', icon: 'cog-outline' },
    ]);

    const handleTabPress = (routeKey) => {
        setIndex(routes.findIndex(r => r.key === routeKey));
        if (routeKey === 'ofertas') navigation.navigate('Ofertas');
        if (routeKey === 'mapa') navigation.navigate('Mapa');
        if (routeKey === 'config') navigation.navigate('Config');
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Barra superior */}
            <View style={styles.chipContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Chip mode="contained" style={styles.chip} textStyle={styles.chipText}>
                    Mapa del Supermercado
                </Chip>
            </View>

            {/* Contenido principal */}
            <View style={styles.imageContainer}>
                {mapUrl ? (
                    <>
                        {loading && !loadError && (
                            <ActivityIndicator size="large" color={theme.colors.primary} />
                        )}

                        {loadError && (
                            <Text style={[styles.message, { color: theme.colors.text, textAlign: 'center' }]}>
                                Error al cargar la imagen. Verifica el QR.
                            </Text>
                        )}

                        {!loadError && (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('AnaquelesOfertas')}
                                activeOpacity={0.8}
                            >
                                <Image
                                    key={mapUrl}
                                    source={{ uri: mapUrl }}
                                    style={styles.mapImage}
                                    resizeMode="contain"
                                    onLoad={() => setLoading(false)}
                                    onError={() => {
                                        setLoading(false);
                                        setLoadError(true);
                                        console.log('Error al cargar imagen:', mapUrl);
                                    }}
                                />
                            </TouchableOpacity>
                        )}

                        {!loading && !loadError && (
                            <Text style={[styles.message, { color: theme.colors.text }]}>
                                Mapa cargado desde QR
                            </Text>
                        )}
                    </>
                ) : (
                    <Text style={[styles.message, { color: theme.colors.text, textAlign: 'center' }]}>
                        No se detectó ningún mapa. Escanea un QR válido para visualizarlo.
                    </Text>
                )}
            </View>

            {/* Barra inferior */}
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={() => null}
                onTabPress={({ route }) => handleTabPress(route.key)}
                barStyle={{ backgroundColor: theme.colors.menuBg }}
                activeColor={theme.colors.btIcon}
                inactiveColor={theme.colors.btIconIn}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
                theme={{ colors: { secondaryContainer: theme.colors.activeT } }}
                renderIcon={({ route, focused }) => (
                    <MaterialCommunityIcons
                        name={route.icon}
                        size={24}
                        color={focused ? theme.colors.btIcon : theme.colors.btIconIn}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 60 },
    chipContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 10 },
    backButton: {
        backgroundColor: '#1a94e1',
        height: 50,
        width: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    chip: { flex: 1, justifyContent: 'center', borderRadius: 8, height: 50, backgroundColor: '#1a94e1' },
    chipText: { fontSize: 16, fontWeight: '600', color: 'white', textAlign: 'center', width: '100%' },
    imageContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 70 },
    mapImage: { width: 300, height: 400, borderRadius: 10 },
    message: { fontSize: 18, textAlign: 'center', marginBottom: 15, fontWeight: '500' },
});

export default MapaScreen;
