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
import { connect } from 'react-redux';
import { editarDatos } from '../../../redux/actions/user-actions';
import { colors } from '../../styles/colores';
import ButtonEj from '../button';

/* Función para validar que Nombre y Apellido no tengan números */
function Validate(expression) {
  var rgularExp = {
    containsNumber: /\d+/,
  };
  return rgularExp.containsNumber.test(expression);
}

function MisDatos(props) {
  const [nombre, setNombre] = React.useState(props.profile.nombre);
  const [apellido, setApellido] = React.useState(props.profile.apellido);
  const [email, setEmail] = React.useState(props.profile.email);
  const [password, setPassword] = React.useState('***********');
  const [mensajeError, setMensajeError] = React.useState('');

  //Estado para abrir o cerrar el snackbar de confirmacion
  const [visible, setVisible] = React.useState(false);

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
  const handleSubmit = () => {
    if (nombre === '' || apellido === '') {
      setMensajeError('Ambos campos deben ser completados');
    } else if (Validate(nombre) === true || Validate(apellido) === true) {
      setMensajeError(
        'Los campos Nombre y Apellido no pueden contener números',
      );
    } else if (props.auth.emailVerified === false) {
      setMensajeError('Debe verificar el email para modificar sus datos');
    } else {
      setMensajeError('');
      props.editarDatos({
        id: props.auth.uid,
        nombre: nombre,
        apellido: apellido,
      });
      //Abro la confirmacion del cambio de contraseña
      setVisible(true);
    }
  };

  //Funcion para cerrar la confirmacion del cambio de contraseña
  const onDismissSnackBar = () => setVisible(false);

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
              style={styles.inputEmailPass}
              mode="flat"
              label="Nombre"
              name="nombre"
              required
              underlineColor={colors.celeste}
              value={nombre}
              onChangeText={handleChangeNombre}
              validators={['required']}
              errorMessages={['*Este campo es obligatorio']}
            />
            <TextInput
              style={styles.inputEmailPass}
              mode="flat"
              label="Apellido"
              name="apellido"
              required
              underlineColor={colors.celeste}
              value={apellido}
              onChangeText={handleChangeApellido}
              validators={['required']}
              errorMessages={['* Este campo es obligatorio']}
            />
            <TextInput
              style={styles.inputEmailPass}
              mode="flat"
              label="Email"
              required
              disabled
              underlineColor={colors.celeste}
              value={email}
              onChangeText={handleChangeEmail}
              validators={['required']}
              errorMessages={['* Este campo es obligatorio']}
            />
            <TextInput
              style={styles.inputEmailPass}
              mode="flat"
              label="Contraseña"
              required
              disabled
              underlineColor={colors.celeste}
              value={password}
              onChangeText={handleChangePassword}
              validators={['required']}
              errorMessages={['* Este campo es obligatorio']}
            />
            <View style={styles.contOlvidePass}>
              <Text style={styles.emailVerificado}>
                {props.auth.emailVerified === false
                  ? 'E-mail sin verificar'
                  : props.auth.emailVerified === true
                  ? 'E-mail verificado'
                  : null}
              </Text>
              <Text
                style={styles.olvideMiPass}
                onPress={() => {
                  props.navigation.navigate('CambiarContraseña');
                }}
              >
                Cambiar mi contraseña
              </Text>
            </View>
            <View style={styles.contenedorBoton}>
              <ButtonEj text="Guardar datos" onPress={handleSubmit} />
            </View>
            <View style={styles.contenedorError}>
              <Text style={styles.errorDistintos}>{mensajeError}</Text>
            </View>
          </View>

          <View style={styles.contenedorSnack}>
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
              Los datos se cambiaron correctamente.
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
  inputEmailPass: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 15,
    height: 55,
    fontSize: 18,
    backgroundColor: colors.grey,
  },
  contOlvidePass: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 22,
    marginLeft: 22,
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
  contenedorError: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  errorDistintos: {
    color: colors.error,
    top: 25,
  },
  contenedorSnack: {
    top: -50,
  },
  snackbar: {
    backgroundColor: colors.alertGrey,
  },
  emailVerificado: {
    color: colors.celeste,
    fontSize: 15,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editarDatos: (datos) => dispatch(editarDatos(datos)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MisDatos);
