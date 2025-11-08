import * as React from 'react';
import { ThemeContextProvider } from './assets/Resources/ThemeProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContextProvider>
  );
}
