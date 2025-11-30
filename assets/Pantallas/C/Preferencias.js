import * as React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { useTheme, RadioButton, Divider } from 'react-native-paper'; 
import { StatusBar } from 'expo-status-bar';

// ⭐ IMPORTANTE: Importamos el hook para traducir
import { useTranslation } from 'react-i18next';

import CustomAppbar from '../../components/CustomAppbar';
import { useTheme as useAppTheme } from '../../Resources/ThemeProvider'; 

function PreferenciasScreen() {
  const paperTheme = useTheme(); 
  
  // ⭐ Obtenemos la función 't'
  const { t } = useTranslation();

  // ⭐ Ya NO extraemos i18n de aquí, solo las funciones del tema oscuro
  const { toggleThemeType, isDarkTheme } = useAppTheme(); 

  const [checkedTheme, setCheckedTheme] = React.useState(isDarkTheme ? 'oscuro' : 'claro');

  React.useEffect(() => {
    if (checkedTheme === 'oscuro' && !isDarkTheme) {
      toggleThemeType();
    } else if (checkedTheme === 'claro' && isDarkTheme) {
      toggleThemeType();
    }
  }, [checkedTheme, isDarkTheme, toggleThemeType]);

  const { width, height } = Dimensions.get('window');
  const isPortrait = height >= width;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: paperTheme.colors.background }]}>
      <StatusBar style="light" backgroundColor={paperTheme.colors.primary} />
      
      {/* 🔹 CAMBIO: Título traducido usando el JSON */}
      <CustomAppbar title={t('preferencesScreen.header_title_preferences')} />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          !isPortrait && styles.scrollContentLandscape
        ]}
        style={styles.scrollView}
      >

        <View style={styles.sectionContainer}>
          {/* 🔹 CAMBIO: Título de sección traducido */}
          <Text
            style={[
              styles.sectionTitle,
              { color: paperTheme.colors.text }
            ]}
          >
            {t('preferencesScreen.theme_title')}
          </Text>
          
          {/* 🔹 CAMBIO: Descripción traducida */}
          <Text
            style={[
              styles.sectionSubtitle,
              { color: paperTheme.colors.onSurfaceVariant }
            ]}
          >
            {t('preferencesScreen.theme_description')}
          </Text>
          <Divider style={styles.divider} />

          <RadioButton.Group onValueChange={newValue => setCheckedTheme(newValue)} value={checkedTheme}>
            <View style={styles.radioButtonContainer}>
              {/* 🔹 CAMBIO: Etiqueta traducida */}
              <Text style={[styles.radioButtonLabel, { color: paperTheme.colors.text }]}>
                {t('preferencesScreen.theme_light')}
              </Text>
              <RadioButton value="claro" color={paperTheme.colors.primary} />
            </View>
            <View style={styles.radioButtonContainer}>
              {/* 🔹 CAMBIO: Etiqueta traducida */}
              <Text style={[styles.radioButtonLabel, { color: paperTheme.colors.text }]}>
                {t('preferencesScreen.theme_dark')}
              </Text>
              <RadioButton value="oscuro" color={paperTheme.colors.primary} />
            </View>
          </RadioButton.Group>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  scrollContentLandscape: {
    paddingHorizontal: 50,
  },
  sectionContainer: {
    marginTop: 10,
    marginBottom: 15,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 18,
    textAlign: 'center',
  },
  sectionSubtitle: {
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  divider: {
    marginVertical: 8,
    backgroundColor: '#ccc',
    height: 1,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  radioButtonLabel: {
    fontSize: 16,
  },
});

export default PreferenciasScreen;