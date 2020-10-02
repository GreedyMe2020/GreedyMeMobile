import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { Button } from 'react-native-paper';
import { Form, TextValidator } from 'react-native-validator-form';
import { connect } from 'react-redux';
import { signIn } from '../../../redux/actions/auth-actions';

function MisDatos(props) {
  const [nombre, setNombre] = React.useState('');
  const [apellido, setApellido] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChangeNombre = (nombre) => {
    setNombre(nombre);
  };
  const handleChangeApellido = (apellido) => {
    setApellido(apellido);
  };
  const handleChangeEmail = (email) => {
    setEmail(email);
  };
  const handleChangePassword = (password) => {
    setPassword(password);
  };
  const handleSubmit = () => {};

  const form = React.createRef();

  return (
    <KeyboardAvoidingView
      style={styles.containerTeclado}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      enabled={Platform.OS === 'ios'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Form
            ref={form}
            onSubmit={handleSubmit}
            style={styles.contenedorForm}
          >
            <TextValidator
              style={styles.inputEmailPass}
              placeholderTextColor="#000000"
              required
              name="nombre"
              validators={['required']}
              errorMessages={['* Este campo es obligatorio']}
              placeholder="Nombre"
              type="text"
              value={nombre}
              onChangeText={handleChangeNombre}
              errorStyle={{
                container: { top: 0, left: 20, position: 'relative' },
                text: { color: 'red' },
                underlineValidColor: '#76B39D',
                underlineInvalidColor: 'red',
              }}
            />
            <TextValidator
              style={styles.inputEmailPass}
              placeholderTextColor="#000000"
              required
              name="apellido"
              validators={['required']}
              errorMessages={['* Este campo es obligatorio']}
              placeholder="Apellido"
              type="text"
              value={apellido}
              onChangeText={handleChangeApellido}
              errorStyle={{
                container: { top: 0, left: 20, position: 'relative' },
                text: { color: 'red' },
                underlineValidColor: '#76B39D',
                underlineInvalidColor: 'red',
              }}
            />
            <TextValidator
              style={styles.inputEmailPass}
              placeholderTextColor="#000000"
              required
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
                underlineValidColor: '#76B39D',
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
              errorMessages={['* Este campo es requerido']}
              type="text"
              value={password}
              onChangeText={handleChangePassword}
              errorStyle={{
                container: { top: 0, left: 20, position: 'relative' },
                text: { color: 'red' },
                underlineValidColor: '#76B39D',
                underlineInvalidColor: 'red',
              }}
            />
            <View style={styles.contOlvidePass}>
              <Text style={styles.olvideMiPass}>Cambiar mi contraseña</Text>
            </View>
            <View style={styles.contenedorBoton}>
              <Button
                theme={{
                  colors: { primary: '#76B39D' },
                }}
                style={styles.btnIngresar}
                mode="contained"
                title="Submit"
                onPress={handleSubmit}
              >
                Guardar datos
              </Button>
            </View>
          </Form>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  containerTeclado: {
    flex: 1,
  },
  contenedorForm: {
    top: 50,
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
    marginRight: 25,
  },
  olvideMiPass: {
    color: '#707070',
    fontSize: 15,
  },
  contenedorBoton: {
    top: 15,
  },
  btnIngresar: {
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

export default connect(mapStateToProps, mapDispatchToProps)(MisDatos);
