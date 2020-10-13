import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { Button, TextInput, Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';
import {
  signUp,
  resetearValoresCreacionUsuario,
} from '../../../redux/actions/auth-actions';
import Icon from 'react-native-vector-icons/FontAwesome5';

function Registro(props) {
  //Estados para cada uno de los inputs del formulario de registro
  const [nombre, setNombre] = React.useState(null);
  const [apellido, setApellido] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [repetido, setRepetido] = React.useState(null);

  //Estados para los errores de cada uno de los inputs del fomr de registro
  const [errorNombre, setErrorNombre] = React.useState('');
  const [errorApellido, setErrorApellido] = React.useState('');
  const [errorEmail, setErrorEmail] = React.useState('');
  const [errorContraseñaNueva, setErrorContraseñaNueva] = React.useState('');
  const [errorContraseñaRepe, setErrorContraseñaRepe] = React.useState('');
  //Estado para los errores de envio de los formularios
  const [mensajeError, setMensajeError] = React.useState('');
  //Estado para saber si las contraseñas son iguales
  const [esDistinta, setEsDistinta] = React.useState('');
  //Estado para abrir o cerrar el snackbar de confirmacion
  const [visible, setVisible] = React.useState(false);

  //Variable que contiene un expresion regular de un email
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  //RegExp para contraseña que se de mas de 8 digitos menos de 16, por lo menos una mayuscula, una minuscula y un numero
  const reg2 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;

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

  const handleChangePasswordRep = (passwordRep) => {
    setRepetido(passwordRep);
  };

  const handleSubmit = () => {
    if (
      nombre === '' ||
      apellido === '' ||
      email === '' ||
      password === '' ||
      repetido === '' ||
      nombre === null ||
      apellido === null ||
      email === null ||
      password === null ||
      repetido === null
    ) {
      setMensajeError('Todos campos deben ser completados');
    } else {
      setMensajeError('');
      if (
        password === repetido &&
        errorContraseñaNueva === '' &&
        errorContraseñaRepe === '' &&
        errorEmail === ''
      ) {
        setEsDistinta('');
        //Funcion para registrar nuevo usuario
        props.signUp({
          email: email,
          contraseña: password,
          nombre: nombre,
          apellido: apellido,
        });
      } else {
        setEsDistinta('Las contraseñas no son iguales');
      }
    }
  };

  //Funciones para manejar el renderizado de los errores individuales de cada input
  const nombreValidator = React.useEffect(() => {
    if (nombre === '') {
      setErrorNombre('* Este campo no puede estar vacio');
    } else {
      setErrorNombre('');
    }
  }, [nombre]);

  const apellidoValidator = React.useEffect(() => {
    if (apellido === '') {
      setErrorApellido('* Este campo no puede estar vacio');
    } else {
      setErrorApellido('');
    }
  }, [apellido]);

  const emailValidator = React.useEffect(() => {
    if (email === '') {
      setErrorEmail('* Este campo no puede estar vacio');
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

  const passValidatorNueva = React.useEffect(() => {
    if (password === '') {
      setErrorContraseñaNueva('* Este campo no puede estar vacio');
    } else {
      if (password !== null) {
        if (reg2.test(password) !== true) {
          setErrorContraseñaNueva(
            '* La contraseña debe tener entre 8 y 16 caracteres, una minúscula, una mayúscula y un caracter especial',
          );
        } else {
          setErrorContraseñaNueva('');
        }
      }
    }
  }, [password]);

  const passValidatorRepetida = React.useEffect(() => {
    if (repetido === '') {
      setErrorContraseñaRepe('* Este campo no puede estar vacio');
    } else {
      setErrorContraseñaRepe('');
    }
  }, [repetido]);

  //funcion para cerrar el mensaje de error y para mostrarlo
  const onDismissSnackBar = () => setVisible(false);
  const abrirMensajeConfirmacion = React.useEffect(() => {
    if (props.creacionError != null) {
      setMensajeError('El email ya está siendo utilizado');
      setVisible(true);
      props.resetearValoresCreacionUsuario();
    }
  }, [props.creacionError]);

  //Para que funcione el ojito de mostrar contraseña
  const [hidePass1, setHidePass1] = React.useState(true);
  const [hidePass2, setHidePass2] = React.useState(true);

  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={styles.containerTeclado}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        enabled={Platform.OS === 'ios'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <TextInput
              style={styles.inputEmailPass}
              mode="flat"
              label="Nombre"
              name="nombre"
              required
              underlineColor="#76B39D"
              value={nombre}
              onBlur={() => {
                nombreValidator;
              }}
              onChangeText={handleChangeNombre}
              error={errorNombre}
            />
            <Text style={styles.errorPass}>{errorNombre}</Text>

            <TextInput
              style={styles.inputEmailPass}
              mode="flat"
              label="Apellido"
              name="apellido"
              required
              underlineColor="#76B39D"
              onBlur={() => {
                apellidoValidator;
              }}
              value={apellido}
              onChangeText={handleChangeApellido}
              error={errorApellido}
            />
            <Text style={styles.errorPass}>{errorApellido}</Text>

            <TextInput
              style={styles.inputEmailPass}
              mode="flat"
              label="Email"
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
            <View>
              <TextInput
                style={styles.inputEmailPass}
                mode="flat"
                label="Contraseña"
                focus="true"
                required
                underlineColor="#76B39D"
                onBlur={() => {
                  passValidatorNueva;
                }}
                value={password}
                onChangeText={handleChangePassword}
                secureTextEntry={hidePass1 ? true : false}
                error={errorContraseñaNueva}
              />
              <Icon
                name={hidePass1 ? 'eye-slash' : 'eye'}
                size={15}
                color="grey"
                onPress={() => setHidePass1(!hidePass1)}
                style={styles.icon}
              />
              <Text style={styles.errorPass}>{errorContraseñaNueva}</Text>
            </View>
            <View>
              <TextInput
                style={styles.inputEmailPass}
                mode="flat"
                label="Repita la contraseña"
                required
                underlineColor="#76B39D"
                onBlur={() => {
                  passValidatorRepetida;
                }}
                value={repetido}
                secureTextEntry={hidePass2 ? true : false}
                onChangeText={handleChangePasswordRep}
                error={errorContraseñaRepe}
              />
              <Icon
                name={hidePass2 ? 'eye-slash' : 'eye'}
                size={15}
                color="grey"
                onPress={() => setHidePass2(!hidePass2)}
                style={styles.icon}
              />
              <Text style={styles.errorPass}>{errorContraseñaRepe}</Text>
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
                Registrarme
              </Button>
            </View>

            <View style={styles.contenedorError}>
              <Text style={styles.errorDistintos}>{esDistinta}</Text>
            </View>
            <View style={styles.contenedorError}>
              <Text style={styles.errorDistintos}>{mensajeError}</Text>
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
                El email ya esta siendo utilizado.
              </Snackbar>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 24,
  },
  containerTeclado: {
    flex: 1,
  },
  inputEmailPass: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 15,
    height: 55,
    fontSize: 18,
    backgroundColor: '#e8e8e8',
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
    top: 5,
  },
  btnIngresar: {
    marginRight: 20,
    marginLeft: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contenedorError: {
    justifyContent: 'flex-end',
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
    top: 120,
  },
  snackbar: {
    backgroundColor: 'red',
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
    creacionError: state.auth.creacionError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (nuevoUsuario) => dispatch(signUp(nuevoUsuario)),
    resetearValoresCreacionUsuario: () =>
      dispatch(resetearValoresCreacionUsuario()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registro);
