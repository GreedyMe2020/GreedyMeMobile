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

function VerificarCuenta(props) {
  const [codigoVerificacion, setCodigoVerificacion] = React.useState('');
  const [error, setError] = React.useState('');
  const [codigoEnviado, setCodigoEnviado] = React.useState(''); // este deberia ser el que se mando al mail

  const handleChangeCodigo = (codigoVerificacion) => {
    setCodigoVerificacion(codigoVerificacion);
  };

  /*  const handleSubmit = () => {
    props.signIn();
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
            Ingresá el codigo que enviamos a tu email para poder verificar tu
            cuenta.
          </Text>
          <TextInput
            style={styles.inputEmailPass}
            keyboardType="numeric"
            mode="flat"
            label="Código de verficiacion"
            name="nombre"
            required
            underlineColor="#76B39D"
            value={codigoVerificacion}
            onChangeText={handleChangeCodigo}
            error={error}
          />
          <Text style={styles.errorCodigo}>{error}</Text>
          {/*Aca deberia hacer que el boton solo se active si ingreso el codigo correcto*/}
          <View style={styles.contenedorBoton}>
            {codigoVerificacion === codigoEnviado ? (
              <Button
                disabled
                theme={{
                  colors: { primary: '#76B39D' },
                }}
                style={styles.btnIngresar}
                mode="contained"
                title="Submit"
                onPress={() => {
                  props.navigation.navigate('Main');
                }}
              >
                Ingresar
              </Button>
            ) : (
              <Button
                theme={{
                  colors: { primary: '#76B39D' },
                }}
                style={styles.btnIngresar}
                mode="contained"
                title="Submit"
                //onPress={handleSubmit}
              >
                Ingresar
              </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerificarCuenta);
