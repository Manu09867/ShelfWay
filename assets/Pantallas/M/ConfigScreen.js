import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Chip, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; 

const ConfigScreen = () => {
    const [screenDimensions, setScreenDimensions] = React.useState(Dimensions.get('window'));
    const navigation = useNavigation();
    const paperTheme = useTheme();
    const { t } = useTranslation(); 

    React.useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setScreenDimensions(window);
        });

        return () => subscription?.remove();
    }, []);

    const isLandscape = screenDimensions.width > screenDimensions.height;

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: paperTheme.colors.background },
                isLandscape && styles.containerLandscape
            ]}
        >
            {/* Chip con colores del tema y traducción */}
            <Chip
                mode="contained"
                style={[
                    styles.chip,
                    { backgroundColor: paperTheme.colors.primary },
                    isLandscape && styles.chipLandscape
                ]}
                textStyle={[
                    styles.chipText,
                    { color: paperTheme.colors.onPrimary }
                ]}
            >
                {t('tab.settings', 'Configuración')} {/* <-- Agregar traducción */}
            </Chip>

            <View style={[styles.buttonsContainer, isLandscape && styles.buttonsContainerLandscape]}>
                <Button
                    icon="bell-outline"
                    mode="contained"
                    onPress={() => navigation.navigate('Avisos')}
                    style={[styles.button, isLandscape && styles.buttonLandscape]}
                    contentStyle={styles.buttonContent}
                >
                    {t('configScreen.events', 'Avisos')} {/* <-- Agregar traducción */}
                </Button>

                <Button
                    icon="alert-circle-outline"
                    mode="contained"
                    onPress={() => navigation.navigate('Reporte')}
                    style={[styles.button, isLandscape && styles.buttonLandscape]}
                    contentStyle={styles.buttonContent}
                >
                    {t('configScreen.report', 'Reporte')} {/* <-- Agregar traducción */}
                </Button>

                <Button
                    icon="palette-outline"
                    mode="contained"
                    onPress={() => navigation.navigate('Personalizacion')}
                    style={[styles.button, isLandscape && styles.buttonLandscape]}
                    contentStyle={styles.buttonContent}
                >
                    {t('configScreen.customization', 'Personalización')} {/* <-- Agregar traducción */}
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
    },
    containerLandscape: {
        paddingTop: 30,
        paddingHorizontal: 40,
    },
    chip: {
        width: '100%',
        justifyContent: 'center',
        marginBottom: 30,
        borderRadius: 8,
        height: 50,
    },
    chipLandscape: {
        marginBottom: 20,
        height: 45,
    },
    chipText: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        width: '100%',
    },
    buttonsContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 20,
    },
    buttonsContainerLandscape: {
        justifyContent: 'center',
        marginTop: 0,
    },
    button: {
        width: '80%',
        marginVertical: 15,
        borderRadius: 8,
    },
    buttonLandscape: {
        width: '70%',
        marginVertical: 12,
    },
    buttonContent: {
        paddingVertical: 8,
    },
});

export default ConfigScreen;