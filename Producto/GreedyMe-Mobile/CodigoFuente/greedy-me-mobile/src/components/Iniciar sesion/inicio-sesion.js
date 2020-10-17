import * as React from 'react';
import { Divider, Snackbar } from 'react-native-paper';
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
  ScrollView,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { connect } from 'react-redux';
import { signIn } from '../../../redux/actions/auth-actions';
import IniciarSesionConEmail from './iniciar-con-email';
import IniciarSesionConRedes from './iniciar-con-redes';
import {
  setearLogeo,
  setearDesLogeo,
  resetearValoresInicioSesion,
} from '../../../redux/actions/auth-actions';
import { colors } from '../../styles/colores';

function IniciarSesion(props) {
  if (props.deslogeo) {
    props.setearDesLogeo('False');
  }

  if (props.auth.uid) {
    props.navigation.navigate('Main');
  }

  //Estado para abrir o cerrar el snackbar de confirmacion
  const [visible, setVisible] = React.useState(false);

  //Funcion para cerrar la confirmacion del cambio de contraseña
  const onDismissSnackBar = () => setVisible(false);
  React.useEffect(() => {
    if (props.authError != null) {
      setVisible(true);
    }
  }, [props.authError]);

  return (
    <KeyboardAvoidingView
      style={styles.containerTeclado}
      behavior={Platform.OS === 'ios' ? '' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      enabled={Platform.OS === 'ios'}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss;
        }}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#ececec" />
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
                Cargando...
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
                <IniciarSesionConEmail
                  navigation={props.navigation}
                  setVisible={setVisible}
                />
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
                {visible ? (
                  <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    theme={{ colors: { accent: 'white' } }}
                    action={{
                      label: 'OK',
                      onPress: () => {
                        onDismissSnackBar;
                      },
                    }}
                    style={styles.snackbar}
                  >
                    Los datos ingresados son incorrectos.
                  </Snackbar>
                ) : null}
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
    color: colors.azul,
    fontSize: 45,
    letterSpacing: 5,
    fontFamily: 'Poppins-Regular',
  },
  letraVerde: {
    color: colors.celeste,
    fontSize: 45,
    letterSpacing: 5,
    fontFamily: 'Poppins-Regular',
  },
  letraNaranja: {
    color: colors.naranja,
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
    minHeight: 120,
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
    flex: 0.2,
  },
  contenedorSnackTodo: {
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
    color: colors.naranja,
  },
  btnVolver: {
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contenedorSnack: {
    width: 50,
    height: 100,
    flex: 1,
  },
  snackbar: {
    backgroundColor: colors.error,
    top: 10,
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
    resetearValoresInicioSesion: () => dispatch(resetearValoresInicioSesion()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IniciarSesion);
