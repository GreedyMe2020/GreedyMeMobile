import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CuponesComercio() {
  return (
    <View style={styles.container}>
      <Text>Cupones</Text>
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
