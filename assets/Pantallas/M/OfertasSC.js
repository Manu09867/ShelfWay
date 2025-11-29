import * as React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Chip, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useTranslation } from 'react-i18next';

const OfertasScreen = ({ navigation }) => {
    const paperTheme = useTheme();
    const { i18n, t } = useTranslation();
    const currentLang = i18n.language || 'es';
    const db = getFirestore();

    const [anaqueles, setAnaqueles] = React.useState([
        { id: 1, nombre: 'Lácteos', tag: 'lacteos', icon: 'cow', notificaciones: 0 },
        { id: 2, nombre: 'Carnes', tag: 'carnes', icon: 'food-steak', notificaciones: 0 },
        { id: 3, nombre: 'Frutas', tag: 'frutas', icon: 'fruit-cherries', notificaciones: 0 },
        { id: 4, nombre: 'Verduras', tag: 'verduras', icon: 'carrot', notificaciones: 0 },
        { id: 5, nombre: 'Bebidas', tag: 'bebidas', icon: 'bottle-soda', notificaciones: 0 },
        { id: 6, nombre: 'Limpieza', tag: 'limpieza', icon: 'spray', notificaciones: 0 },
    ]);

    React.useEffect(() => {
        const cargarOfertas = async () => {
            try {
                const productosRef = collection(db, "productos");
                const snapshot = await getDocs(productosRef);

                const productos = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        ...data,
                        // Usar la traducción del nombre si está disponible
                        nombreTraducido: data.nombre?.[currentLang] || data.nombre?.es || ''
                    };
                });

                const nuevaLista = anaqueles.map(a => {
                    // Función para quitar acentos
                    const normalizar = (str) =>
                        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

                    const cantidad = productos.filter(p => {
                        if (!p.oferta || !p.tags?.es) return false;

                        // Normalizamos todo
                        const tagsNorm = p.tags.es.map(t => normalizar(t));
                        const tagAnaquel = normalizar(a.tag);

                        return tagsNorm.includes(tagAnaquel);
                    }).length;

                    return { ...a, notificaciones: cantidad };
                });

                setAnaqueles(nuevaLista);

            } catch (error) {
                console.log("Error cargando ofertas:", error);
            }
        };

        cargarOfertas();
    }, [currentLang]); // Agregar currentLang como dependencia

    // Función para obtener el nombre traducido de la categoría
    const getTranslatedCategoryName = (categoryName) => {
        const translations = {
            'Lácteos': t('categories.dairy', 'Lácteos'),
            'Carnes': t('categories.meat', 'Carnes'),
            'Frutas': t('categories.fruits', 'Frutas'),
            'Verduras': t('categories.vegetables', 'Verduras'),
            'Bebidas': t('categories.drinks', 'Bebidas'),
            'Limpieza': t('categories.cleaning', 'Limpieza')
        };
        return translations[categoryName] || categoryName;
    };

    return (
        <View style={[styles.container, { backgroundColor: paperTheme.colors.background }]}>
            <Chip
                mode="contained"
                style={[styles.chip, { backgroundColor: paperTheme.colors.primary }]}
                textStyle={[styles.chipText, { color: paperTheme.colors.onPrimary }]}
            >
                {t('offersScreen.shelvesWithOffers', 'Anaqueles con Ofertas')}
            </Chip>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <View style={styles.gridContainer}>
                    {anaqueles.map((anaquel) => (
                        <TouchableOpacity
                            key={anaquel.id}
                            style={[styles.anaquelButton, { backgroundColor: paperTheme.colors.primary }]}
                            onPress={() =>
                                navigation.navigate("ProductosPorCategoria", {
                                    categoria: anaquel.nombre
                                })
                            }
                        >
                            <MaterialCommunityIcons
                                name={anaquel.icon}
                                size={40}
                                color={paperTheme.colors.onPrimary}
                                style={styles.anaquelIcon}
                            />

                            <Text style={[styles.anaquelText, { color: paperTheme.colors.onPrimary }]}>
                                {getTranslatedCategoryName(anaquel.nombre)}
                            </Text>

                            {/* 🔴 BADGE DE NOTIFICACIONES */}
                            {anaquel.notificaciones > 0 && (
                                <View
                                    style={[
                                        styles.notificationBadge,
                                        { backgroundColor: paperTheme.colors.error }
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.notificationText,
                                            { color: paperTheme.colors.onError }
                                        ]}
                                    >
                                        {anaquel.notificaciones}
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 60 },
    chip: {
        width: '100%',
        justifyContent: 'center',
        marginBottom: 80,
        borderRadius: 8,
        height: 50,
    },
    chipText: { fontSize: 16, fontWeight: '600', textAlign: 'center', width: '100%' },
    scrollView: { flex: 1 },
    scrollContent: { paddingBottom: 20 },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    anaquelButton: {
        width: '48%',
        aspectRatio: 1,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        position: 'relative',
    },
    anaquelIcon: { marginBottom: 10 },
    anaquelText: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
    notificationBadge: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
    },
    notificationText: { fontSize: 12, fontWeight: 'bold' },
});

export default OfertasScreen;