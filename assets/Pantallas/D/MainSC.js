import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Searchbar, BottomNavigation, FAB, Button } from 'react-native-paper';
import { useTheme } from '../../Resources/ThemeProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import TutorialDialog from './TutorialSC';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import ConfigScreen from '../M/ConfigScreen';
import OfertasScreen from '../M/OfertasSC';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Resources/firebaseConfig';

function MainScreen() {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [index, setIndex] = React.useState(1);
    const [showTutorial, setShowTutorial] = React.useState(false);
    const { theme } = useTheme();
    const [permission, requestPermission] = useCameraPermissions();
    const navigation = useNavigation();
    const [lastMapUrl, setLastMapUrl] = React.useState(null);
    const [scanning, setScanning] = React.useState(false);
    const handleBarcodeScan = ({ data }) => {
        if (!data || scanning) return;
        setScanning(true);

        console.log('QR detectado:', data);

        if (data.startsWith('MAPA_')) {
            const mapId = data.split('_')[1];
            console.log('mapId:', mapId);

            fetchMapUrl(mapId);
        } else {
            navigation.navigate('Products', { barcode: data });
            setTimeout(() => setScanning(false), 1500);
        }
    };

    const fetchMapUrl = async (mapId) => {
        try {
            const docRef = doc(db, 'maps', mapId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const { url } = docSnap.data();
                setLastMapUrl(url);
                console.log('URL mapa:', url);
                navigation.navigate('Mapa', { mapUrl: url });
            } else {
                console.warn('Mapa no encontrado en Firebase');
            }
        } catch (error) {
            console.error('Error al obtener mapa:', error);
        } finally {
            setTimeout(() => setScanning(false), 1500);
        }
    };

    const [routes] = React.useState([
        { key: 'ofertas', title: t('mainScreen.bottomNav.offers'), icon: 'tag-outline' },
        { key: 'mapa', title: t('mainScreen.bottomNav.map'), icon: 'map-marker-outline' },
        { key: 'config', title: t('mainScreen.bottomNav.settings'), icon: 'cog-outline' },
    ]);

    React.useEffect(() => {
        if (!permission) return;
        if (!permission.granted) requestPermission();
    }, [permission]);

    if (!permission) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>
                    {t('mainScreen.camera.requestingPermission')}
                </Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>
                    {t('mainScreen.camera.denied')}
                </Text>
            </View>
        );
    }

    const renderMapa = () => (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Searchbar
                placeholder={t('mainScreen.searchPlaceholder')}
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
                    {t('mainScreen.scanInfo')}
                </Text>

                <View style={styles.cameraV}>
                    <CameraView
                        style={StyleSheet.absoluteFillObject}
                        onBarcodeScanned={handleBarcodeScan}
                        barcodeScannerSettings={{
                            barcodeTypes: ['qr', 'ean13', 'ean8', 'code128', 'code39', 'upc_a', 'upc_e'],
                        }}
                    />
                </View>
                {lastMapUrl && (
                    <Button
                        mode="contained"
                        onPress={() => navigation.navigate('Mapa', { mapUrl: lastMapUrl })}
                        style={{ alignSelf: 'center', marginTop: 20 }}
                    >
                        {t('mainScreen.mapB')}
                    </Button>
                )}


            </View>
        </View>
    );

    const renderScene = () => {
        switch (routes[index].key) {
            case 'ofertas':
                return <OfertasScreen navigation={navigation} />;
            case 'config':
                return <ConfigScreen />;
            case 'mapa':
            default:
                return renderMapa();
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>{renderScene()}</View>

            <FAB
                icon="help-circle-outline"
                style={[styles.fab, { backgroundColor: theme.colors.primary }]}
                color={theme.colors.onPrimary}
                onPress={() => setShowTutorial(true)}
            />

            <TutorialDialog visible={showTutorial} onDismiss={() => setShowTutorial(false)} />

            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={() => null}
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
    return <MainScreen />;
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

