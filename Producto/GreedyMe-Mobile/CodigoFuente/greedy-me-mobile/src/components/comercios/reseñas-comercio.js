import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ReseñasComercio() {
  return (
    <View style={styles.container}>
      <Text>Reseñas</Text>
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
