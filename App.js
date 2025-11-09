import * as React from 'react';
import { ThemeContextProvider } from './assets/Resources/ThemeProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper'; 

import SplashScreen from './assets/Pantallas/D/SplashSC';
import MainScreen from './assets/Pantallas/D/MainSC';
import MainForm from './assets/Pantallas/D/MainformSC';
import LoginScreen from './assets/Pantallas/D/LogginSC';
import RegisterScreen from './assets/Pantallas/D/RegisterSC';
import ProductsScreen from './assets/Pantallas/D/ProductSC';
import ConfigScreen from './assets/Pantallas/M/ConfigScreen';
import AvisosScreen from './assets/Pantallas/M/AvisosScreen';
import Aviso1Screen from './assets/Pantallas/M/Aviso1Screen';
import Aviso2Screen from './assets/Pantallas/M/Aviso2Screen';
import OfertasScreen from './assets/Pantallas/M/OfertasSC';
import Mapa from './assets/Pantallas/F/Mapa';
import AnaquelesOfertas from './assets/Pantallas/F/AnaquelesOfertas';
import ProductoOF from './assets/Pantallas/F/ProductoOF';
import ReporteScreen from './assets/Pantallas/C/Reporte'; 
import PersonalizacionScreen from './assets/Pantallas/C/Personalizacion';
import PreferenciasScreen from './assets/Pantallas/C/Preferencias';
import NotificacionesScreen from './assets/Pantallas/C/Notificaciones';
import IdiomaScreen from './assets/Pantallas/C/Idioma';


const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <ThemeContextProvider>

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="MainForm" component={MainForm} />
          <Stack.Screen name="RegisterSC" component={RegisterScreen} />
          <Stack.Screen name="LoginSC" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Products" component={ProductsScreen} />
          <Stack.Screen name="Config" component={ConfigScreen} />
          <Stack.Screen name="Avisos" component={AvisosScreen} />
          <Stack.Screen name="Aviso1" component={Aviso1Screen} />
          <Stack.Screen name="Aviso2" component={Aviso2Screen} />
          <Stack.Screen name="Ofertas" component={OfertasScreen} />
          <Stack.Screen name="Mapa" component={Mapa} />
          <Stack.Screen name="AnaquelesOfertas" component={AnaquelesOfertas} />
          <Stack.Screen name="ProductoOF" component={ProductoOF} />
          <Stack.Screen name="Reporte" component={ReporteScreen} />
          <Stack.Screen name="Personalizacion" component={PersonalizacionScreen} />
          <Stack.Screen name="Preferencias" component={PreferenciasScreen} />
          <Stack.Screen name="Notificaciones" component={NotificacionesScreen} />
          <Stack.Screen name="Idioma" component={IdiomaScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContextProvider>
  );
}
