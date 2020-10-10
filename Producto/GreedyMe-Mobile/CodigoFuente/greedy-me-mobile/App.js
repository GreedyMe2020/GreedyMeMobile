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
import { connect } from 'react-redux';
import Prueba from './src/components/pages/prueba';

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
          <Prueba />
        </PaperProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
