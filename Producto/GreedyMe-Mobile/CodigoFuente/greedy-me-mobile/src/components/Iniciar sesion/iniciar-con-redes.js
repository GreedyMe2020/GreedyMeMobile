import * as React from 'react';
import { Button } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { signIn } from '../../../redux/actions/auth-actions';

function IniciarSesionConRedes(props) {
  return (
    <View>
      <Button
        icon={({ padding }) => (
          <Image
            source={require('../../multimedia/gmail.png')}
            style={{ width: 20, height: 20, marginEnd: 3, marginLeft: -3 }}
          />
        )}
        theme={{
          colors: { primary: '#e1e1e1' }, ///1E1B4D
        }}
        style={styles.btnRedesSociales}
        mode="contained"
        title="Submit"
      >
        Iniciar sesión con Google
      </Button>
      <Button
        icon={({ padding }) => (
          <Image
            source={require('../../multimedia/facebook.png')}
            style={{ width: 20, height: 20, marginLeft: 7 }}
          />
        )}
        theme={{
          colors: { primary: '#e1e1e1' }, ///1E1B4D
        }}
        style={styles.btnRedesSociales}
        mode="contained"
        title="Submit"
      >
        Iniciar sesión con Facebook
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  btnRedesSociales: {
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 70,
  },
  iconRedes: {
    width: 20,
    height: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch(signIn(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IniciarSesionConRedes);
