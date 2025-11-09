import * as React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { BottomNavigation, Text, Button, Card, Chip } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContextProvider, useTheme } from '../../Resources/ThemeProvider';

function AnaquelesOfertasScreen({ navigation }) {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'ofertas', title: 'Ofertas', icon: 'tag-outline' },
        { key: 'mapa', title: 'Mapa', icon: 'map-marker-outline' },
        { key: 'config', title: 'Configuración', icon: 'cog-outline' },
    ]);

    const { theme } = useTheme();

    const secciones = [
        {
            titulo: 'LECHES',
            productos: [
                { id: 1, nombre: 'Leche 1', antes: '$40', ahora: '$35', img: 'https://alsuper.online/products/404055_p.webp' },
                { id: 2, nombre: 'Leche 2', antes: '$35', ahora: '$30', img: 'https://www.lala.com.mx/storage/app/media/7501020565935_00.png' },
                { id: 3, nombre: 'Leche 3', antes: '$25', ahora: '$20', img: 'https://www.lala.com.mx/storage/app/media/Prodcutos/750102054066600-1-min.png' },
            ],
        },
        {
            titulo: 'HARINAS',
            productos: [
                { id: 4, nombre: 'Harina 1', antes: '$40', ahora: '$35', img: 'https://superlavioleta.com/cdn/shop/files/Harina_trigo_selecta_1kg.png?v=1698849403' },
                { id: 5, nombre: 'Harina 2', antes: '$40', ahora: '$35', img: 'https://foodservicemx.com/wp-content/uploads/2024/09/maseca-1kg.png' },
                { id: 6, nombre: 'Harina 3', antes: '$45', ahora: '$38', img: 'https://hebmx.vtexassets.com/arquivos/ids/751061/86515_image.png?v=638498080870830000' },
            ],
        },
    ];

    const handleTabPress = (routeKey) => {
        setIndex(routes.findIndex(r => r.key === routeKey));
        if (routeKey === 'ofertas') navigation.navigate('Ofertas');
        if (routeKey === 'mapa') navigation.navigate('Mapa');
        if (routeKey === 'config') navigation.navigate('Config');
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            {/* Barra superior */}
            <View style={styles.topBar}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Chip
                    mode="contained"
                    style={styles.chip}
                    textStyle={styles.chipText}
                >
                    OFERTAS POR SECCIÓN
                </Chip>
            </View>

            {/* Contenido scrolleable */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {secciones.map((seccion, index) => (
                    <View key={index} style={styles.seccionContainer}>
                        <Text style={[styles.titulo, { color: theme.colors.text }]}>{seccion.titulo}</Text>
                        <View style={styles.divider} />
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {seccion.productos.map((prod) => (
                                <Card key={prod.id} style={[styles.card, { backgroundColor: theme.colors.surface }]}>
                                    <Image source={{ uri: prod.img }} style={styles.imagen} resizeMode="contain" />
                                    <Text style={[styles.precioAntes, { color: theme.colors.text }]}>Antes: {prod.antes}</Text>
                                    <Text style={styles.precioAhora}>AHORA: {prod.ahora}</Text>
                                    <Button mode="contained-tonal" compact style={styles.botonInfo} onPress={() => navigation.navigate('ProductoOF', { producto: prod })}>
                                        + info
                                    </Button>
                                </Card>
                            ))}
                        </ScrollView>
                    </View>
                ))}
            </ScrollView>

            {/* Barra de navegación inferior */}
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
}

export default AnaquelesOfertasScreen;

const styles = StyleSheet.create({
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
