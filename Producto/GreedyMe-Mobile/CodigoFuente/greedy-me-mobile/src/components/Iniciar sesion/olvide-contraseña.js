import * as React from 'react';
import { Button, TextInput, Snackbar } from 'react-native-paper';
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
import {
  forgotPass,
  resetearValores,
} from '../../../redux/actions/auth-actions';

function OlvideContraseña(props) {
  //Estados para manejar los datos del email y la validacion del mismo
  const [email, setEmail] = React.useState(null);
  const [errorEmail, setErrorEmail] = React.useState('');

  //Estado para abrir o cerrar el snackbar de confirmacion
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);

  const handleChangeEmail = (email) => {
    setEmail(email);
  };

  const handleSubmit = () => {
    if (email === '' || email === null) {
      setErrorEmail('Todos campos deben ser completados');
    } else {
      setErrorEmail('');
      props.forgotPass(email);
    }
  };

  //Funcion para cerrar la confirmacion y use effect para mostrar la confirmacion
  const onDismissSnackBar = () => setVisible(false);
  const abrirMensajeConfirmacion = React.useEffect(() => {
    if (props.mandoMail != null) {
      setVisible(true);
      props.resetearValores();
    }
  }, [props.mandoMail]);

  //Funcion para cerrar el error y use effect para mostrar el error
  const onDismissSnackBar2 = () => setVisible2(false);
  React.useEffect(() => {
    if (props.mailError != null) {
      setVisible2(true);
      props.resetearValores();
    }
  }, [props.mailError]);

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
          <View>
            <Text style={styles.texto}>
              Ingresá tu email y te enviaremos un mail con una nueva contraseña,
              luego podrás cambiarla desde el perfil.
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
                onPress={handleSubmit}
              >
                Enviar
              </Button>
            </View>
          </View>
          <View style={styles.contenedorSnack}>
            {visible ? (
              <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                  label: 'Cerrar',
                  onPress: () => {
                    onDismissSnackBar;
                  },
                }}
                style={styles.snackbar}
              >
                <Text style={styles.alerta}>
                  {props.mailError ? 'Email invalido' : null}
                </Text>
                Correo enviado.
              </Snackbar>
            ) : (
              ''
            )}
            {visible2 ? (
              <Snackbar
                visible={visible2}
                onDismiss={onDismissSnackBar2}
                action={{
                  label: 'Cerrar',
                  onPress: () => {
                    onDismissSnackBar2;
                  },
                }}
                style={styles.snackbar2}
              >
                El mail es invalido.
              </Snackbar>
            ) : (
              ''
            )}
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
    justifyContent: 'space-between',
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
  alerta: {
    textAlign: 'center',
    color: '#af1a1a',
  },
  contenedorSnack: {
    top: -50,
  },
  snackbar: {
    backgroundColor: 'green',
  },
  snackbar2: {
    backgroundColor: '#801010',
  },
});

const mapStateToProps = (state) => {
  return {
    mailError: state.auth.mailError,
    mandoMail: state.auth.mandoMail,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPass: (email) => dispatch(forgotPass(email)),
    resetearValores: () => dispatch(resetearValores()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OlvideContraseña);
