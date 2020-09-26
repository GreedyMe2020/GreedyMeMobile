import React from 'react';
import { Button } from 'react-native-paper';
import { View, Text } from 'react-native';

export default function DetailsScreen({ navigation }) {
  return (
    <View>
      <Text>Details Screen</Text>
      <Button mode="contained" onPress={() => navigation.navigate('Home')}>
        Volver a home
      </Button>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
