import * as React from 'react';
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet, StatusBar, Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { connect } from 'react-redux';
import { signIn } from '../../../redux/actions/auth-actions';
import { Form, TextValidator } from 'react-native-validator-form';

function IniciarSesion(props) {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');

  const handleChange = (email) => {
    setEmail({ email });
  };

  const handleSubmit = () => {};

  const form = React.createRef();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.titulo}>
        <Text style={styles.letraBlanca}>gre</Text>
        <Text style={styles.letraVerde}>edy</Text>
        <Text style={styles.letraNaranja}>me </Text>
      </View>
      <View style={styles.inputSesion}>
        <TextInput
          style={styles.inputEmailPass}
          underlineColor="#F7941E"
          placeholderTextColor="white"
          mode="flat"
          label="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          underlineColor="#F7941E"
          placeholderTextColor="white"
          style={styles.inputEmailPass}
          mode="flat"
          label="Contraseña"
          value={pass}
          onChangeText={(pass) => setPass(pass)}
        />
        <Form ref={form} onSubmit={handleSubmit}>
          <TextValidator
            name="email"
            label="email"
            validators={['required', 'isEmail']}
            errorMessages={['This field is required', 'Email invalid']}
            placeholder="Your email"
            type="text"
            keyboardType="email-address"
            value={email}
            onChangeText={handleChange}
          />
          <Button title="Submit" onPress={handleSubmit} />
        </Form>

        <View style={styles.contOlvidePass}>
          <Text style={styles.olvideMiPass}>Olvidé mi contraseña</Text>
        </View>
        <View style={styles.inputSesion}>
          <Button
            theme={{
              colors: { primary: '#76B39D' },
            }}
            style={styles.btnIngresar}
            mode="contained"
            onPress={() => props.navigation.navigate('Main')}
          >
            Ingresar
          </Button>
          <Button
            theme={{
              colors: { primary: 'white' },
              backgroundColor: 'none',
            }}
            style={styles.btnVolver}
            mode="contained"
            onPress={() => props.navigation.navigate('Home')}
          >
            Volver
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  titulo: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15, //igual este no deberia estar nose porque no lo centra
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
  iconSesion: {
    marginLeft: 20,
  },
  inputEmailPass: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 15,
    color: '#ffff',
    paddingLeft: 10,
    height: 55,
    backgroundColor: '#413e70',
  },
  contOlvidePass: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  olvideMiPass: {
    marginRight: 15,
    marginLeft: 15,
    top: 2,
    color: 'white',
  },
  btnIngresar: {
    marginRight: 20,
    marginLeft: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnVolver: {
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
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
