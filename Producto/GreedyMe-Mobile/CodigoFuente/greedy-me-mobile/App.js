import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import PantallaLogo from './src/components/pantalla-logo';
import IniciarSesion from './src/components/Iniciar sesion/inicio-sesion';
import Main from './src/components/pages/main';
import IniciarSesionConEmail from './src/components/Iniciar sesion/iniciar-con-email';
import IniciarSesionConRedes from './src/components/Iniciar sesion/iniciar-con-redes';
import { Provider } from 'react-redux';
import store from './redux/store';
import obtenerTitulo from './src/components/obtener-titulo';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1E1B4D', ///azul
    accent: '#F7941E', ///naranja
    secondary: '#76B39D', ///celeste
    background: '#ECECEC',
    text: 'black',
  },
};

const Stack = createStackNavigator();

export default function App(props) {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator headerMode="none">
              <Stack.Screen
                name="Home"
                component={PantallaLogo}
                options={{ title: '' }}
              />
              <Stack.Screen
                name="IniciarSesion"
                component={IniciarSesion}
                options={{ title: '' }}
              />
              <Stack.Screen
                name="IniciarSesionConEmail"
                component={IniciarSesionConEmail}
                options={{ title: '' }}
              />
              <Stack.Screen
                name="IniciarSesionConRedes"
                component={IniciarSesionConRedes}
                options={{ title: '' }}
              />
              <Stack.Screen
                name="Main"
                component={Main}
                options={({ route }) => ({
                  headerTitle: obtenerTitulo(route),
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
