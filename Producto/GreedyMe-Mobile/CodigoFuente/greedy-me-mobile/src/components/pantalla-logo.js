import React from 'react';
import { StatusBar, StyleSheet, Image } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { colors } from '../styles/colores';

export default function PantallaLogo() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.azul} />
      <Image
        style={styles.stretch}
        source={require('../multimedia/logoPrincipal.png')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.azul,
  },
  logoPrincipal: {
    width: '40%',
    height: '40%',
  },
});
