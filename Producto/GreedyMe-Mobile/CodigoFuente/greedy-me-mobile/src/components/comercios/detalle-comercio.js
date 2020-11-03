import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetalleComercio() {
  return (
    <View styles={styles.container}>
      <Text>Detalle del comercio</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
