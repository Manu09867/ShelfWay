import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Text, Card, ActivityIndicator, Dialog, Portal, Button, IconButton } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Resources/firebaseConfig';
import { useTheme } from '../../Resources/ThemeProvider';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';

export default function ProductsScreen({ route }) {
    const { theme, isDarkTheme } = useTheme();
    const { query: searchQuery, barcode } = route.params || {};
    const { i18n, t } = useTranslation();
    const currentLang = i18n.language || 'es';
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const colors = theme.colors;
    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            ScreenOrientation.unlockAsync();
            return () => {
                ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
            };
        }, [])
    );

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);

            try {
                const snapshot = await getDocs(collection(db, "productos"));

                const normalize = val => {
                    if (typeof val === "string") return val.toLowerCase();
                    if (Array.isArray(val)) return val.join(" ").toLowerCase();
                    return "";
                };

                const allProducts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        codigoBarras: data.codigoBarras || "",
                        nombre: data.nombre?.[currentLang] || data.nombre?.es || "",
                        descripcion: data.descripcion?.[currentLang] || data.descripcion?.es || "",
                        tags: data.tags?.[currentLang] || data.tags?.es || [],
                        price: data.precio || 0,
                        priceOffer: data.precioOferta || 0,
                        image: data.imagen?.url || null,
                        anaquel: data.anaquel || "",
                        oferta: data.oferta || false,
                        stock: data.stock ?? true,
                    };
                });

                if (barcode) {
                    const product = allProducts.find(p => p.codigoBarras === barcode);
                    if (product) {
                        setProducts([product]);
                        setSelectedProduct(product);
                    } else {
                        setProducts([]);
                    }
                    return;
                }

                const queryLower = (searchQuery || "").toLowerCase();
                const filtered = allProducts.filter(
                    p =>
                        normalize(p.nombre).includes(queryLower) ||
                        normalize(p.descripcion).includes(queryLower) ||
                        normalize(p.tags).includes(queryLower)
                );

                setProducts(filtered);
            } catch (error) {
                console.error("Error fetching products: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchQuery, currentLang, barcode]);

    const hasOffer = product =>
        typeof product?.priceOffer === "number" && product.priceOffer > 0;

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <StatusBar style={isDarkTheme ? 'light' : 'dark'} backgroundColor={theme.colors.background} />

            <View style={styles.header}>
                <IconButton icon="arrow-left" size={28} onPress={() => navigation.goBack()} />
            </View>

            {loading && (
                <View style={styles.centerContainer}>
                    <ActivityIndicator animating size="large" color={colors.primary} />
                </View>
            )}

            {!loading && products.length === 0 && (
                <View style={styles.centerContainer}>
                    <Text style={{ color: colors.text, fontSize: 18 }}>
                        {t('productsScreen.noProducts')}
                    </Text>
                </View>
            )}

            {!loading && products.length > 0 && (
                <FlatList
                    data={products}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ padding: 5 }}
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

                                    <View style={styles.priceRow}>
                                        {hasOffer(item) ? (
                                            <>
                                                <Text style={styles.oldPrice}>${item.price.toFixed(2)}</Text>
                                                <Text style={styles.offerPrice}>${item.priceOffer.toFixed(2)}</Text>
                                            </>
                                        ) : (
                                            <Text style={[styles.normalPrice, { color: '#007AFF' }]}>
                                                ${item.price.toFixed(2)}
                                            </Text>
                                        )}
                                    </View>

                                    <Text
                                        style={[
                                            styles.stockText,
                                            { color: item.stock ? "green" : "red" }
                                        ]}
                                    >
                                        {item.stock ? t("productsScreen.inStock") : t("productsScreen.outOfStock")}
                                    </Text>
                                </View>

                                <TouchableOpacity onPress={() => setSelectedProduct(item)} style={styles.infoButton}>
                                    <Text style={styles.infoButtonText}>+ Info</Text>
                                </TouchableOpacity>
                            </View>
                        </Card>
                    )}
                />
            )}

            <Portal>
                <Dialog
                    visible={!!selectedProduct}
                    onDismiss={() => setSelectedProduct(null)}
                    style={[styles.dialog, { backgroundColor: colors.surface }]}
                >
                    {selectedProduct && (
                        <View>
                            <Dialog.Title style={{ color: colors.text, fontWeight: 'bold' }}>
                                {selectedProduct.nombre}
                            </Dialog.Title>

                            <Dialog.Content>
                                {selectedProduct.image && (
                                    <Image source={{ uri: selectedProduct.image }} style={styles.dialogImage} />
                                )}

                                <Text style={[styles.dialogText, { color: colors.text }]}>
                                    {t('productsScreen.description')}: {selectedProduct.descripcion || t('productsScreen.noDescription')}
                                </Text>

                                <Text style={[styles.dialogText, { color: colors.text }]}>
                                    {t('productsScreen.shelf')}: {selectedProduct.anaquel || t('productsScreen.noShelf')}
                                </Text>

                                {hasOffer(selectedProduct) ? (
                                    <Text style={[styles.dialogOffer, { color: 'red' }]}>
                                        {t('productsScreen.offer')}: ${selectedProduct.priceOffer.toFixed(2)}
                                        ({t('productsScreen.before')} ${selectedProduct.price.toFixed(2)})
                                    </Text>
                                ) : (
                                    <Text style={[styles.dialogText, { color: colors.text }]}>
                                        {t('productsScreen.price')}: ${selectedProduct.price.toFixed(2)}
                                    </Text>
                                )}

                                <Text
                                    style={[
                                        styles.dialogText,
                                        { color: selectedProduct.stock ? "green" : "red" }
                                    ]}
                                >
                                    {selectedProduct.stock ? t("productsScreen.inStock") : t("productsScreen.outOfStock")}
                                </Text>
                            </Dialog.Content>

                            <Dialog.Actions>
                                <Button onPress={() => setSelectedProduct(null)}>
                                    {t('common.close')}
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
    container: {
        flex: 1,
        paddingTop: 20,
    },

    header: {
        paddingTop: 30,
        paddingHorizontal: 10,
        paddingBottom: 10,
    },

    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    card: {
        borderRadius: 12,
        marginBottom: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
    },

    cardContent: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },

    image: {
        width: 90,
        height: 90,
        borderRadius: 10,
        resizeMode: "cover",
    },

    imagePlaceholder: {
        backgroundColor: "#ccc",
    },

    infoContainer: {
        flex: 1,
        marginLeft: 12,
    },

    name: {
        fontSize: 17,
        fontWeight: "bold",
    },

    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 3,
    },

    oldPrice: {
        textDecorationLine: "line-through",
        fontSize: 14,
        color: "#888",
        marginRight: 6,
    },

    offerPrice: {
        color: "red",
        fontSize: 16,
        fontWeight: "bold",
    },

    normalPrice: {
        fontSize: 16,
        fontWeight: "bold",
    },

    infoButton: {
        backgroundColor: "#007AFF",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 6,
    },

    infoButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
    },

    stockText: {
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 4,
    },

    dialog: {
        borderRadius: 10,
    },

    dialogImage: {
        width: "100%",
        height: 180,
        borderRadius: 8,
        marginBottom: 10,
    },

    dialogText: {
        fontSize: 15,
        marginBottom: 6,
    },

    dialogOffer: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
    },
});
