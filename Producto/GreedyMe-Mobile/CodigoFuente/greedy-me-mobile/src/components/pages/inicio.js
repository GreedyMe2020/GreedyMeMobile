import * as React from 'react';
import { View, Text } from 'react-native';
import { signOut } from '../../../redux/actions/auth-actions';
import { connect } from 'react-redux';

function Inicio(props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Ahora estas en el inicio</Text>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inicio);
