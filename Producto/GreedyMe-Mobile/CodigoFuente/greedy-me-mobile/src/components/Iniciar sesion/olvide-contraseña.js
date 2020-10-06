import * as React from 'react';
import { Button, TextInput } from 'react-native-paper';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { signIn } from '../../../redux/actions/auth-actions';

function OlvideContraseña(props) {
  const [email, setEmail] = React.useState(null);
  const [errorEmail, setErrorEmail] = React.useState('');

  const handleChangeEmail = (email) => {
    setEmail(email);
  };

  //Variable que contiene un expresion regular de un email
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const emailValidator = React.useEffect(() => {
    if (email === '') {
      setErrorEmail('* Ingresá tu email para continuar');
    } else {
      if (email !== null) {
        if (reg.test(email) !== true) {
          setErrorEmail('* Este campo no es correcto');
        } else {
          setErrorEmail('');
        }
      }
    }
  }, [email]);

  /* const handleSubmit = () => {
    if (email === '' || email === null) {
      setErrorEmail('* Ingresá tu email para continuar');
    } else {
      setErrorEmail('');
      //
    }
  }; */

  return (
    <KeyboardAvoidingView
      style={styles.containerTeclado}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      enabled={Platform.OS === 'ios'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.texto}>
            Ingresá tu email y te enviaremos una nueva contraseña que luego
            podrás cambiar desde tu perfil.
          </Text>
          <TextInput
            style={styles.inputEmailPass}
            mode="flat"
            label="Email de recuperación"
            required
            underlineColor="#76B39D"
            onBlur={() => {
              emailValidator;
            }}
            value={email}
            onChangeText={handleChangeEmail}
            error={errorEmail}
          />
          <Text style={styles.errorPass}>{errorEmail}</Text>

          <View style={styles.contenedorBoton}>
            <Button
              theme={{
                colors: { primary: '#76B39D' },
              }}
              style={styles.btnIngresar}
              mode="contained"
              title="Submit"
              onPress={() => {
                props.navigation.navigate('VerificarCuenta');
              }}
              /* onPress={() => {
                props.navigation.navigate('Main');
              }} */
            >
              Enviar
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerTeclado: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    top: 50,
  },
  texto: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 20,
    fontSize: 17,
  },
  inputEmailPass: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 15,
    height: 55,
    fontSize: 18,
    backgroundColor: '#e8e8e8',
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
  errorPass: {
    marginLeft: 20,
    color: '#af1a1a',
    top: -8,
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

export default connect(mapStateToProps, mapDispatchToProps)(OlvideContraseña);
