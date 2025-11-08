import * as React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text, Chip, Button, Divider } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const Aviso1Screen = ({ navigation }) => (
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
                Santa Clara 2025
            </Chip>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            
            <Image 
                source={{ uri: 'https://reditery.com/images/branding/blog/santa_clara_nuevo_logotipo_001.png' }} 
                style={styles.mainImage}
                resizeMode="contain"
            />

            {/* info */}
            <View style={styles.content}>
                <Text style={styles.title}>¡Llegó Santa Clara 2025!</Text>
                <Text style={styles.subtitle}>Del 10 al 17 de Agosto</Text>

                {/* Detalles */}
                <View style={styles.detailsContainer}>
                    <View style={styles.detailItem}>
                        <MaterialCommunityIcons name="calendar-range" size={20} color="#1a94e1" />
                        <Text style={styles.detailText}>10 - 17 Agosto 2025</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <MaterialCommunityIcons name="clock-outline" size={20} color="#1a94e1" />
                        <Text style={styles.detailText}>Horario extendido 8:00 - 22:00 hrs</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <MaterialCommunityIcons name="tag-multiple" size={20} color="#1a94e1" />
                        <Text style={styles.detailText}>Descuentos hasta 50%</Text>
                    </View>
                </View>

                <Divider style={styles.divider} />

                {/* Descripción */}
                <Text style={styles.sectionTitle}>Sobre el Evento</Text>
                <Text style={styles.description}>
                    Santa Clara 2025 trae las mejores ofertas en productos de calidad. 
                    Descubre nuestra nueva línea de productos con precios increíbles 
                    y promociones exclusivas para clientes frecuentes.
                </Text>


                <Divider style={styles.divider} />

                <Text style={styles.sectionTitle}>Términos y Condiciones</Text>
                <Text style={styles.terms}>
                    • Promociones válidas del 10 al 17 de agosto de 2025{"\n"}
                    • No acumulable con otras promociones{"\n"}
                    • Productos sujetos a disponibilidad{"\n"}
                    • Precios pueden variar sin previo aviso
                </Text>

            
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
        height: 200,
        backgroundColor: 'white',
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
    detailsContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        elevation: 2,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    detailText: {
        fontSize: 14,
        color: '#333',
        marginLeft: 10,
    },
    divider: {
        marginVertical: 20,
        backgroundColor: '#e0e0e0',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
        marginBottom: 20,
    },
    offerList: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
    },
    offerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    offerText: {
        fontSize: 14,
        color: '#333',
        marginLeft: 8,
    },
    terms: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 20,
    },
    actionButton: {
        backgroundColor: '#1a94e1',
        borderRadius: 8,
        paddingVertical: 8,
        marginTop: 10,
    },
});

export default Aviso1Screen;