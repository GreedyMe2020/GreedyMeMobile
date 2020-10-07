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
import { Button, TextInput, Snackbar } from 'react-native-paper';
import {
  cambiarContraseña,
  resetearValores,
} from '../../../redux/actions/user-actions';
import { connect } from 'react-redux';

function Registro(props) {
  //Estados para manejar los valores de los inputs
  const [password, setPassword] = React.useState(null);
  const [passwordNueva, setPasswordNueva] = React.useState(null);
  const [passwordRepetida, setPasswordRepetida] = React.useState(null);

  //Estados para manejar los errores de los inputs correspondientes
  const [errorContraseñaNueva, setErrorContraseñaNueva] = React.useState('');
  const [errorContraseñaRepe, setErrorContraseñaRepe] = React.useState('');
  const [esDistinta, setEsDistinta] = React.useState('');
  const [estanCompletos, setCompletos] = React.useState('');

  //Estado para abrir o cerrar el snackbar de confirmacion
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  //Expresion regular para comparar la contraseña (1 min, 1 may, 1 num, 8-16 caracteres, pueden usarse caract esp)
  const reg2 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordNueva === null || passwordNueva === '') {
      setCompletos('Todos los campos deben estar completos');
    } else {
      if (passwordRepetida === null || passwordRepetida === '') {
        setCompletos('Todos los campos deben estar completos');
      } else {
        setCompletos(null);
        if (
          passwordNueva === passwordRepetida &&
          errorContraseñaRepe === '' &&
          errorContraseñaNueva === ''
        ) {
          setEsDistinta(null);
          //Cambio la contraseña con firebase
          props.cambiarContraseña({
            email: props.profile.email,
            password: password,
            passwordNueva: passwordNueva,
          });
        } else {
          setEsDistinta('Ambos campos deben ser iguales');
        }
      }
    }
  };

  //Funciones para manejar el renderizado de los errores en base a lo que se escriba en pantalla y ciertas condiciones
  const passValidatorNueva = React.useEffect(() => {
    if (passwordNueva === '') {
      setErrorContraseñaNueva('* Este campo no puede estar vacio');
    } else {
      if (passwordNueva !== null) {
        if (reg2.test(passwordNueva) !== true) {
          setErrorContraseñaNueva(
            '* La contraseña debe tener entre 8 y 16 caracteres, una minúscula, una mayúscula y un caracter especial',
          );
        } else {
          setErrorContraseñaNueva('');
        }
      }
    }
  }, [passwordNueva]);

  const passValidatorRepetida = React.useEffect(() => {
    if (passwordRepetida === '') {
      setErrorContraseñaRepe('* Este campo no puede estar vacio');
    } else {
      setErrorContraseñaRepe('');
    }
  }, [passwordRepetida]);

  //Funcion para cerrar la confirmacion y use effect para mostrar la confirmacion
  const onDismissSnackBar = () => setVisible(false);
  const abrirMensajeConfirmacion = React.useEffect(() => {
    if (props.contra != null) {
      setVisible(true);
      props.resetearValores();
    }
  }, [props.contra]);
  //Funcion para cerrar el error y use effect para mostrar el error
  const onDismissSnackBar2 = () => setVisible2(false);
  const abrirMensajeError = React.useEffect(() => {
    if (props.contraError != null) {
      setVisible2(true);
      props.resetearValores();
    }
  }, [props.contraError]);

  return (
    <KeyboardAvoidingView
      style={styles.containerTeclado}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      enabled={Platform.OS === 'ios'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.inputPass}
              mode="flat"
              label="Contraseña actual"
              underlineColor="#76B39D"
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
            <TextInput
              style={styles.inputEmailPass}
              mode="flat"
              label="Nueva contraseña"
              underlineColor="#76B39D"
              onBlur={() => {
                passValidatorNueva;
              }}
              secureTextEntry={true}
              onChangeText={(text) => {
                setPasswordNueva(text);
              }}
              error={errorContraseñaNueva}
            />
            <Text style={styles.errorPass}>{errorContraseñaNueva}</Text>
            <TextInput
              style={styles.inputEmailPass}
              mode="flat"
              label="Repetir contraseña"
              underlineColor="#76B39D"
              onBlur={() => {
                passValidatorRepetida;
              }}
              secureTextEntry={true}
              onChangeText={(text) => {
                setPasswordRepetida(text);
              }}
              error={errorContraseñaRepe}
            />
            <Text style={styles.errorPass}>{errorContraseñaRepe}</Text>
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
            <View style={styles.contenedorError}>
              <Text style={styles.errorDistintos}>{esDistinta}</Text>
            </View>
            <View style={styles.contenedorError}>
              <Text style={styles.errorDistintos}>{estanCompletos}</Text>
            </View>
          </View>
          <View style={styles.contenedorSnack}>
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
              La contraseña se cambió correctamente.
            </Snackbar>
          </View>
          <View style={styles.contenedorSnack}>
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
              La contraseña actual es incorrecta.
            </Snackbar>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    top: 50,
    justifyContent: 'space-between',
  },
  containerTeclado: {
    flex: 1,
  },
  inputPass: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 25,
    height: 55,
    fontSize: 18,
    backgroundColor: '#e8e8e8',
    borderRadius: 3,
    paddingStart: 10,
  },
  inputEmailPass: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    height: 55,
    fontSize: 18,
    backgroundColor: '#e8e8e8',
    borderRadius: 3,
    paddingStart: 10,
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
  contenedorError: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  errorDistintos: {
    color: '#af1a1a',
    top: 25,
  },

  errorPass: {
    marginLeft: 20,
    color: '#af1a1a',
    top: -13,
  },
  contenedorSnack: {
    top: -50,
  },
  snackbar: {
    backgroundColor: 'green',
  },
  snackbar2: {
    backgroundColor: 'red',
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    contraError: state.user.contraError,
    contra: state.user.contra,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cambiarContraseña: (datos) => dispatch(cambiarContraseña(datos)),
    resetearValores: () => dispatch(resetearValores()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Registro);
