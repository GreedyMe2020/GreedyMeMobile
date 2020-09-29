import * as React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { signIn } from '../../../redux/actions/auth-actions';
import { Form, TextValidator } from 'react-native-validator-form';

function IniciarSesionConEmail(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChangeEmail = (email) => {
    setEmail(email);
  };

  const handleChangePassword = (password) => {
    setPassword(password);
  };
  const handleSubmit = () => {};

  const form = React.createRef();

  return (
    <Form ref={form} onSubmit={handleSubmit}>
      <TextValidator
        style={styles.inputEmailPass}
        placeholderTextColor="#000000"
        required
        label="Email"
        name="email"
        validators={['isEmail']}
        errorMessages={['* El email no es válido']}
        placeholder="Email"
        type="text"
        keyboardType="email-address"
        value={email}
        onChangeText={handleChangeEmail}
        errorStyle={{
          container: { top: 0, left: 20, position: 'relative' },
          text: { color: 'red' },
          underlineValidColor: '#1E1B4D',
          underlineInvalidColor: 'red',
        }}
      />
      <TextValidator
        style={styles.inputEmailPass}
        placeholderTextColor="#000000"
        required
        name="password"
        label="text"
        placeholder="Contraseña"
        secureTextEntry
        validators={['required']}
        errorMessages={['This field is required']}
        type="text"
        value={password}
        onChange={handleChangePassword}
        errorStyle={{
          container: { top: 0, left: 20, position: 'relative' },
          text: { color: 'red' },
          underlineValidColor: '#1E1B4D',
          underlineInvalidColor: 'red',
        }}
      />

      <View style={styles.contOlvidePass}>
        <Text style={styles.olvideMiPass}>Olvidé mi contraseña</Text>
      </View>
      <View>
        <Button
          theme={{
            colors: { primary: '#76B39D' },
          }}
          style={styles.btnIngresar}
          mode="contained"
          title="Submit"
          onPress={handleSubmit}
        >
          Ingresar
        </Button>
        <View style={styles.or}>
          <Text>- O -</Text>
        </View>
      </View>
    </Form>
  );
}

const styles = StyleSheet.create({
  iconSesion: {
    marginLeft: 20,
  },
  inputEmailPass: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    paddingLeft: 5,
    height: 55,
    fontSize: 18,
  },
  contOlvidePass: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  olvideMiPass: {
    top: -10,
    marginRight: 20,
    color: '#707070',
  },
  btnIngresar: {
    marginRight: 20,
    marginLeft: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  or: {
    top: 40,
    width: '100%',
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IniciarSesionConEmail);