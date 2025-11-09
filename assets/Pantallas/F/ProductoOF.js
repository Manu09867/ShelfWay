import * as React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Text, Chip } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const ProductoOF = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'ofertas', title: 'Ofertas', icon: 'local-offer' },
    { key: 'mapa', title: 'Mapa', icon: 'map' },
    { key: 'config', title: 'Configuración', icon: 'settings' },
  ]);


  // Datos de ejemplo del producto
  const producto = {
    nombre: 'Leche LALA',
    precio: '$45.00',
    descripcion:
      'Texto de ejemplo para la descripcion del producto, no se que mas poner pero esto es para que se vea mas lleno y tenga mucho texto Stan LOONA',
    imagen:
      'https://www.lala.com.mx/storage/app/media/7501020565935_00.png',
  };

  return (
    <View style={styles.container}>
      {/* Barra superior */}
      <View style={styles.chipContainer}>
        <View style={styles.backButtonContainer}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color="white"
            onPress={() => navigation.goBack()}
          />
        </View>
        <Chip mode="contained" style={styles.chip} textStyle={styles.chipText}>
          Detalles del Producto
        </Chip>
      </View>

      {/* Contenido principal */}
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: producto.imagen }} style={styles.productImage} />
        <Text style={styles.productName}>{producto.nombre}</Text>
        <Text style={styles.productPrice}>{producto.precio}</Text>
        <Text style={styles.productDescription}>{producto.descripcion}</Text>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginHorizontal: 20,
  },
  backButtonContainer: {
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
  content: {
    alignItems: 'center',
    padding: 20,
  },
  productImage: {
    width: '90%',
    height: 250,
    borderRadius: 15,
    marginBottom: 50,
    marginTop: 50
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a94e1',
    marginBottom: 15,
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'justify',
    lineHeight: 22,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1a94e1',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navIcon: {
    paddingHorizontal: 10,
  },
});

export default ProductoOF;
