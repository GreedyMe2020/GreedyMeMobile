import React from 'react';
import { StyleSheet } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PantallaLogo from './src/components/pantalla-logo';
import IniciarSesion from './src/components/Iniciar sesion/inicio-sesion';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#262262',
    accent: '#F7941E',
    secondary: '#76B39D',
    background: '#ECECEC',
    text: 'black',
  },
};

const Stack = createStackNavigator();

export default function App(props) {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={PantallaLogo}
            options={{ title: '' }}
          />
          <Stack.Screen name="IniciarSesion" component={IniciarSesion} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
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
