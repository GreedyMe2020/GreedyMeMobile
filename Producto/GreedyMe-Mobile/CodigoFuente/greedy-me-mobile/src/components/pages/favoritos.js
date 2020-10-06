import * as React from 'react';
import { StyleSheet, StatusBar, View, Text } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

function Favoritos() {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#76B39D' }]}>
      <StatusBar barStyle="light-content" backgroundColor="#76B39D" />
      <View style={styles.contenedor}>
        <Text>Favoritos</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default Favoritos;
