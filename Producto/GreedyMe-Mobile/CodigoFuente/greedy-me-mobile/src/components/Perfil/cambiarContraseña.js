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
import { TextInput, Snackbar } from 'react-native-paper';
import {
  cambiarContraseña,
  resetearValores,
} from '../../../redux/actions/user-actions';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../styles/colores';
import ButtonEj from '../button';

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

  //Para que funcione el ojito de mostrar contraseña
  const [hidePass, setHidePass] = React.useState(true);
  const [hidePass2, setHidePass2] = React.useState(true);
  const [hidePass3, setHidePass3] = React.useState(true);

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
            <View>
              <TextInput
                style={styles.inputPass}
                mode="flat"
                label="Contraseña actual"
                underlineColor={colors.celeste}
                value={password}
                secureTextEntry={hidePass ? true : false}
                onChangeText={(text) => {
                  setPassword(text);
                }}
              />
              <Icon
                name={hidePass ? 'eye-slash' : 'eye'}
                size={15}
                color="grey"
                onPress={() => setHidePass(!hidePass)}
                style={styles.icon}
              />
            </View>
            <View>
              <TextInput
                style={styles.inputEmailPass}
                mode="flat"
                label="Nueva contraseña"
                underlineColor={colors.celeste}
                onBlur={() => {
                  passValidatorNueva;
                }}
                secureTextEntry={hidePass2 ? true : false}
                onChangeText={(text) => {
                  setPasswordNueva(text);
                }}
                error={errorContraseñaNueva}
              />
              <Icon
                name={hidePass2 ? 'eye-slash' : 'eye'}
                size={15}
                color="grey"
                onPress={() => setHidePass2(!hidePass2)}
                style={styles.icon}
              />
              <Text style={styles.errorPass}>{errorContraseñaNueva}</Text>
            </View>
            <View>
              <TextInput
                style={styles.inputEmailPass}
                mode="flat"
                label="Repetir contraseña"
                underlineColor={colors.celeste}
                onBlur={() => {
                  passValidatorRepetida;
                }}
                secureTextEntry={hidePass3 ? true : false}
                onChangeText={(text) => {
                  setPasswordRepetida(text);
                }}
                error={errorContraseñaRepe}
              />
              <Icon
                name={hidePass3 ? 'eye-slash' : 'eye'}
                size={15}
                color="grey"
                onPress={() => setHidePass3(!hidePass3)}
                style={styles.icon}
              />
              <Text style={styles.errorPass}>{errorContraseñaRepe}</Text>
            </View>

            <View style={styles.contenedorBoton}>
              <ButtonEj text="Guardar datos" onPress={handleSubmit} />
            </View>
            <View style={styles.contenedorError}>
              <Text style={styles.errorDistintos}>{esDistinta}</Text>
            </View>
            <View style={styles.contenedorError}>
              <Text style={styles.errorDistintos}>{estanCompletos}</Text>
            </View>
          </View>
          <View style={styles.contenedorSnack}>
            {visible ? (
              <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                theme={{ colors: { accent: '#76B39D' } }}
                action={{
                  label: 'OK',
                  onPress: () => {
                    onDismissSnackBar;
                  },
                }}
                style={styles.snackbar}
              >
                La contraseña se cambió correctamente.
              </Snackbar>
            ) : null}
            {visible2 ? (
              <Snackbar
                visible={visible2}
                onDismiss={onDismissSnackBar2}
                theme={{ colors: { accent: 'white' } }}
                action={{
                  label: 'OK',
                  onPress: () => {
                    onDismissSnackBar2;
                  },
                }}
                style={styles.snackbar2}
              >
                La contraseña actual es incorrecta.
              </Snackbar>
            ) : null}
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
    backgroundColor: colors.grey,
    borderRadius: 3,
    paddingStart: 10,
  },
  inputEmailPass: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    height: 55,
    fontSize: 18,
    backgroundColor: colors.grey,
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
    color: colors.error,
    top: 25,
  },
  errorPass: {
    marginLeft: 20,
    color: colors.error,
    top: -10,
  },
  contenedorSnack: {
    top: -50,
  },
  contenedorSnack2: {
    top: 130,
  },
  snackbar: {
    backgroundColor: colors.alertGrey,
  },
  snackbar2: {
    backgroundColor: colors.error,
  },
  icon: {
    position: 'absolute',
    marginRight: 18,
    marginTop: 18,
    fontSize: 18,
    right: 20,
    backgroundColor: '#e8e8e8',
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
