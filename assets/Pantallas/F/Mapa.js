import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, BottomNavigation, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../Resources/ThemeProvider';
import CustomAppbar from '../../components/CustomAppbar';
import { useTranslation } from 'react-i18next';

const MapaScreen = ({ navigation, route }) => {
    const { theme } = useTheme();
    const [index, setIndex] = React.useState(1);
    const [loading, setLoading] = React.useState(true);
    const [loadError, setLoadError] = React.useState(false);
    const [storedMapUrl, setStoredMapUrl] = React.useState(null);
    const { t } = useTranslation(); // << TRADUCCIÓN

    React.useEffect(() => {
        if (route?.params?.mapUrl) {
            setStoredMapUrl(route.params.mapUrl);
            setLoading(true);
            setLoadError(false);
        }
    }, [route?.params?.mapUrl]);

    const mapUrl = storedMapUrl;

    const [routes] = React.useState([
        { key: 'ofertas', title: t('mainScreen.bottomNav.offers'), icon: 'tag-outline' },
        { key: 'mapa', title: t('mainScreen.bottomNav.map'), icon: 'map-marker-outline' },
        { key: 'config', title: t('mainScreen.bottomNav.settings'), icon: 'cog-outline' },
    ]);

    const handleTabPress = (routeKey) => {
        setIndex(routes.findIndex(r => r.key === routeKey));
        if (routeKey === 'ofertas') navigation.navigate('Ofertas');
        if (routeKey === 'mapa') navigation.navigate('Mapa');
        if (routeKey === 'config') navigation.navigate('Config');
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>

            {/* barra superior */}
            <CustomAppbar
                title={t('mapScreen.title')}
                showBack
            />

            {/* Contenido principal */}
            <View style={styles.imageContainer}>
                {mapUrl ? (
                    <>
                        {loading && !loadError && (
                            <ActivityIndicator size="large" color={theme.colors.primary} />
                        )}

                        {loadError && (
                            <Text style={[styles.message, { color: theme.colors.text }]}>
                                {t('mapScreen.QRerror')}
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
                                    }}
                                />
                            </TouchableOpacity>
                        )}

                        {!loading && !loadError && (
                            <Text style={[styles.message, { color: theme.colors.text }]}>
                                {t('mapScreen.QRloaded')}
                            </Text>
                        )}
                    </>
                ) : (
                    <Text style={[styles.message, { color: theme.colors.text }]}>
                        {t('mapScreen.noQR')}
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
                style={styles.bottomNav}
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
    container: { flex: 1 },
    imageContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 70 },
    mapImage: { width: 500, height: 600, borderRadius: 10 },
    message: { fontSize: 18, textAlign: 'center', marginBottom: 15, fontWeight: '500' },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    }
});

export default MapaScreen;
