import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Text, Card, ActivityIndicator, Dialog, Portal, Button, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { useTheme } from '../../Resources/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { StatusBar } from 'expo-status-bar';

export default function ProductosPorCategoria({ route }) {
    const navigation = useNavigation();
    const { categoria } = route.params;

    const db = getFirestore();
    const { theme, isDarkTheme } = useTheme();
    const colors = theme.colors;

    const { i18n, t } = useTranslation();
    const currentLang = i18n.language || 'es';

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);

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

    useEffect(() => {
        const cargarProductos = async () => {
            setLoading(true);
            try {
                const productosRef = collection(db, "productos");

                const q = query(
                    productosRef,
                    where("tags.es", "array-contains", categoria)
                );

                const snapshot = await getDocs(q);

                const lista = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        nombre: data.nombre?.[currentLang] || data.nombre?.es || "",
                        descripcion: data.descripcion?.[currentLang] || data.descripcion?.es || "",
                        image: data.imagen?.url || null,
                        price: data.precio || 0,
                        priceOffer: data.precioOferta || 0,
                        offer: data.oferta === true,
                        stock: data.stock ?? true,
                        anaquel: data.anaquel || "",
                    };
                });


                const productosOrdenados = lista.sort((a, b) => {

                    if (a.offer && !b.offer) return -1;
                    if (!a.offer && b.offer) return 1;


                    return a.nombre.localeCompare(b.nombre);
                });

                setProductos(productosOrdenados);
            } catch (e) {
                console.error("Error:", e);
            } finally {
                setLoading(false);
            }
        };

        cargarProductos();
    }, [categoria, currentLang]);

    const hasOffer = p => p?.offer === true;

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator animating size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <StatusBar style={isDarkTheme ? 'light' : 'dark'} />


            <View style={styles.header}>
                <IconButton icon="arrow-left" size={28} onPress={() => navigation.goBack()} />
                <Text style={[styles.headerText, { color: colors.text }]}>
                    {getTranslatedCategoryName(categoria)}
                </Text>
            </View>


            <FlatList
                data={productos}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 8 }}
                renderItem={({ item }) => (
                    <Card style={[styles.card, { backgroundColor: colors.surface }]}>
                        <View style={styles.cardContent}>
                            {item.image ? (
                                <Image source={{ uri: item.image }} style={styles.image} />
                            ) : (
                                <View style={[styles.image, styles.imagePlaceholder]} />
                            )}

                            <View style={styles.infoContainer}>
                                <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
                                    {item.nombre}
                                </Text>

                                {/* Precio */}
                                <View style={styles.priceRow}>
                                    {hasOffer(item) ? (
                                        <>
                                            <Text style={styles.oldPrice}>${item.price.toFixed(2)}</Text>
                                            <Text style={styles.offerPrice}>${item.priceOffer.toFixed(2)}</Text>
                                        </>
                                    ) : (
                                        <Text style={[styles.normalPrice, { color: "#007AFF" }]}>
                                            ${item.price.toFixed(2)}
                                        </Text>
                                    )}
                                </View>

                                <Text style={{ color: item.stock ? "green" : "red", fontWeight: "bold" }}>
                                    {item.stock ? t("productsScreen.inStock") : t("productsScreen.outOfStock")}
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => setSelectedProduct(item)}
                                style={styles.infoButton}
                            >
                                <Text style={styles.infoButtonText}>+ {t('common.info', 'Info')}</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                )}
            />


            <Portal>
                <Dialog
                    visible={!!selectedProduct}
                    onDismiss={() => setSelectedProduct(null)}
                    style={[styles.dialog, { backgroundColor: colors.surface }]}
                >
                    {selectedProduct && (
                        <View>
                            <Dialog.Title style={{ color: colors.text }}>
                                {selectedProduct.nombre}
                            </Dialog.Title>
                            <Dialog.Content>
                                {selectedProduct.image && (
                                    <Image
                                        source={{ uri: selectedProduct.image }}
                                        style={styles.dialogImage}
                                    />
                                )}

                                <Text style={{ color: colors.text, marginBottom: 6 }}>
                                    {t("productsScreen.description")}: {selectedProduct.descripcion}
                                </Text>

                                <Text style={{ color: colors.text }}>
                                    {t("productsScreen.shelf")}: {selectedProduct.anaquel}
                                </Text>

                                {hasOffer(selectedProduct) ? (
                                    <Text style={{ color: "red", marginTop: 10, fontWeight: "bold" }}>
                                        {t("productsScreen.offer")}: ${selectedProduct.priceOffer.toFixed(2)}
                                        ({t("productsScreen.before")} ${selectedProduct.price.toFixed(2)})
                                    </Text>
                                ) : (
                                    <Text style={{ color: colors.text }}>
                                        {t("productsScreen.price")}: ${selectedProduct.price.toFixed(2)}
                                    </Text>
                                )}
                            </Dialog.Content>

                            <Dialog.Actions>
                                <Button onPress={() => setSelectedProduct(null)}>
                                    {t("common.close")}
                                </Button>
                            </Dialog.Actions>
                        </View>
                    )}
                </Dialog>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 10, paddingTop: 30 },
    headerText: { fontSize: 20, fontWeight: "bold", marginLeft: 10 },
    card: { borderRadius: 12, marginBottom: 10, elevation: 3 },
    cardContent: { flexDirection: "row", alignItems: "center", padding: 10 },
    image: { width: 90, height: 90, borderRadius: 10, resizeMode: "cover" },
    imagePlaceholder: { backgroundColor: "#ccc" },
    infoContainer: { flex: 1, marginLeft: 12 },
    name: { fontSize: 17, fontWeight: "bold" },
    priceRow: { flexDirection: "row", alignItems: "center", marginVertical: 3 },
    oldPrice: { textDecorationLine: "line-through", fontSize: 14, color: "#888", marginRight: 6 },
    offerPrice: { fontSize: 16, fontWeight: "bold", color: "red" },
    normalPrice: { fontSize: 16, fontWeight: "bold" },
    infoButton: { backgroundColor: "#007AFF", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 6 },
    infoButtonText: { color: "#fff", fontWeight: "bold" },
    dialog: { borderRadius: 10 },
    dialogImage: { width: "100%", height: 180, borderRadius: 8, marginBottom: 10 },
    loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});