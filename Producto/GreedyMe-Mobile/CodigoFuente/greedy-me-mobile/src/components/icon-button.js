import * as React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function IconButton({ text, onPress, color, icon, textColor }) {
  return (
    <Button
      theme={{
        colors: { primary: color },
      }}
      style={styles.btnIngresar}
      mode="contained"
      icon={icon}
      title="Submit"
      onPress={onPress}
      labelStyle={{ fontSize: 16, color: textColor }}
    >
      {text}
    </Button>
  );
}

const styles = StyleSheet.create({
  btnIngresar: {
    marginRight: 20,
    height: 50,
    width: 175,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
