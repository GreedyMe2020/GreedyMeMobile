import * as React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function ButtonEj({ text, onPress }) {
  return (
    <Button
      theme={{
        colors: { primary: '#76B39D' },
      }}
      style={styles.btnIngresar}
      mode="contained"
      title="Submit"
      onPress={onPress}
    >
      {text}
    </Button>
  );
}

const styles = StyleSheet.create({
  btnIngresar: {
    marginRight: 20,
    marginLeft: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
