import * as React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Avatar, Button, Card, Text, Chip, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../Resources/firebaseConfig';
import { useTranslation } from 'react-i18next';

const AvisosScreen = ({ navigation }) => {
    const theme = useTheme();
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language || 'es';

    const [eventos, setEventos] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const cargarEventos = async () => {
            try {
                setLoading(true);
                const eventosRef = collection(db, "eventos");
                const q = query(eventosRef, orderBy("createdAt", "desc"));
                const snapshot = await getDocs(q);

                const eventosData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                const eventosActivos = eventosData.filter(evento => evento.activo === true);
                setEventos(eventosActivos);
            } catch (error) {
                console.error("Error cargando eventos:", error);
            } finally {
                setLoading(false);
            }
        };

        cargarEventos();
    }, []);

    
    const getTranslatedText = (textObject) => {
        if (!textObject) return '';
        return textObject[currentLang] || textObject.es || '';
    };

    const formatearFecha = (fechaString) => {
        if (!fechaString) return t('avisosScreen.unspecifiedDate', 'Fecha no especificada');

        try {
            const fecha = new Date(fechaString);
            return fecha.toLocaleDateString(currentLang === 'en' ? 'en-US' : 'es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        } catch {
            return fechaString;
        }
    };

    const obtenerIcono = (titulo) => {
        const tituloLower = titulo?.toLowerCase() || '';

        if (tituloLower.includes('santa clara') || tituloLower.includes('regalo') || tituloLower.includes('gift')) {
            return 'gift';
        } else if (tituloLower.includes('buen fin') || tituloLower.includes('sale') || tituloLower.includes('oferta')) {
            return 'sale';
        } else if (tituloLower.includes('nuevo') || tituloLower.includes('new')) {
            return 'new-box';
        } else if (tituloLower.includes('descuento') || tituloLower.includes('discount')) {
            return 'percent';
        } else {
            return 'calendar';
        }
    };

    const navegarADetalleEvento = (evento) => {
        navigation.navigate('EventoDetalle', { evento });
    };

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <View style={styles.chipContainer}>
                    <TouchableOpacity
                        style={[styles.backButton, { backgroundColor: theme.colors.primary }]}
                        onPress={() => navigation.goBack()}
                    >
                        <MaterialIcons
                            name="arrow-back"
                            size={24}
                            color={theme.colors.onPrimary}
                        />
                    </TouchableOpacity>

                    <Chip
                        mode="contained"
                        style={[styles.chip, { backgroundColor: theme.colors.primary }]}
                        textStyle={[styles.chipText, { color: theme.colors.onPrimary }]}
                    >
                        {t('avisosScreen.supermarketEvents', 'Avisos del Supermercado')}
                    </Chip>
                </View>
                <View style={styles.loadingContainer}>
                    <Text style={{ color: theme.colors.text }}>
                        {t('avisosScreen.loadingEvents', 'Cargando eventos...')}
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>

            <View style={[
                styles.chipContainer,
                isLandscape && styles.chipContainerLandscape
            ]}>

                <TouchableOpacity
                    style={[
                        styles.backButton,
                        { backgroundColor: theme.colors.primary }
                    ]}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcons
                        name="arrow-back"
                        size={24}
                        color={theme.colors.onPrimary}
                    />
                </TouchableOpacity>

                <Chip
                    mode="contained"
                    style={[
                        styles.chip,
                        { backgroundColor: theme.colors.primary },
                        isLandscape && styles.chipLandscape
                    ]}
                    textStyle={[
                        styles.chipText,
                        { color: theme.colors.onPrimary },
                        isLandscape && styles.chipTextLandscape
                    ]}
                >
                    {t('avisosScreen.supermarketEventsWithCount', 'Avisos del Supermercado')} ({eventos.length})
                </Chip>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[
                    styles.scrollContent,
                    isLandscape && styles.scrollContentLandscape
                ]}
            >

                {eventos.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={{ color: theme.colors.text, fontSize: 16, textAlign: 'center' }}>
                            {t('avisosScreen.noActiveEvents', 'No hay eventos activos en este momento')}
                        </Text>
                    </View>
                ) : (
                    eventos.map((evento) => (
                        <Card
                            key={evento.id}
                            style={[
                                styles.card,
                                { backgroundColor: theme.colors.primary },
                                isLandscape && styles.cardLandscape
                            ]}
                        >
                            <View style={isLandscape && styles.cardContentLandscape}>
                                <View style={isLandscape && styles.cardTextContainer}>
                                    <Card.Title
                                        title={getTranslatedText(evento.titulo) || t('avisosScreen.untitledEvent', 'Evento sin título')}
                                        subtitle={`${formatearFecha(evento.fechaInicio)} - ${formatearFecha(evento.fechaFin)}`}
                                        titleStyle={[
                                            { color: theme.colors.onPrimary },
                                            isLandscape && styles.titleLandscape
                                        ]}
                                        subtitleStyle={[
                                            { color: theme.colors.onPrimary },
                                            isLandscape && styles.subtitleLandscape
                                        ]}
                                        left={props => (
                                            <Avatar.Icon
                                                {...props}
                                                icon={obtenerIcono(getTranslatedText(evento.titulo))}
                                                color={theme.colors.onPrimary}
                                                style={{ backgroundColor: 'transparent' }}
                                                size={isLandscape ? 50 : 40}
                                            />
                                        )}
                                    />

                                    <Card.Content style={isLandscape && styles.cardContentText}>
                                        <Text
                                            variant="titleLarge"
                                            style={[
                                                { color: theme.colors.onPrimary },
                                                isLandscape && styles.contentTitleLandscape
                                            ]}
                                        >
                                            {getTranslatedText(evento.titulo) || t('avisosScreen.untitledEvent', 'Evento sin título')}
                                        </Text>

                                        <Text
                                            variant="bodyMedium"
                                            style={[
                                                { color: theme.colors.onPrimary },
                                                isLandscape && styles.contentTextLandscape
                                            ]}
                                        >
                                            {getTranslatedText(evento.descripcion) || t('avisosScreen.noDescription', 'Descripción no disponible')}
                                        </Text>
                                    </Card.Content>

                                    <Card.Actions style={isLandscape && styles.actionsLandscape}>
                                        <Button
                                            mode="contained"
                                            onPress={() => navegarADetalleEvento(evento)}
                                            textColor={theme.colors.primary}
                                            style={[
                                                { backgroundColor: theme.colors.onPrimary },
                                                isLandscape && styles.buttonLandscape
                                            ]}
                                        >
                                            {t('avisosScreen.viewEvent', 'Ver Evento')}
                                        </Button>
                                    </Card.Actions>
                                </View>

                                {evento.imagenUrl && (
                                    <Card.Cover
                                        source={{ uri: evento.imagenUrl }}
                                        style={isLandscape && styles.coverLandscape}
                                    />
                                )}
                            </View>
                        </Card>
                    ))
                )}

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
    },
    chipContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    chipContainerLandscape: {
        marginBottom: 30,
    },
    backButton: {
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
    },
    chipLandscape: {
        height: 60,
    },
    chipText: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        width: '100%',
    },
    chipTextLandscape: {
        fontSize: 18,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    scrollContentLandscape: {
        paddingBottom: 30,
    },
    card: {
        marginBottom: 16,
        elevation: 4,
    },
    cardLandscape: {
        marginBottom: 20,
        borderRadius: 16,
        overflow: 'hidden',
    },
    cardContentLandscape: {
        flexDirection: 'row',
        height: 280,
    },
    cardTextContainer: {
        flex: 1,
        padding: 8,
    },
    cardContentText: {
        flex: 1,
        paddingHorizontal: 0,
    },
    titleLandscape: {
        fontSize: 20,
    },
    subtitleLandscape: {
        fontSize: 16,
    },
    contentTitleLandscape: {
        fontSize: 22,
        marginBottom: 12,
    },
    contentTextLandscape: {
        fontSize: 16,
        lineHeight: 22,
    },
    coverLandscape: {
        flex: 1,
        margin: 12,
        borderRadius: 12,
        height: 'auto',
    },
    actionsLandscape: {
        paddingHorizontal: 0,
        paddingBottom: 0,
    },
    buttonLandscape: {
        paddingHorizontal: 20,
        paddingVertical: 6,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
});

export default AvisosScreen;