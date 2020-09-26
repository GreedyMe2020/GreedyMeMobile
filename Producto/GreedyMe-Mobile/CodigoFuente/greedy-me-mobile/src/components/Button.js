import React from 'react';
import { Button } from 'react-native-paper';
import { View, Text } from 'react-native';

export default function ButtonGenerico({ navigation }) {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        mode="contained"
        title="Go to otra pagina"
        onPress={() => navigation.navigate('Details')}
      >
        Ir a la otra
      </Button>
    </View>
  );
}
