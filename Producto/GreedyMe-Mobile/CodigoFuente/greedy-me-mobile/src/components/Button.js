import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export const buttonTheme = {
  colors: {
    primary: '#1E1B4D',
    accent: 'yellow',
    secondary: '#05004e',
  },
};

export default function ButtonGenerico({ text }) {
  return (
    <Button style={styles.container} mode="contained" theme={buttonTheme}>
      {text}
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
