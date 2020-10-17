import * as React from 'react';
import { Button, TextInput, Snackbar, IconButton } from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import {
  signIn,
  resetearValoresInicioSesion,
} from '../../../redux/actions/auth-actions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../styles/colores';
import ButtonEj from '../button';

function IniciarSesionConEmail(props) {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const [errorEmail, setErrorEmail] = React.useState('');
  const [errorContraseña, setErrorContraseña] = React.useState('');

  //Estado para los errores de envio de los formularios
  const [mensajeError, setMensajeError] = React.useState('');

  //Variable que contiene un expresion regular de un email
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleChangeEmail = (email) => {
    setEmail(email);
  };
  const handleChangePassword = (password) => {
    setPassword(password);
  };

  //Para que funcione el ojito de mostrar contraseña
  const [hidePass, setHidePass] = React.useState(true);

  const handleSubmit = () => {
    if (
      email === '' ||
      password === '' ||
      email === null ||
      password === null
    ) {
      setMensajeError('Todos campos deben ser completados');
    } else {
      setMensajeError('');
      //Abro alerta
      if (errorContraseña === '' && errorEmail === '') {
        props.resetearValoresInicioSesion();
        props.signIn({
          email: email,
          contraseña: password,
        });
      }
    }
  };

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

  const passValidator = React.useEffect(() => {
    if (password === '') {
      setErrorContraseña('* Este campo no puede estar vacio');
    } else {
      setErrorContraseña('');
    }
  }, [password]);

  /*if (props.auth.uid) {
    props.navigation.navigate('Main');
  }*/

  return (
    <View>
      <TextInput
        style={styles.inputEmailPass}
        mode="flat"
        label="Email"
        required
        underlineColor={colors.celeste}
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
          required
          underlineColor={colors.celeste}
          onBlur={() => {
            passValidator;
          }}
          value={password}
          onChangeText={handleChangePassword}
          secureTextEntry={hidePass ? true : false}
          error={errorContraseña}
        />
        <Icon
          name={hidePass ? 'eye-slash' : 'eye'}
          size={20}
          color="grey"
          onPress={() => setHidePass(!hidePass)}
          style={styles.icon}
        />
      </View>
      <Text style={styles.errorPass}>{errorContraseña}</Text>
      <View style={styles.contOlvidePass}>
        <Text
          style={styles.olvideMiPass}
          onPress={() => {
            props.navigation.navigate('OlvideContraseña');
          }}
        >
          Olvidé mi contraseña
        </Text>
      </View>
      <View>
        <ButtonEj text="Ingresar" onPress={handleSubmit} />
        <View style={styles.contenedorError}>
          <Text style={styles.errorPass}>{mensajeError}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconSesion: {
    marginLeft: 20,
  },
  inputEmailPass: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 7,
    paddingLeft: 5,
    height: 55,
    fontSize: 18,
    backgroundColor: colors.grey,
  },
  contOlvidePass: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 5,
    marginRight: 22,
  },
  olvideMiPass: {
    top: -10,
    color: '#707070',
  },
  btnIngresar: {
    marginRight: 20,
    marginLeft: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alerta: {
    textAlign: 'center',
    color: '#af1a1a',
  },
  contenedorError: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    top: 12,
  },
  errorPass: {
    marginLeft: 20,
    color: '#af1a1a',
    top: -8,
  },
  contenedorSnack: {
    top: -50,
  },
  snackbar: {
    backgroundColor: '#333333',
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
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch(signIn(user)),
    resetearValoresInicioSesion: () => dispatch(resetearValoresInicioSesion()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IniciarSesionConEmail);
