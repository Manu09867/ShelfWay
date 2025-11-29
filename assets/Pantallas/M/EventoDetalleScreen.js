import * as React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { Text, Chip, Button, Divider, useTheme } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const EventoDetalleScreen = ({ navigation }) => {
    const theme = useTheme();
    const route = useRoute();
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
    const { evento } = route.params;

    // Función para formatear fechas
    const formatearFecha = (fechaString) => {
        if (!fechaString) return "Fecha no especificada";

        try {
            const fecha = new Date(fechaString);
            return fecha.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        } catch {
            return fechaString;
        }
    };

    // Función para obtener el ícono según el tipo de evento
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

    // Función para extraer promociones de la descripción
    const extraerPromociones = (descripcion) => {
        if (!descripcion) return [];

        const lineas = descripcion.split('\n');
        return lineas.filter(linea =>
            linea.trim().startsWith('•') ||
            linea.trim().startsWith('-') ||
            linea.trim().startsWith('*') ||
            /^\d+\./.test(linea.trim())
        );
    };

    const promociones = extraerPromociones(evento.descripcion?.es);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>

            {/* Header */}
            <View style={[
                styles.header, 
                { backgroundColor: theme.colors.surface },
                isLandscape && styles.headerLandscape
            ]}>
                <TouchableOpacity
                    style={[styles.backButton, { backgroundColor: theme.colors.primary }]}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcons name="arrow-back" size={24} color={theme.colors.onPrimary} />
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
                    {evento.titulo?.es || "Evento"}
                </Chip>
            </View>

            <ScrollView 
                style={styles.scrollView} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={isLandscape && styles.scrollContentLandscape}
            >

                {isLandscape ? (
                    // DISEÑO HORIZONTAL
                    <View style={styles.landscapeContainer}>
                        {/* Columna izquierda - Imagen */}
                        <View style={styles.landscapeImageContainer}>
                            {evento.imagenUrl ? (
                                <Image
                                    source={{ uri: evento.imagenUrl }}
                                    style={styles.landscapeImage}
                                    resizeMode="cover"
                                />
                            ) : (
                                <View style={[styles.landscapePlaceholder, { backgroundColor: theme.colors.surface }]}>
                                    <MaterialCommunityIcons
                                        name={obtenerIcono(evento.titulo?.es)}
                                        size={80}
                                        color={theme.colors.primary}
                                    />
                                    <Text style={[styles.placeholderText, { color: theme.colors.text }]}>
                                        Imagen del evento
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* Columna derecha - Contenido */}
                        <View style={styles.landscapeContent}>
                            <Text style={[styles.landscapeTitle, { color: theme.colors.primary }]}>
                                {evento.titulo?.es || "Evento sin título"}
                            </Text>
                            <Text style={[styles.landscapeSubtitle, { color: theme.colors.text }]}>
                                {formatearFecha(evento.fechaInicio)} - {formatearFecha(evento.fechaFin)}
                            </Text>

                            {/* Detalles en grid para horizontal */}
                            <View style={styles.landscapeGrid}>
                                <View style={[styles.gridItem, { backgroundColor: theme.colors.surface }]}>
                                    <MaterialCommunityIcons
                                        name="calendar-range"
                                        size={24}
                                        color={theme.colors.primary}
                                    />
                                    <Text style={[styles.gridText, { color: theme.colors.text }]}>
                                        Del {formatearFecha(evento.fechaInicio)}
                                    </Text>
                                    <Text style={[styles.gridSubtext, { color: theme.colors.text }]}>
                                        Al {formatearFecha(evento.fechaFin)}
                                    </Text>
                                </View>

                                <View style={[styles.gridItem, { backgroundColor: theme.colors.surface }]}>
                                    <MaterialCommunityIcons
                                        name={obtenerIcono(evento.titulo?.es)}
                                        size={24}
                                        color={theme.colors.primary}
                                    />
                                    <Text style={[styles.gridText, { color: theme.colors.text }]}>
                                        Tipo de Evento
                                    </Text>
                                    <Text style={[styles.gridSubtext, { color: theme.colors.text }]}>
                                        {evento.titulo?.es || "Especial"}
                                    </Text>
                                </View>
                            </View>

                            <Divider style={[styles.divider, { backgroundColor: theme.colors.outline }]} />

                            {/* Descripción */}
                            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                                Sobre el Evento
                            </Text>
                            <Text style={[styles.landscapeDescription, { color: theme.colors.text }]}>
                                {evento.descripcion?.es || "Descripción no disponible para este evento."}
                            </Text>

                            {/* Promociones en horizontal */}
                            {promociones.length > 0 && (
                                <>
                                    <Divider style={[styles.divider, { backgroundColor: theme.colors.outline }]} />
                                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                                        Promociones Destacadas
                                    </Text>
                                    <View style={styles.landscapePromotions}>
                                        {promociones.map((promo, index) => (
                                            <View key={index} style={styles.promotionBadge}>
                                                <MaterialCommunityIcons
                                                    name="star"
                                                    size={16}
                                                    color={theme.colors.primary}
                                                />
                                                <Text style={[styles.promotionText, { color: theme.colors.text }]}>
                                                    {promo.trim().replace(/^[•\-\*]\s*/, '')}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                </>
                            )}

                            {/* Términos y condiciones en horizontal */}
                            <Divider style={[styles.divider, { backgroundColor: theme.colors.outline }]} />
                            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                                Términos y Condiciones
                            </Text>
                            <View style={[styles.landscapeTerms, { backgroundColor: theme.colors.surface }]}>
                                <Text style={[styles.terms, { color: theme.colors.text }]}>
                                    • Promociones válidas durante las fechas del evento{"\n"}
                                    • No acumulable con otras promociones{"\n"}
                                    • Productos sujetos a disponibilidad{"\n"}
                                    • Precios pueden variar sin previo aviso{"\n"}
                                    • El supermercado se reserva el derecho de modificar las promociones
                                </Text>
                            </View>

                        </View>
                    </View>
                ) : (
                    // DISEÑO VERTICAL (original mejorado)
                    <>
                        {evento.imagenUrl ? (
                            <Image
                                source={{ uri: evento.imagenUrl }}
                                style={styles.mainImage}
                                resizeMode="cover"
                            />
                        ) : (
                            <View style={[styles.placeholderImage, { backgroundColor: theme.colors.surface }]}>
                                <MaterialCommunityIcons
                                    name={obtenerIcono(evento.titulo?.es)}
                                    size={60}
                                    color={theme.colors.primary}
                                />
                                <Text style={[styles.placeholderText, { color: theme.colors.text }]}>
                                    Imagen del evento
                                </Text>
                            </View>
                        )}

                        <View style={styles.content}>
                            <Text style={[styles.title, { color: theme.colors.primary }]}>
                                {evento.titulo?.es || "Evento sin título"}
                            </Text>
                            <Text style={[styles.subtitle, { color: theme.colors.text }]}>
                                {formatearFecha(evento.fechaInicio)} - {formatearFecha(evento.fechaFin)}
                            </Text>

                            {/* Detalles del evento */}
                            <View style={[styles.detailsContainer, { backgroundColor: theme.colors.surface }]}>
                                <View style={styles.detailItem}>
                                    <MaterialCommunityIcons
                                        name="calendar-range"
                                        size={20}
                                        color={theme.colors.primary}
                                    />
                                    <Text style={[styles.detailText, { color: theme.colors.text }]}>
                                        {formatearFecha(evento.fechaInicio)} - {formatearFecha(evento.fechaFin)}
                                    </Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <MaterialCommunityIcons
                                        name={obtenerIcono(evento.titulo?.es)}
                                        size={20}
                                        color={theme.colors.primary}
                                    />
                                    <Text style={[styles.detailText, { color: theme.colors.text }]}>
                                        {evento.titulo?.es || "Evento especial"}
                                    </Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <MaterialCommunityIcons
                                        name="clock-outline"
                                        size={20}
                                        color={theme.colors.primary}
                                    />
                                    <Text style={[styles.detailText, { color: theme.colors.text }]}>
                                        Horario normal de tienda
                                    </Text>
                                </View>
                            </View>

                            <Divider style={[styles.divider, { backgroundColor: theme.colors.outline }]} />

                            {/* Descripción */}
                            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                                Sobre el Evento
                            </Text>
                            <Text style={[styles.description, { color: theme.colors.text }]}>
                                {evento.descripcion?.es || "Descripción no disponible para este evento."}
                            </Text>

                            {/* Promociones si existen */}
                            {promociones.length > 0 && (
                                <>
                                    <Divider style={[styles.divider, { backgroundColor: theme.colors.outline }]} />
                                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                                        Promociones Destacadas
                                    </Text>
                                    <View style={[styles.offerList, { backgroundColor: theme.colors.surface }]}>
                                        {promociones.map((promo, index) => (
                                            <View key={index} style={styles.offerItem}>
                                                <MaterialCommunityIcons
                                                    name="check-circle"
                                                    size={16}
                                                    color={theme.colors.primary}
                                                />
                                                <Text style={[styles.offerText, { color: theme.colors.text }]}>
                                                    {promo.trim()}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                </>
                            )}

                            <Divider style={[styles.divider, { backgroundColor: theme.colors.outline }]} />

                            {/* Términos y condiciones */}
                            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                                Términos y Condiciones
                            </Text>
                            <Text style={[styles.terms, { color: theme.colors.text }]}>
                                • Promociones válidas durante las fechas del evento{"\n"}
                                • No acumulable con otras promociones{"\n"}
                                • Productos sujetos a disponibilidad{"\n"}
                                • Precios pueden variar sin previo aviso{"\n"}
                                • El supermercado se reserva el derecho de modificar las promociones
                            </Text>
                        </View>
                    </>
                )}

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        paddingTop: 60,
        elevation: 4,
    },
    headerLandscape: {
        paddingTop: 50,
        paddingHorizontal: 30,
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
        height: 55,
    },
    chipText: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    chipTextLandscape: {
        fontSize: 18,
    },
    scrollView: {
        flex: 1,
    },
    scrollContentLandscape: {
        paddingBottom: 30,
    },
    
    // ESTILOS VERTICALES
    mainImage: {
        width: '100%',
        height: 250,
    },
    placeholderImage: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        opacity: 0.8,
    },
    detailsContainer: {
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        elevation: 2,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    detailText: {
        fontSize: 14,
        marginLeft: 10,
        flex: 1,
    },
    
    // ESTILOS HORIZONTALES
    landscapeContainer: {
        flexDirection: 'row',
        minHeight: 600,
    },
    landscapeImageContainer: {
        flex: 1,
        padding: 20,
    },
    landscapeImage: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
    },
    landscapePlaceholder: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    landscapeContent: {
        flex: 1,
        padding: 20,
        paddingLeft: 0,
    },
    landscapeTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    landscapeSubtitle: {
        fontSize: 18,
        marginBottom: 25,
        opacity: 0.8,
    },
    landscapeGrid: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 25,
    },
    gridItem: {
        flex: 1,
        borderRadius: 12,
        padding: 15,
        alignItems: 'center',
        elevation: 2,
    },
    gridText: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 8,
        textAlign: 'center',
    },
    gridSubtext: {
        fontSize: 12,
        marginTop: 4,
        textAlign: 'center',
        opacity: 0.8,
    },
    landscapeDescription: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
    },
    landscapePromotions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 20,
    },
    promotionBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.05)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    promotionText: {
        fontSize: 12,
        fontWeight: '500',
        marginLeft: 6,
    },
    landscapeTerms: {
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        elevation: 2,
    },
    
    // ESTILOS COMPARTIDOS
    divider: {
        marginVertical: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
    },
    offerList: {
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        elevation: 2,
    },
    offerItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    offerText: {
        fontSize: 14,
        marginLeft: 8,
        flex: 1,
        lineHeight: 20,
    },
    terms: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 20,
    },
    actionButton: {
        borderRadius: 8,
        paddingVertical: 8,
        marginTop: 10,
    },
    placeholderText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '500',
    },
});

export default EventoDetalleScreen;