import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function ComerciosPorRubro(props) {
  const { data } = props.route.params;
  return (
    <View styles={styles.container}>
      <Text>{data.item.nombre}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

export default ComerciosPorRubro;
