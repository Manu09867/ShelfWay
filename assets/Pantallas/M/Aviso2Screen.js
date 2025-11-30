import * as React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text, Chip, Button, Divider } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const Aviso2Screen = ({ navigation }) => (
    <View style={styles.container}>
        
        <View style={styles.header}>
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
                El Buen Fin 2025
            </Chip>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
    
            <Image
                source={{ uri: 'https://i.pinimg.com/736x/3c/53/4f/3c534ff501cbdbb4618f99ffcf7885f3.jpg' }}
                style={styles.mainImage}
                resizeMode="cover"
            />

            <View style={styles.content}>
                <Text style={styles.title}>El Mejor Buen Fin 2025</Text>
                <Text style={styles.subtitle}>14 al 17 de Noviembre</Text>


                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>18</Text>
                        <Text style={styles.statLabel}>Meses sin intereses</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>5%</Text>
                        <Text style={styles.statLabel}>Cashback</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>$0</Text>
                        <Text style={styles.statLabel}>Envío gratis</Text>
                    </View>
                </View>

                <Divider style={styles.divider} />

                <Text style={styles.sectionTitle}>Beneficios Exclusivos</Text>
                <View style={styles.benefitsGrid}>
                    <View style={styles.benefitCard}>
                        <MaterialCommunityIcons name="credit-card-multiple" size={30} color="#1a94e1" />
                        <Text style={styles.benefitTitle}>MSI</Text>
                        <Text style={styles.benefitText}>Hasta 18 meses sin intereses en todas tus compras</Text>
                    </View>
                    <View style={styles.benefitCard}>
                        <MaterialCommunityIcons name="truck-delivery" size={30} color="#1a94e1" />
                        <Text style={styles.benefitTitle}>Envío Gratis</Text>
                        <Text style={styles.benefitText}>En compras mayores a $500 pesos</Text>
                    </View>
                    <View style={styles.benefitCard}>
                        <MaterialCommunityIcons name="cash-refund" size={30} color="#1a94e1" />
                        <Text style={styles.benefitTitle}>Cashback</Text>
                        <Text style={styles.benefitText}>5% de devolución con tarjeta store</Text>
                    </View>
                    <View style={styles.benefitCard}>
                        <MaterialCommunityIcons name="account-group" size={30} color="#1a94e1" />
                        <Text style={styles.benefitTitle}>Mayoreo</Text>
                        <Text style={styles.benefitText}>Precios especiales para compras al mayoreo</Text>
                    </View>
                </View>

                <Divider style={styles.divider} />

                <Text style={styles.sectionTitle}>Categorías en Oferta</Text>
                <View style={styles.categories}>
                    <View style={styles.categoryItem}>
                        <Text style={styles.categoryText}>• Electrónicos y tecnología</Text>
                    </View>
                    <View style={styles.categoryItem}>
                        <Text style={styles.categoryText}>• Línea blanca y hogar</Text>
                    </View>
                    <View style={styles.categoryItem}>
                        <Text style={styles.categoryText}>• Despensa y alimentos</Text>
                    </View>
                    <View style={styles.categoryItem}>
                        <Text style={styles.categoryText}>• Ropa y accesorios</Text>
                    </View>
                    <View style={styles.categoryItem}>
                        <Text style={styles.categoryText}>• Juguetes y entretenimiento</Text>
                    </View>
                </View>


                <Text style={styles.sectionTitle}>Tips para el Buen Fin</Text>
                <View style={styles.tipsContainer}>
                    <Text style={styles.tip}>🛒 Planifica tus compras con anticipación</Text>
                    <Text style={styles.tip}>📱 Descarga nuestra app para ofertas exclusivas</Text>
                    <Text style={styles.tip}>💳 Revisa los términos de MSI de tu tarjeta</Text>
                    <Text style={styles.tip}>🕒 Visita temprano para mejor selección</Text>
                </View>
            </View>
        </ScrollView>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        paddingTop: 60,
        backgroundColor: 'white',
        elevation: 4,
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
    },
    scrollView: {
        flex: 1,
    },
    mainImage: {
        width: '100%',
        height: 250,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a94e1',
        marginBottom: 5,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        elevation: 2,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a94e1',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginTop: 5,
    },
    divider: {
        marginVertical: 20,
        backgroundColor: '#e0e0e0',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    benefitsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    benefitCard: {
        width: '48%',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 15,
        alignItems: 'center',
        marginBottom: 10,
        elevation: 2,
    },
    benefitTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 5,
    },
    benefitText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    categories: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
    },
    categoryItem: {
        marginBottom: 8,
    },
    categoryText: {
        fontSize: 14,
        color: '#333',
    },
    tipsContainer: {
        backgroundColor: '#e3f2fd',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
    },
    tip: {
        fontSize: 14,
        color: '#1565c0',
        marginBottom: 8,
    },
    actionsContainer: {
        gap: 10,
    },
    actionButton: {
        backgroundColor: '#1a94e1',
        borderRadius: 8,
        paddingVertical: 8,
    },
    secondaryButton: {
        borderColor: '#1a94e1',
        borderRadius: 8,
        paddingVertical: 8,
    },
});

export default Aviso2Screen;