import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ButtonGenerico from './src/components/Button';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

export default function App(props) {
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Text style={{ color: theme.colors.primary }}>
          Hola wachos ahora anda by lau!
        </Text>
        <ButtonGenerico text="Presionar ak"></ButtonGenerico>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
