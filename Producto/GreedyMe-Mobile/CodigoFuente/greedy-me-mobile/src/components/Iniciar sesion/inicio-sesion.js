import * as React from 'react';
import { Divider } from 'react-native-paper';
import {
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  StyleSheet,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { connect } from 'react-redux';
import { signIn } from '../../../redux/actions/auth-actions';
import IniciarSesionConEmail from './iniciar-con-email';
import IniciarSesionConRedes from './iniciar-con-redes';

function IniciarSesion(props) {
  return (
    <KeyboardAvoidingView
      style={styles.containerTeclado}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      enabled={Platform.OS === 'ios'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#e1e1e1" />
          <View style={styles.titulo}>
            <Text style={styles.letraBlanca}>gre</Text>
            <Text style={styles.letraVerde}>edy</Text>
            <Text style={styles.letraNaranja}>me </Text>
          </View>
          <View style={styles.inputSesion}>
            <IniciarSesionConEmail />
          </View>
          <View style={styles.ingresoConRedes}>
            <IniciarSesionConRedes />
          </View>
          <View>
            <Text style={styles.textoCrearCuenta}>Crear nueva cuenta</Text>
            <Divider
              style={{ backgroundColor: '#F7941E', height: 2, bottom: 13 }}
            />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  containerTeclado: {
    flex: 1,
  },
  titulo: {
    flexDirection: 'row',
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15, //igual este no deberia estar nose porque no lo centra
  },
  letraBlanca: {
    color: '#1E1B4D',
    fontSize: 60,
    letterSpacing: 10,
  },
  letraVerde: {
    color: '#76B39D',
    fontSize: 60,
    letterSpacing: 10,
  },
  letraNaranja: {
    color: '#F7941E',
    fontSize: 60,
    letterSpacing: 10,
  },
  inputSesion: {
    flex: 2,
    width: '100%',
  },
  ingresoConRedes: {
    flex: 1.3,
    minHeight: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    top: -10,
  },
  textoCrearCuenta: {
    bottom: 15,
    fontSize: 16,
    width: '100%',
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

export default connect(mapStateToProps, mapDispatchToProps)(IniciarSesion);