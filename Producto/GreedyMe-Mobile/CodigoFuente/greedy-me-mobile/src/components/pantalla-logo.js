import React from 'react';
import { Button } from 'react-native-paper';
import { StatusBar, StyleSheet, Image } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

export default function PantallaLogo({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E1B4D" />
      <Image
        style={styles.stretch}
        source={require('../multimedia/logoPrincipal.png')}
      />
      <Button
        title="Next screen"
        onPress={() => navigation.navigate('IniciarSesion')}
        color="#fff"
      >
        Siguiente
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1B4D',
  },
  logoPrincipal: {
    width: '40%',
    height: '40%',
  },
});
