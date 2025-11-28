import * as React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { BottomNavigation, Text, Button, Card, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../Resources/ThemeProvider';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Resources/firebaseConfig';
import CustomAppbar from '../../components/CustomAppbar';
import { useTranslation } from 'react-i18next';

export default function AnaquelesOfertasScreen({ navigation }) {
    const { t } = useTranslation(); // << TRADUCCIÓN
    const [index, setIndex] = React.useState(0);

    const [routes] = React.useState([
        { key: 'ofertas', title: t('mainScreen.bottomNav.offers'), icon: 'tag-outline' },
        { key: 'mapa', title: t('mainScreen.bottomNav.map'), icon: 'map-marker-outline' },
        { key: 'config', title: t('mainScreen.bottomNav.settings'), icon: 'cog-outline' },
    ]);

    const { theme } = useTheme();
    const [secciones, setSecciones] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const handleTabPress = (routeKey) => {
        setIndex(routes.findIndex(r => r.key === routeKey));
        if (routeKey === 'ofertas') navigation.navigate('Ofertas');
        if (routeKey === 'mapa') navigation.navigate('Mapa');
        if (routeKey === 'config') navigation.navigate('Config');
    };

    React.useEffect(() => {
        const fetchOffers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'productos'));

                const allProducts = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        nombre: data.nombre?.es || t('productsScreen.noProducts'),
                        antes: data.precio ? `$${data.precio}` : '$0',
                        ahora: data.precioOferta ? `$${data.precioOferta}` : '$0',
                        img: data.imagen?.url || null,
                        anaquel: data.anaquel || t('productsScreen.noShelf'),
                        oferta: data.oferta || false,
                    };
                });

                const productsWithOffers = allProducts.filter(p => p.oferta);

                const grouped = productsWithOffers.reduce((acc, prod) => {
                    const section = prod.anaquel.toUpperCase();
                    if (!acc[section]) acc[section] = [];
                    acc[section].push(prod);
                    return acc;
                }, {});

                const formattedSections = Object.keys(grouped).map(key => ({
                    titulo: key,
                    productos: grouped[key],
                }));

                setSecciones(formattedSections);
            } catch (error) {
                console.error("Error cargando ofertas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, [t]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator animating size="large" color={theme.colors.primary} />
            </View>
        );
    }

    if (secciones.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={{ color: theme.colors.text }}>{t('productsScreen.noOffers')}</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>

            <CustomAppbar title={t('offersScreen.title')} showBack />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {secciones.map((seccion, index) => (
                    <View key={index} style={styles.seccionContainer}>
                        <Text style={[styles.titulo, { color: theme.colors.text }]}>
                            {seccion.titulo}
                        </Text>

                        <View style={styles.divider} />

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {seccion.productos.map((prod) => (
                                <Card key={prod.id} style={[styles.card, { backgroundColor: theme.colors.surface }]}>
                                    {prod.img ? (
                                        <Image source={{ uri: prod.img }} style={styles.imagen} resizeMode="contain" />
                                    ) : (
                                        <View style={[styles.imagen, { backgroundColor: '#ccc' }]} />
                                    )}

                                    <Text style={[styles.precioAntes, { color: theme.colors.text }]}>
                                        {t('productsScreen.before')}: {prod.antes}
                                    </Text>

                                    <Text style={styles.precioAhora}>
                                        {t('productsScreen.priceNow')}: {prod.ahora}
                                    </Text>

                                    <Button
                                        mode="contained-tonal"
                                        compact
                                        style={styles.botonInfo}
                                        onPress={() => navigation.navigate('ProductoOF', { producto: prod })}
                                    >
                                        {t('productsScreen.moreInfo')}
                                    </Button>
                                </Card>
                            ))}
                        </ScrollView>
                    </View>
                ))}
            </ScrollView>

            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={() => null}
                onTabPress={({ route }) => handleTabPress(route.key)}
                barStyle={{ backgroundColor: theme.colors.menuBg }}
                activeColor={theme.colors.btIcon}
                inactiveColor={theme.colors.btIconIn}
                style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
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
}


const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 50,
        marginHorizontal: 20,
        marginBottom: 10,
    },
    backButton: {
        backgroundColor: '#1a94e1',
        height: 45,
        width: 45,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    chip: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 8,
        height: 45,
        backgroundColor: '#1a94e1',
    },
    chipText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    },
    scrollContainer: {
        paddingBottom: 120,
        alignItems: 'center',
    },
    seccionContainer: {
        width: '100%',
        marginBottom: 20,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        paddingTop: 5,
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        width: '90%',
        alignSelf: 'center',
        marginBottom: 10,
    },
    card: {
        width: 130,
        marginHorizontal: 10,
        alignItems: 'center',
        borderRadius: 12,
        padding: 8,
        marginBottom: 8,
        marginTop: 8,
    },
    imagen: {
        width: 100,
        height: 130,
        marginBottom: 6,
    },
    precioAntes: {
        fontSize: 14,
        textDecorationLine: 'line-through',
    },
    precioAhora: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
    },
    botonInfo: {
        marginTop: 6,
        borderRadius: 20,
        backgroundColor: '#89d0fcff'
    },

});
