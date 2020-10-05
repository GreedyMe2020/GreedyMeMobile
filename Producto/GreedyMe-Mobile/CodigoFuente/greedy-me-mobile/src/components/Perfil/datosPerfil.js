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
import { Button, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import { editarDatos } from '../../../redux/actions/user-actions';

function MisDatos(props) {
  const [nombre, setNombre] = React.useState(props.profile.nombre);
  const [apellido, setApellido] = React.useState(props.profile.apellido);
  const [email, setEmail] = React.useState(props.profile.email);
  const [password, setPassword] = React.useState('***********');
  const [mensajeError, setMensajeError] = React.useState('');

  const handleChangeNombre = (nombre) => {
    setNombre(nombre);
    console.log(nombre);
  };
  const handleChangeApellido = (apellido) => {
    setApellido(apellido);
    console.log(apellido);
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
    } else {
      setMensajeError('');
      props.editarDatos({
        id: props.auth.uid,
        nombre: nombre,
        apellido: apellido,
      });
    }
  };

  return (
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
            underlineColor="#76B39D"
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
            underlineColor="#76B39D"
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
            underlineColor="#76B39D"
            value={password}
            onChangeText={handleChangePassword}
            validators={['required']}
            errorMessages={['* Este campo es obligatorio']}
          />
          <View style={styles.contOlvidePass}>
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
            <Text style={styles.errorDistintos}>{mensajeError}</Text>
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