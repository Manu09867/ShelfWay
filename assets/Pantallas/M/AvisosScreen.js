import * as React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, Text, Chip } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const AvisosScreen = ({ navigation }) => (
    <View style={styles.container}>
        {/* Chip*/}
        <View style={styles.chipContainer}>
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
                Avisos del Supermercado
            </Chip>
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

            <Card style={styles.card}>
                <Card.Title
                    title="Santa Clara 2025"
                    subtitle="Del 10 al 17 de agosto"
                    left={props => <Avatar.Icon {...props} icon="gift" />}
                />
                <Card.Content>
                    <Text variant="titleLarge">¡Llegó Santa Clara!</Text>
                    <Text variant="bodyMedium">
                        • Descubre la nueva linea de productos de la marca
                    </Text>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://reditery.com/images/branding/blog/santa_clara_nuevo_logotipo_001.png' }} />
                <Card.Actions>
                    <Button mode="contained" onPress={() => navigation.navigate('Aviso1')}>
                        Ver Evento
                    </Button>
                </Card.Actions>
            </Card>


            <Card style={styles.card}>
                <Card.Title
                    title="El Buen Fin 2025"
                    subtitle="14 al 17 de noviembre"
                    left={props => <Avatar.Icon {...props} icon="sale" />}
                />
                <Card.Content>
                    <Text variant="titleLarge">El Mejor Buen Fin</Text>
                    <Text variant="bodyMedium">
                        • Hasta 18 MSI en todas las compras{"\n"}
                        • Precios especiales en mayoreo{"\n"}
                        • Envío gratis en compras mayores a $500{"\n"}
                        • Cashback del 5% con tarjeta store
                    </Text>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://i.pinimg.com/736x/3c/53/4f/3c534ff501cbdbb4618f99ffcf7885f3.jpg' }} />
                <Card.Actions>
                    <Button mode="contained" onPress={() => navigation.navigate('Aviso2')}>
                        Ver Promociones
                    </Button>
                </Card.Actions>
            </Card>
        </ScrollView>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
        backgroundColor: '#f5f5f5',
    },
    chipContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
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
        width: '100%',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    card: {
        marginBottom: 16,
        elevation: 4,
    },
});

export default AvisosScreen;