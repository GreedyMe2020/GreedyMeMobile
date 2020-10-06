import * as React from 'react';
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { signIn } from '../../../redux/actions/auth-actions';

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
      if (errorContraseña === '' && errorEmail === '') {
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

  if (props.auth.uid) {
    props.navigation.navigate('Main');
  }

  return (
    <View>
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
      <TextInput
        style={styles.inputEmailPass}
        mode="flat"
        label="Contraseña"
        required
        underlineColor="#76B39D"
        onBlur={() => {
          passValidator;
        }}
        value={password}
        onChangeText={handleChangePassword}
        secureTextEntry={true}
        error={errorContraseña}
      />
      <Text style={styles.errorPass}>{errorContraseña}</Text>

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
        <View style={styles.contenedorError}>
          <Text style={styles.errorPass}>{mensajeError}</Text>
          {props.authError ? (
            <Text style={styles.alerta}>
              Los datos ingresados son incorrectos
            </Text>
          ) : null}
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
    backgroundColor: '#e8e8e8',
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
