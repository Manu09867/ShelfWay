import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Searchbar, BottomNavigation, FAB, Button } from 'react-native-paper';
import { ThemeContextProvider, useTheme } from '../../Resources/ThemeProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import TutorialDialog from './TutorialSC';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import ConfigScreen from '../M/ConfigScreen';
import OfertasScreen from '../M/OfertasSC';

function MainScreen() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [index, setIndex] = React.useState(1);
    const [showTutorial, setShowTutorial] = React.useState(false);

    const [routes] = React.useState([
        { key: 'ofertas', title: 'Ofertas', icon: 'tag-outline' },
        { key: 'mapa', title: 'Mapa', icon: 'map-marker-outline' },
        { key: 'config', title: 'Configuración', icon: 'cog-outline' },
    ]);

    const { theme } = useTheme();
    const [permission, requestPermission] = useCameraPermissions();
    const navigation = useNavigation();

    React.useEffect(() => {
        if (!permission) return;
        if (!permission.granted) requestPermission();
    }, [permission]);

    if (!permission) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>Solicitando permiso de cámara...</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>No se concedió el permiso de cámara.</Text>
            </View>
        );
    }

    // 🔹 Mantener tu escena principal original
    const renderMapa = () => (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Searchbar
                placeholder="Buscar"
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor={theme.colors.placeholder}
                inputStyle={{ color: theme.colors.text }}
                style={[styles.searchbar, { backgroundColor: theme.colors.surface }]}
                iconColor={theme.colors.primary}
                onSubmitEditing={() => {
                    if (searchQuery.trim() !== '') {
                        navigation.navigate('Products', { query: searchQuery });
                    }
                }}
            />

            <View style={styles.cameraWrapper}>
                <Text style={[styles.infoText, { color: theme.colors.text }]}>
                    Escanea un QR o código de barras
                </Text>
                <View style={styles.cameraV}>
                    <CameraView style={StyleSheet.absoluteFillObject} />
                </View>

                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('Mapa')}
                    style={{ alignSelf: 'center', marginTop: 20 }}
                >
                    Simulación de código QR
                </Button>
            </View>
        </View>
    );

    // 🔹 Control para renderizar la vista según la pestaña activa
    const renderScene = () => {
        switch (routes[index].key) {
            case 'ofertas':
                return <OfertasScreen />;
            case 'config':
                return <ConfigScreen />;
            case 'mapa':
            default:
                return renderMapa();
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Contenido principal (mantiene tu cámara y buscador) */}
            <View style={{ flex: 1 }}>
                {renderScene()}
            </View>

            {/* Botón flotante de ayuda */}
            <FAB
                icon="help-circle-outline"
                style={[styles.fab, { backgroundColor: theme.colors.primary }]}
                color={theme.colors.onPrimary}
                onPress={() => setShowTutorial(true)}
            />

            {/* Dialog del tutorial */}
            <TutorialDialog
                visible={showTutorial}
                onDismiss={() => setShowTutorial(false)}
            />

            {/* Navegación inferior */}
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={() => null} // no renderiza escenas internas
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
}

export default function App() {
    return (
        <ThemeContextProvider>
            <MainScreen />
        </ThemeContextProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        justifyContent: 'flex-start',
    },
    searchbar: {
        width: '85%',
        alignSelf: 'center',
        marginBottom: 20,
        borderRadius: 20,
    },
    infoText: {
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 20,
    },
    cameraWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40,
        marginTop: '-60%',
    },
    cameraV: {
        width: 320,
        aspectRatio: 1,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#000',
        elevation: 8,
    },
    fab: {
        position: 'absolute',
        right: 30,
        bottom: 150,
        zIndex: 10,
        elevation: 6,
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    permissionText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});
