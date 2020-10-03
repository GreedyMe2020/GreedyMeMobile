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
import { Form, TextValidator } from 'react-native-validator-form';
import { Button, TextInput } from 'react-native-paper';

function Registro(props) {
  const [password, setPassword] = React.useState(null);
  const [passwordNueva, setPasswordNueva] = React.useState(null);
  const [passwordRepetida, setPasswordRepetida] = React.useState(null);
  const [errorContraseñaNueva, setErrorContraseñaNueva] = React.useState('');
  const [errorContraseñaRepe, setErrorContraseñaRepe] = React.useState('');
  const [esDistinta, setEsDistinta] = React.useState('');
  const [estanCompletos, setCompletos] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordNueva === null || passwordNueva === '') {
      setCompletos('Todos los campos deben estar completos');
    } else {
      if (passwordRepetida === null || passwordRepetida === '') {
        setCompletos('Todos los campos deben estar completos');
      } else {
        setCompletos(null);
        if (passwordNueva === passwordRepetida) {
          setEsDistinta(null);
        } else {
          setEsDistinta('Ambos campos deben ser iguales');
        }
      }
    }
  };

  const passValidatorNueva = React.useEffect(() => {
    if (passwordNueva === '') {
      setErrorContraseñaNueva('* Este campo no puede estar vacio');
    } else {
      setErrorContraseñaNueva('');
    }
  }, [passwordNueva]);

  const passValidatorRepetida = React.useEffect(() => {
    if (passwordRepetida === '') {
      setErrorContraseñaRepe('* Este campo no puede estar vacio');
    } else {
      setErrorContraseñaRepe('');
    }
  }, [passwordRepetida]);

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
            style={styles.inputPass}
            mode="flat"
            label="Contraseña actual"
            underlineColor="#76B39D"
            disabled
            value={password}
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
    top: -5,
  },
});

export default Registro;
