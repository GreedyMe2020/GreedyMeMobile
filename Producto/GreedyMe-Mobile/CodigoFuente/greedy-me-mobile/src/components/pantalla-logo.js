import React from 'react';
import { Button } from 'react-native-paper';
import { Image, View, StyleSheet } from 'react-native';

export default function PantallaLogo({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logoPrincipal}
        source={require('../multimedia/logoPrincipal.png')}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('IniciarSesion')}
      >
        Iniciar sesion
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#262262',
  },
  logoPrincipal: {
    width: '50%',
    height: '50%',
  },
});
