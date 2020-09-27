import * as React from 'react';
import { TextInput, Button } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { signIn } from '../../../redux/actions/auth-actions';

function IniciarSesion(props) {
  const [text, setText] = React.useState('');

  return (
    <View style={styles.container}>
      <View style={styles.titulo}>
        <Text style={styles.letraBlanca}>gre</Text>
        <Text style={styles.letraVerde}>edy</Text>
        <Text style={styles.letraNaranja}>me </Text>
      </View>
      <View style={styles.inputSesion}>
        <TextInput
          style={styles.inputEmail}
          mode="flat"
          label="Email"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <TextInput
          style={styles.inputPass}
          mode="flat"
          label="Contraseña"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <Text style={styles.olvideMiPass}>Olvide mi contraseña</Text>
        <Button
          theme={{ colors: { primary: '#76B39D' } }}
          style={styles.btnIngresar}
          mode="contained"
          onPress={() => props.navigation.navigate('Home')}
        >
          Volver
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#262262',
    flex: 1,
  },
  titulo: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputSesion: {
    flex: 2,
    width: '100%',
  },
  letraBlanca: {
    color: 'white',
    fontSize: 60,
    letterSpacing: 10,
  },
  letraVerde: {
    color: '#76B39D',
    fontSize: 60,
    letterSpacing: 10,
  },
  letraNaranja: {
    color: '#F7941E',
    fontSize: 60,
    letterSpacing: 10,
  },
  inputEmail: {
    marginRight: 15,
    marginLeft: 15,
  },
  inputPass: {
    marginRight: 15,
    marginLeft: 15,
  },
  olvideMiPass: {
    marginRight: 15,
    marginLeft: 15,
    top: 5,
    color: 'white',
  },
  btnIngresar: {
    marginRight: 15,
    marginLeft: 15,
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

export default connect(mapStateToProps, mapDispatchToProps)(IniciarSesion);
