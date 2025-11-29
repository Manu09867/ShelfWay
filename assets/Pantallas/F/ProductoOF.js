import * as React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Text, Card, ActivityIndicator } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Resources/firebaseConfig';
import { useTheme } from '../../Resources/ThemeProvider';
import CustomAppbar from '../../components/CustomAppbar';
import { useTranslation } from 'react-i18next';

const ProductoOF = ({ navigation }) => {
  const route = useRoute();
  const { producto } = route.params;
  const { id } = producto;
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();

  const [item, setItem] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'productos', id);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          const data = snap.data();
          const lang = i18n.language || 'es';

          setItem({
            id,
            nombre: data.nombre?.[lang] || t('product.noName'),
            precioAntes: data.precio ? `$${data.precio}` : '$0',
            precioAhora: data.precioOferta ? `$${data.precioOferta}` : '$0',
            descripcion: data.descripcion?.[lang] || t('product.noDescription'),
            imagen: data.imagen?.url || null,
          });
        } else {
          console.log("Producto no encontrado");
        }
      } catch (e) {
        console.error("Error obteniendo producto:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [i18n.language]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  if (!item) {
    return (
      <View style={styles.centered}>
        <Text>{t('product.notFound')}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <CustomAppbar
        title={t('product.title')}
        showBack
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Nombre */}
        <Text style={[styles.productName, { color: theme.colors.text }]}>
          {item.nombre}
        </Text>

        {/* Precios */}
        <Text style={styles.precioAntes}>{t('product.before')}: {item.precioAntes}</Text>
        <Text style={styles.precioAhora}>{t('product.now')}: {item.precioAhora}</Text>

        {/* Imagen */}
        {item.imagen ? (
          <Image source={{ uri: item.imagen }} style={styles.productImage} />
        ) : (
          <View style={[styles.productImage, { backgroundColor: '#ccc' }]} />
        )}

        {/* Descripción */}
        <Card style={styles.descriptionCard}>
          <Card.Content>
            <Text style={[styles.productDescription, { color: theme.colors.text }]}>
              {item.descripcion}
            </Text>
          </Card.Content>
        </Card>

      </ScrollView>
    </View>
  );
};

export default ProductoOF;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: "center",
    padding: 20,
    paddingBottom: 100,
  },
  productImage: {
    width: "80%",
    height: 260,
    borderRadius: 18,
    marginVertical: 25,
  },
  productName: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: 8,
    marginLeft: "5%",
  },
  precioAntes: {
    fontSize: 18,
    color: "#777",
    textDecorationLine: "line-through",
    marginBottom: 4,
    textAlign: "left",
    alignSelf: "flex-start",
    marginLeft: "5%",
  },
  precioAhora: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    marginBottom: 20,
    textAlign: "left",
    alignSelf: "flex-start",
    marginLeft: "5%",
  },
  descriptionCard: {
    width: "90%",
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#fff",
    elevation: 3,
    marginBottom: 20,
  },
  productDescription: {
    fontSize: 18,
    textAlign: "justify",
    lineHeight: 26,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
