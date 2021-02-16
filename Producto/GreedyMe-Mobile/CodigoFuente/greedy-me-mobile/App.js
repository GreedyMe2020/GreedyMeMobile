import React, { useState, useEffect } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './redux/store';
import * as Font from 'expo-font';
import NavegadorPrincipal from './src/components/pages/navegador-principal';
import { CuponesContextProvider } from './src/context/cuponesContext';

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
      <CuponesContextProvider>
        <SafeAreaProvider>
          <PaperProvider theme={theme}>
            <NavegadorPrincipal />
          </PaperProvider>
        </SafeAreaProvider>
      </CuponesContextProvider>
    </Provider>
  );
}
