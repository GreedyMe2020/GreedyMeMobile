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
  ActivityIndicator,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { connect } from 'react-redux';
import { signIn } from '../../../redux/actions/auth-actions';
import IniciarSesionConEmail from './iniciar-con-email';
import IniciarSesionConRedes from './iniciar-con-redes';
import {
  setearLogeo,
  setearDesLogeo,
} from '../../../redux/actions/auth-actions';

function IniciarSesion(props) {
  if (props.deslogeo) {
    props.setearDesLogeo('False');
  }

  if (props.auth.uid) {
    props.navigation.navigate('Main');
  }
  return (
    <KeyboardAvoidingView
      style={styles.containerTeclado}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      enabled={Platform.OS === 'ios'}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss;
        }}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#ececec" />

          {props.logeo ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ActivityIndicator size="large" color="orange" />
              <Text></Text>
              <Text
                style={{
                  fontFamily: 'Roboto',
                  fontWeight: '500',
                }}
              >
                Ingresando...
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.titulo}>
                <Text style={styles.letraBlanca}>gre</Text>
                <Text style={styles.letraVerde}>edy</Text>
                <Text style={styles.letraNaranja}>me </Text>
              </View>
              <View style={styles.inputSesion}>
                <IniciarSesionConEmail navigation={props.navigation} />
              </View>
              <View style={styles.or}>
                <Divider style={styles.dividerIzq} />
                <Text style={styles.orcontent}>O</Text>
                <Divider style={styles.dividerDer} />
              </View>
              <View style={styles.ingresoConRedes}>
                <IniciarSesionConRedes navigation={props.navigation} />
              </View>
              <View style={styles.contenedorCrearCuenta}>
                <Text style={styles.textoPreguntaCuenta}>
                  ¿No tenés cuenta?
                </Text>
                <View>
                  <Text
                    style={styles.textoCrearCuenta}
                    onPress={() => {
                      props.navigation.navigate('Registro');
                    }}
                  >
                    Registrate acá
                  </Text>
                  <Divider
                    style={{
                      backgroundColor: '#F7941E',
                      height: 2,
                      marginLeft: 8,
                    }}
                  />
                </View>
              </View>
            </>
          )}
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
    fontSize: 45,
    letterSpacing: 5,
    fontFamily: 'Poppins-Regular',
  },
  letraVerde: {
    color: '#76B39D',
    fontSize: 45,
    letterSpacing: 5,
    fontFamily: 'Poppins-Regular',
  },
  letraNaranja: {
    color: '#F7941E',
    fontSize: 45,
    letterSpacing: 5,
    fontFamily: 'Poppins-SemiBold',
  },
  inputSesion: {
    flex: 1.5,
    width: '100%',
  },
  or: {
    flex: 0.5,
    top: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  orcontent: {
    width: 10,
  },
  dividerIzq: {
    width: '50%',
    height: 1,
    marginRight: 15,
  },
  dividerDer: {
    width: '50%',
    height: 1,
    marginLeft: 15,
  },
  ingresoConRedes: {
    flex: 0.5,
    minHeight: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    top: -10,
  },
  contenedorCrearCuenta: {
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 0.1,
  },

  textoPreguntaCuenta: {
    fontSize: 16,
  },
  textoCrearCuenta: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
    color: '#F7941E',
  },
  btnVolver: {
    marginTop: 20,
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
    logeo: state.auth.logeo,
    deslogeo: state.auth.deslogeo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch(signIn(user)),
    setearLogeo: (flag) => dispatch(setearLogeo(flag)),
    setearDesLogeo: (flag) => dispatch(setearDesLogeo(flag)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IniciarSesion);
