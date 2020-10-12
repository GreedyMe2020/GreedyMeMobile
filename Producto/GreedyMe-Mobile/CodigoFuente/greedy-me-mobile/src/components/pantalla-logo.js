import React from 'react';
import { StatusBar, StyleSheet, Image } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

export default function PantallaLogo() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E1B4D" />
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
    backgroundColor: '#1E1B4D',
  },
  logoPrincipal: {
    width: '40%',
    height: '40%',
  },
});
