import * as React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Avatar, Divider, List } from 'react-native-paper';
import { connect } from 'react-redux';
import _ from 'lodash';
import { colors } from '../../styles/colores';

function GreedyShopHistorial(props) {
  return (
    <View style={styles.container}>
      <Text>Greedy historial de puntos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default GreedyShopHistorial;
