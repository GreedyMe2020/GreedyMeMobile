import * as React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { signOut } from '../../../redux/actions/auth-actions';
import { connect } from 'react-redux';

function Inicio(props) {
  const handleSubmit = () => {
    props.signOut();
    props.navigation.navigate('IniciarSesion');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Ahora estas en el inicio</Text>
      <Button
        theme={{
          colors: { primary: '#76B39D' },
        }}
        mode="contained"
        title="Submit"
        onPress={handleSubmit}
      >
        Cerrar Sesion
      </Button>
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
