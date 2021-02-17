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
} from 'react-native';
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
  if (props.auth.uid) {
    //POR SI SE ROMPE ALGUN INICIO DE SESION ES ESTO
    //props.navigation.navigate('Main');
  }
  if (props.usuarioNuevo) {
    props.navigation.navigate('Settings');
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
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      enabled={Platform.OS === 'ios'}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
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
          </>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    display: 'flex',
    width: '100%',
  },
  containerTeclado: {
    flex: 1,
  },
  titulo: {
    flex: 1.7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    width: '100%',
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
    flex: 2,
    width: '100%',
    backgroundColor: colors.white,
  },
  or: {
    flex: 0.5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  orcontent: {
    width: 10,
  },
  dividerIzq: {
    width: '40%',
    height: 1,
    marginRight: 10,
    marginLeft: 10,
  },
  dividerDer: {
    width: '40%',
    height: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  ingresoConRedes: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  contenedorCrearCuenta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 0.5,
    backgroundColor: colors.white,
    paddingBottom: 8,
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
  snackbar: {
    backgroundColor: colors.error,
  },
});

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    logeo: state.auth.logeo,
    deslogeo: state.auth.deslogeo,
    usuarioNuevo: state.auth.usuarioNuevo,
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
