import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { colors } from '../../styles/colores';
import { format } from 'date-fns';
import { Rating, AirbnbRating } from 'react-native-elements';
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Dialog,
  Portal,
  Button,
  Title,
  Paragraph,
  Snackbar,
  Divider,
  TextInput,
} from 'react-native-paper';
import firebaseSecondary from '../../../firebase/config-secondary';
import {
  validaCupon,
  sumarGreedyPoints,
} from '../../../redux/actions/comercio-actions';

function Cupon(props) {
  //estados para manejar los dialog que se abren de la primer encuesta
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  //estado del mensaje de error
  const [mensajeError, setMensajeError] = React.useState(false);
  //estado que maneja el contenido del input de validacion
  const [codigo, setCodigo] = React.useState(null);
  //estado que donde se guardan la lista de codigos a validar
  const [listaCodigos, setListaCodigos] = React.useState([]);
  //estado para el rating pa
  const [rating, setRating] = React.useState(3);

  //funcion que maneja el rating (yo no manejo el rating, manejo un rolls royce)
  function ratingCompleted(rating) {
    setRating(rating);
  }
  //use effect que trae los codigos para validar
  React.useEffect(() => {
    const obtenerCodigos = async () => {
      const firestore = firebaseSecondary.firestore();
      try {
        const codigos = await firestore
          .collection('codigoCupon')
          .where('validado', '==', false)
          .get();
        const arrayCodigos = codigos.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListaCodigos(arrayCodigos);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCodigos();
  }, []);
  //funcion para cerrar el mensaje de error
  const onDismissSnackBar2 = () => setMensajeError(false);

  //funcion que asigna el valor del input de validacion en el estado cupon
  const handleChangeCodigo = (codigo) => {
    setCodigo(codigo);
  };
  //funcion que valida el codigo
  const handleSubmit = () => {
    let contador = 0;
    let idValidacion = null;
    listaCodigos.forEach((cod) => {
      if (cod.codigo === codigo && cod.idCupon === data.item.idBeneficio) {
        contador += 1;
        idValidacion = cod.id;
      }
    });
    if (contador > 0) {
      showDialog();
      //agregar para que se guarde em cupones usados.
      props.validaCupon(props.auth.uid, data.item.id, idValidacion);
    } else {
      setMensajeError(true);
    }
  };

  const { data } = props.route.params;
  return (
    <SafeAreaView style={styles.container}>
      {data !== null ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.content}>
              <View style={styles.card}>
                <View style={styles.contenido}>
                  <Image
                    style={styles.contImagen}
                    source={{
                      uri:
                        data.item.valueProveedor === 'Otro'
                          ? 'https://firebasestorage.googleapis.com/v0/b/greedyme-d6c6c.appspot.com/o/proveedores%2F1.jpg?alt=media&token=d186f078-7cfa-437c-9287-1bbfd9de8c00'
                          : data.item.valueProveedor === 'Todos'
                            ? 'https://firebasestorage.googleapis.com/v0/b/greedyme-d6c6c.appspot.com/o/proveedores%2F1.jpg?alt=media&token=d186f078-7cfa-437c-9287-1bbfd9de8c00'
                            : data.item.photoURL,
                    }}
                  />
                  <View style={styles.texto}>
                    <Title style={styles.titulo}>
                      {data.item.valueProveedor === 'Otro'
                        ? data.item.otroProveedor
                        : data.item.valueProveedor === 'Propio'
                          ? props.nombrecomercio
                          : data.item.valueProveedor === 'Todos'
                            ? data.item.valueProveedor + ' los Bancos'
                            : data.item.valueProveedor}
                    </Title>
                    <Title style={styles.beneficio}>
                      {data.item.valuePromo === 'Otro'
                        ? data.item.otraPromo
                        : data.item.tipoPromo === 'Descuento'
                          ? data.item.valuePromo + ' OFF'
                          : data.item.valuePromo}
                    </Title>
                    <Text style={styles.validez}>
                      {'Válido desde el ' +
                        format(data.item.desdeVigencia.toDate(), 'dd/MM/yyyy')}
                    </Text>
                    <Text style={styles.validez}>
                      {' hasta el ' +
                        format(data.item.hastaVigencia.toDate(), 'dd/MM/yyyy')}
                    </Text>
                    <Text style={styles.validez}>
                      {'en ' +
                        data.item.nombreComercio +
                        ', sucursal ' +
                        data.item.sucursal +
                        '.'}
                    </Text>
                  </View>
                  <View>
                    <View style={styles.textoSecundario}>
                      <Text style={styles.validez2}>
                        {'- Aplica: ' +
                          ((data.item.diaAplicacion.lunes ? 'Lunes ' : '') +
                            (data.item.diaAplicacion.martes ? 'Martes ' : '') +
                            (data.item.diaAplicacion.miercoles
                              ? 'Miercoles '
                              : '') +
                            (data.item.diaAplicacion.jueves ? 'Jueves ' : '') +
                            (data.item.diaAplicacion.viernes
                              ? 'Viernes '
                              : '') +
                            (data.item.diaAplicacion.sabado ? 'Sábado ' : '') +
                            (data.item.diaAplicacion.domingo
                              ? 'Domingo '
                              : '') +
                            (data.item.diaAplicacion.todoslosdias
                              ? 'Todos los días' + '.'
                              : ''))}
                      </Text>
                      <Text style={styles.validez2}>
                        {'- Medio de pago: ' + data.item.medioPago + '.'}
                      </Text>

                      {data.item.otroProveedor ? (
                        <Text style={styles.validez2}>
                          {'- Entidad crediticia: ' +
                            data.item.otroProveedor +
                            '.'}
                        </Text>
                      ) : null}

                      {data.item.descripcion ? (
                        <Text style={styles.validez2}>
                          {'- ' + data.item.descripcion + '.'}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                </View>

                <View style={styles.circulos}>
                  <View style={styles.contCirculo}>
                    <View style={styles.circulo} />
                  </View>
                  <Divider
                    style={{
                      backgroundColor: colors.grey,
                      height: 2,
                      marginLeft: 45,
                      marginRight: 45,
                      marginTop: 25,
                    }}
                  />
                  <View style={styles.contCirculo2}>
                    <View style={styles.circuloEnd} />
                  </View>
                </View>
                <View style={styles.contenedorBoton}>
                  <View style={styles.contValidar}>
                    <Text style={styles.validarT}>
                      Validá tu cupón y sumá GreedyPoints:
                    </Text>
                    <TextInput
                      style={styles.inputCodigoVal}
                      mode="flat"
                      label="Ingresá tu código"
                      required
                      underlineColor={colors.naranja}
                      //onBlur={() => {
                      //codigoValidator;
                      //}}
                      onChangeText={handleChangeCodigo}
                      //error={errorCupon}
                      value={codigo}
                    />
                    {/* <Text style={styles.errorVal}>{errorCupon}</Text> */}
                  </View>
                  <Button
                    mode="outlined"
                    onPress={handleSubmit}
                    style={styles.botonGuardar}
                    labelStyle={{ fontSize: 20, color: colors.white }}
                  >
                    Validar
                  </Button>
                </View>

                <Portal>
                  <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Validar cupón</Dialog.Title>
                    <Dialog.Content style={{ marginBottom: -10 }}>
                      <Paragraph style={{ fontSize: 17 }}>
                        {'Contános como fue tu experiencia de compra en ' +
                          data.item.nombreComercio +
                          ' para finalizar la validación y sumar tus GreedyPoints.'}
                      </Paragraph>
                      <AirbnbRating
                        count={5}
                        defaultRating={3}
                        onFinishRating={ratingCompleted}
                        reviews={[
                          'Mala',
                          'Regular',
                          'Buena',
                          'Muy Buena',
                          'Excelente',
                        ]}
                      />
                    </Dialog.Content>
                    <Dialog.Actions style={{ marginRight: 8 }}>
                      <Button
                        onPress={() => {
                          props.sumarGreedyPoints(
                            props.auth.uid,
                            data.item.idComercio,
                            rating,
                          );
                          props.navigation.navigate('ValidacionGreedyPoints1', {
                            data: data,
                          });
                          setVisible(false);
                        }}
                        style={{ fontSize: 17 }}
                      >
                        Validar
                      </Button>
                    </Dialog.Actions>
                  </Dialog>
                </Portal>
              </View>
            </View>
          </ScrollView>
          <View>
            {mensajeError ? (
              <Snackbar
                visible={mensajeError}
                onDismiss={onDismissSnackBar2}
                theme={{ colors: { accent: 'white' } }}
                action={{
                  label: 'OK',
                  onPress: () => {
                    onDismissSnackBar2;
                  },
                }}
                style={styles.snackbar2}
              >
                Código inválido, ingrésalo nuevamente.
              </Snackbar>
            ) : null}
          </View>
        </KeyboardAvoidingView>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.avatar,
  },
  content: {
    backgroundColor: colors.avatar,
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 5,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 25,
    flex: 1,
    alignContent: 'center',
    elevation: 1,
  },
  circulos: {
    marginTop: 18,
  },
  contCirculo: {
    position: 'absolute',
    justifyContent: 'center',
  },
  circulo: {
    height: 50,
    width: 50,
    backgroundColor: colors.avatar,
    borderRadius: 100,
    marginLeft: -25,
  },
  contCirculo2: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  circuloEnd: {
    height: 50,
    width: 50,
    backgroundColor: colors.avatar,
    borderRadius: 100,
    marginRight: -25,
  },
  contenido: {
    flexDirection: 'column',
    alignContent: 'center',
    marginTop: 30,
  },
  contImagen: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    height: 125,
    width: 125,
    borderRadius: 5,
  },
  divider: {
    width: 2,
    backgroundColor: colors.naranja,
  },
  texto: {
    alignItems: 'center',
    marginTop: 20,
  },
  titulo: {
    marginBottom: 10,
    fontSize: 25,
  },
  beneficio: {
    color: colors.naranja,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 15,
    fontSize: 28,
  },
  validez: {
    color: colors.black,
    marginBottom: 3,
    fontSize: 16,
    textAlign: 'center',
    paddingLeft: 2,
    paddingRight: 2,
  },
  validez1: {
    color: colors.darkGrey,
    marginTop: 15,
    marginBottom: -15,
    marginRight: 20,
    marginLeft: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  validez2: {
    color: colors.black,
    marginBottom: 3,
    fontSize: 16,
    marginRight: 39,
  },
  textoSecundario: {
    marginTop: 20,
    alignContent: 'center',
    marginLeft: 20,
  },
  contenedorBoton: {
    marginTop: 35,
    marginBottom: 25,
  },
  contValidar: {
    color: colors.black,
    marginBottom: 3,
    marginLeft: 26,
    marginRight: 26,
  },
  validarT: {
    color: colors.black,
    fontSize: 16,
    alignSelf: 'center',
  },
  botonGuardar: {
    backgroundColor: colors.naranja,
    marginTop: 10,
    marginLeft: 26,
    marginRight: 26,
  },
  inputCodigoVal: {
    marginBottom: 7,
    marginTop: 7,
    height: 55,
    fontSize: 18,
    backgroundColor: colors.avatar,
  },
  errorVal: {
    color: '#af1a1a',
    top: -8,
  },
  snackbar2: {
    alignSelf: 'flex-end',
    backgroundColor: colors.error,
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
    validaCupon: (idUsuario, idCupon, idValidacion) =>
      dispatch(validaCupon(idUsuario, idCupon, idValidacion)),
    sumarGreedyPoints: (idUsuarioConsumidor, idUsuarioComercio, rating) =>
      dispatch(
        sumarGreedyPoints(idUsuarioConsumidor, idUsuarioComercio, rating),
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cupon);
