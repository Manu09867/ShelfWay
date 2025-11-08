import * as React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const OfertasScreen = () => {
    // anaqueles botones
    const anaqueles = [
        { id: 1, nombre: 'Lácteos', icon: 'cow', notificaciones: 0 },
        { id: 2, nombre: 'Carnes', icon: 'food-steak', notificaciones: 0 },
        { id: 3, nombre: 'Frutas', icon: 'fruit-cherries', notificaciones: 0 },
        { id: 4, nombre: 'Verduras', icon: 'carrot', notificaciones: 0 },
        { id: 5, nombre: 'Bebidas', icon: 'bottle-soda', notificaciones: 0 },
        { id: 6, nombre: 'Limpieza', icon: 'spray', notificaciones: 0 },
    ];

    return (
        <View style={styles.container}>
            <Chip
                mode="contained"
                style={styles.chip}
                textStyle={styles.chipText}
            >
                Anaqueles con Ofertas
            </Chip>
            
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <View style={styles.gridContainer}>
                    {anaqueles.map((anaquel) => (
                        <TouchableOpacity 
                            key={anaquel.id}
                            style={styles.anaquelButton}
                            onPress={() => console.log(`Clic en ${anaquel.nombre}`)}
                        >
                            {/* Icono*/}
                            <MaterialCommunityIcons 
                                name={anaquel.icon} 
                                size={40} 
                                color="#1a94e1" 
                                style={styles.anaquelIcon}
                            />
                            
                            {/* Nombre anaquel */}
                            <Text style={styles.anaquelText}>{anaquel.nombre}</Text>
                            
                            {/* notificaciones */}
                            <View style={styles.notificationBadge}>
                                <Text style={styles.notificationText}>
                                    {anaquel.notificaciones}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
        backgroundColor: '#f5f5f5',
    },
    chip: {
        width: '100%',
        justifyContent: 'center',
        marginBottom: 20,
        borderRadius: 8,
        height: 50,
        backgroundColor: '#1a94e1',
    },
    chipText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
        width: '100%',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    anaquelButton: {
        width: '48%', 
        aspectRatio: 1, 
        backgroundColor: 'white',
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
    anaquelIcon: {
        marginBottom: 10,
    },
    anaquelText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    notificationBadge: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#ff4444',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
    },
    notificationText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default OfertasScreen;