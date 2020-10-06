import * as React from 'react';
import { StyleSheet, StatusBar, View, Text } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

function Cupones() {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#F7941E' }]}>
      <StatusBar barStyle="light-content" backgroundColor="#F7941E" />
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
export default Cupones;
