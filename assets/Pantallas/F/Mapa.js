import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, Chip, BottomNavigation } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../Resources/ThemeProvider';

const MapaScreen = ({ navigation }) => {
    const [index, setIndex] = React.useState(1);
    const [routes] = React.useState([
        { key: 'ofertas', title: 'Ofertas', icon: 'tag-outline' },
        { key: 'mapa', title: 'Mapa', icon: 'map-marker-outline' },
        { key: 'config', title: 'Configuración', icon: 'cog-outline' },
    ]);

    const { theme } = useTheme();

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
                <Chip
                    mode="contained"
                    style={styles.chip}
                    textStyle={styles.chipText}
                >
                    Mapa del Supermercado
                </Chip>
            </View>

            {/* Mensaje superior */}
            <Text style={[styles.message, { color: theme.colors.text }]}>
                Presiona el mapa para ver ofertas
            </Text>

            {/* Imagen clickeable */}
            <TouchableOpacity
                onPress={() => navigation.navigate('AnaquelesOfertas')}
                style={styles.imageContainer}
                activeOpacity={0.8}
            >
                <Image
                    source={{
                        uri: 'https://247wallst.com/wp-content/uploads/2017/01/updated-walmart-floor-plan.jpg?tpid=371411&tv=link&tc=in_content',
                    }}
                    style={styles.mapImage}
                    resizeMode="contain"
                />
            </TouchableOpacity>

            {/* Barra inferior*/}
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
    container: {
        flex: 1,
        paddingTop: 60,
    },
    chipContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 10,
    },
    backButton: {
        backgroundColor: '#1a94e1',
        height: 50,
        width: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    chip: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 8,
        height: 50,
        backgroundColor: '#1a94e1',
    },
    chipText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
        width: '100%',
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 15,
        fontWeight: '500',
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 70,
    },
    mapImage: {
        width: '95%',
        height: '95%',
        borderRadius: 10,
    },
});

export default MapaScreen;
