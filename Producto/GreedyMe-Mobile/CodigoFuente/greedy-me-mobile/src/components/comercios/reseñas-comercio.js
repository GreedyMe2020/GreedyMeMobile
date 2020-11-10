import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';

export default function ReseñasComercio() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contenedor}>
        <Image
          style={styles.image}
          source={require('../../multimedia/reseñas.png')}
        />
        <Text style={styles.text}>No se encontraron reseñas</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f3f3',
    flex: 1,
  },
  contenedor: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 350,
  },
  text: {
    fontSize: 17,
  },
});
