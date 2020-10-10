import React, { useState, useEffect } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import PantallaLogo from './src/components/pantalla-logo';
import IniciarSesion from './src/components/Iniciar sesion/inicio-sesion';
import Main from './src/components/pages/main';
import { Provider } from 'react-redux';
import store from './redux/store';
import obtenerTitulo from './src/components/obtener-titulo';
import Registro from './src/components/Iniciar sesion/registro';
import MisDatos from './src/components/Perfil/datosPerfil';
import Notificaciones from './src/components/Perfil/notificaciones';
import Ubicacion from './src/components/Perfil/ubicacion';
import CambiarContraseña from './src/components/Perfil/cambiarContraseña';
import Proveedores from './src/components/Proveedores/ini-proveedores';
import * as Font from 'expo-font';
import OlvideContraseña from './src/components/Iniciar sesion/olvide-contraseña';
import VerificarCuenta from './src/components/Iniciar sesion/verificar-cuenta';
import { StatusBar } from 'react-native';

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

/*firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(setUser(user));
  } else {
    store.dispatch(clearUser(user));
  }
});*/

//Funcion para determinar el color del header del componente
// Main a partir del nombre de la ruta obtenida.
function coloresHeaderTab(tabName) {
  const colorHead =
    tabName === 'Buscar' || tabName === 'Mis favoritos'
      ? '#76B39D'
      : tabName === 'Mis cupones'
      ? '#F7941E'
      : '#1E1B4D';
  return colorHead;
}

const Stack = createStackNavigator();

export default function App(props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      Font.loadAsync({
        'Raleway-Regular': require('./src/fonts/Raleway-Regular.ttf'),
        'Poppins-Regular': require('./src/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('./src/fonts/Poppins-SemiBold.ttf'),
      });
    }
  });
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator headerMode="screen">
              <Stack.Screen
                name="Home"
                component={PantallaLogo}
                options={{
                  headerShown: false,
                  animationEnabled: false,
                  gestureDirection: 'horizontal',
                }}
              />
              <Stack.Screen
                name="IniciarSesion"
                component={IniciarSesion}
                options={{
                  title: '',
                  headerShown: false,
                  animationEnabled: false,
                  gestureDirection: 'horizontal',
                }}
              />
              <Stack.Screen
                name="OlvideContraseña"
                component={OlvideContraseña}
                options={{
                  title: 'Olvidé mi contraseña',
                  headerShown: true,
                  animationEnabled: false,
                  gestureDirection: 'horizontal',
                }}
              />
              <Stack.Screen
                name="Registro"
                component={Registro}
                options={{ title: 'Registrarme', headerShown: true }}
              />
              <Stack.Screen
                name="VerificarCuenta"
                component={VerificarCuenta}
                options={{ title: 'Verificar mi cuenta', headerShown: true }}
              />
              <Stack.Screen
                name="Main"
                component={Main}
                options={({ route }) => ({
                  headerTitle: obtenerTitulo(route),
                  headerShown: obtenerTitulo(route) === 'Inicio' ? false : true,
                  headerLeft: null,
                  headerStyle: {
                    backgroundColor: coloresHeaderTab(obtenerTitulo(route)),
                  },
                  headerTitleStyle: { color: 'white' },
                })}
              />
              <Stack.Screen
                name="MisDatos"
                component={MisDatos}
                options={({ route }) => ({
                  title: 'Mis datos personales',
                  headerShown: true,
                  headerTintColor: 'white',
                  headerStyle: {
                    backgroundColor: '#1E1B4D',
                  },
                })}
              />
              <Stack.Screen
                name="GestionarNotificaciones"
                component={Notificaciones}
                options={({ route }) => ({
                  title: 'Gestionar mis notificaciones',
                  headerShown: true,
                  headerTintColor: 'white',
                  headerStyle: {
                    backgroundColor: '#1E1B4D',
                  },
                })}
              />
              <Stack.Screen
                name="GestionarUbicacion"
                component={Ubicacion}
                options={({ route }) => ({
                  title: 'Gestionar mi ubicación',
                  headerShown: true,
                  headerTintColor: 'white',
                  headerStyle: {
                    backgroundColor: '#1E1B4D',
                  },
                })}
              />
              <Stack.Screen
                name="GestionarProveedores"
                component={Proveedores}
                options={({ route }) => ({
                  title: 'Gestionar mis proveedores',
                  headerShown: true,
                  headerTintColor: 'white',
                  headerStyle: {
                    backgroundColor: '#1E1B4D',
                  },
                })}
              />
              <Stack.Screen
                name="CambiarContraseña"
                component={CambiarContraseña}
                options={({ route }) => ({
                  title: 'Cambiar contraseña',
                  headerShown: true,
                  headerTintColor: 'white',
                  headerStyle: {
                    backgroundColor: '#1E1B4D',
                  },
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
