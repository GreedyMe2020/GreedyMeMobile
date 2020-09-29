import React from 'react';
import { StyleSheet } from 'react-native';
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

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1E1B4D',
    accent: '#F7941E',
    secondary: '#76B39D',
    background: '#ECECEC',
    text: 'black',
  },
};

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
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator headerMode="screen">
              <Stack.Screen
                name="Home"
                component={PantallaLogo}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="IniciarSesion"
                component={IniciarSesion}
                options={{ title: '', headerShown: false }}
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
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
  },
});
