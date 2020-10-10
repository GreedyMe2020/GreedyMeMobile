import * as React from 'react';
import { StyleSheet, StatusBar, View, Text } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import { connect } from 'react-redux';

function Favoritos() {
  return (
    <View style={styles.contenedor}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={'transparent'}
      />
      <View>
        <Text>Favoritos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Favoritos);
