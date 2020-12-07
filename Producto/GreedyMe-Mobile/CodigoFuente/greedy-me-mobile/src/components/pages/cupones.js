import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Avatar,
  IconButton,
  Button,
  Card,
  List,
  Title,
  Paragraph,
  Divider,
  TextInput,
} from 'react-native-paper';
import { connect } from 'react-redux';
import _ from 'lodash';
import { colors } from '../../styles/colores';
import firebaseapp from '../../../firebase/config';
import { format } from 'date-fns';

//Variable que contiene un codigo de prueba para comparar con el del input del cupon
const CODIGO_VALIDAR = 'ABCDEF';

function Cupones(props) {
  //estado de cupones
  const [cupones, setCupones] = React.useState(null);
  //estado que contiene el mensaje de error en la validacion del cupon
  const [errorCupon, setErrorCupon] = React.useState('');
  //estado que maneja el contenido del input de validacion
  const [codigo, setCodigo] = React.useState(null);
  //use effect que se ejecuta una vez y trae cupones
  React.useEffect(() => {
    const obtenerCupones = async () => {
      const firestore = firebaseapp.firestore();
      try {
        const cupones = await firestore
          .collection('usuarioConsumidor')
          .doc(props.auth.uid)
          .collection('cupones')
          .get();
        const arrayCupones = cupones.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCupones(arrayCupones);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCupones();
  }, []);

  //funcion que asigna el valor del input de validacion en el estado cupon
  const handleChangeCodigo = (codigo) => {
    setCodigo(codigo);
  };

  //funcion para mostrar el error en el input del codigo
  const codigoValidator = React.useEffect(() => {
    if (codigo === null || codigo === CODIGO_VALIDAR) {
      setErrorCupon('');
    } else {
      if (codigo !== CODIGO_VALIDAR) {
        setErrorCupon('* Este campo no es correcto');
      }
    }
  }, [codigo]);

  return (
    <SafeAreaView style={styles.container}>
      {cupones !== null ? (
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.content}>
            <View style={styles.card}>
              <View style={styles.contenido}>
                <Image
                  style={styles.contImagen}
                  source={{
                    uri:
                      cupones[0].tipoProveedor === 'Propias'
                        ? props.fotocomercio
                        : cupones[0].valueProveedor === 'Otro'
                        ? 'https://firebasestorage.googleapis.com/v0/b/greedyme-d6c6c.appspot.com/o/proveedores%2F1.jpg?alt=media&token=d186f078-7cfa-437c-9287-1bbfd9de8c00'
                        : cupones[0].valueProveedor === 'Todos'
                        ? 'https://firebasestorage.googleapis.com/v0/b/greedyme-d6c6c.appspot.com/o/proveedores%2F1.jpg?alt=media&token=d186f078-7cfa-437c-9287-1bbfd9de8c00'
                        : cupones[0].photoURL,
                  }}
                />
                <View style={styles.texto}>
                  <Title style={styles.titulo}>
                    {cupones[0].valueProveedor === 'Otro'
                      ? cupones[0].otroProveedor
                      : cupones[0].valueProveedor === 'Propio'
                      ? props.nombrecomercio
                      : cupones[0].valueProveedor === 'Todos'
                      ? cupones[0].valueProveedor + ' los Bancos'
                      : cupones[0].valueProveedor}
                  </Title>
                  <Title style={styles.beneficio}>
                    {cupones[0].valuePromo === 'Otro'
                      ? cupones[0].otraPromo
                      : cupones[0].tipoPromo === 'Descuento'
                      ? cupones[0].valuePromo + ' OFF'
                      : cupones[0].valuePromo}
                  </Title>
                  <Text style={styles.validez}>
                    {'Válido desde el ' +
                      format(cupones[0].desdeVigencia.toDate(), 'dd/MM/yyyy')}
                  </Text>
                  <Text style={styles.validez}>
                    {' hasta el ' +
                      format(cupones[0].hastaVigencia.toDate(), 'dd/MM/yyyy')}
                  </Text>
                  <Text style={styles.validez}>
                    {'en ' +
                      cupones[0].comercio +
                      ', sucursal ' +
                      cupones[0].sucursal +
                      '.'}
                  </Text>
                </View>
                <View>
                  <View style={styles.textoSecundario}>
                    <Text style={styles.validez2}>
                      {'- Aplica: ' +
                        ((cupones[0].diaAplicacion.lunes ? 'Lunes ' : '') +
                          (cupones[0].diaAplicacion.martes ? 'Martes ' : '') +
                          (cupones[0].diaAplicacion.miercoles
                            ? 'Miercoles '
                            : '') +
                          (cupones[0].diaAplicacion.jueves ? 'Jueves ' : '') +
                          (cupones[0].diaAplicacion.viernes ? 'Viernes ' : '') +
                          (cupones[0].diaAplicacion.sabado ? 'Sábado ' : '') +
                          (cupones[0].diaAplicacion.domingo ? 'Domingo ' : '') +
                          (cupones[0].diaAplicacion.todoslosdias
                            ? 'Todos los días' + '.'
                            : ''))}
                    </Text>
                    <Text style={styles.validez2}>
                      {'- Medio de pago: ' + cupones[0].medioPago + '.'}
                    </Text>

                    {cupones[0].otroProveedor ? (
                      <Text style={styles.validez2}>
                        {'- Entidad crediticia: ' +
                          cupones[0].otroProveedor +
                          '.'}
                      </Text>
                    ) : null}

                    <Text style={styles.validez2}>
                      {cupones[0].descripcion
                        ? cupones[0].descripcion + '.'
                        : ''}
                    </Text>
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
                <View style={styles.textoSecundario}>
                  <Text style={styles.validez2}>
                    Validá tu cupón y sumá GreedyPoints:
                  </Text>
                  <TextInput
                    style={styles.inputCodigoVal}
                    mode="flat"
                    label="Ingresá tu código"
                    required
                    underlineColor={colors.celeste}
                    onBlur={() => {
                      codigoValidator;
                    }}
                    onChangeText={handleChangeCodigo}
                    error={errorCupon}
                    value={codigo}
                  />
                  <Text style={styles.errorVal}>{errorCupon}</Text>
                </View>
                <Button
                  icon="coin"
                  mode="outlined"
                  style={styles.botonGuardar}
                  labelStyle={{ fontSize: 20, color: colors.white }}
                >
                  Validar
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
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
    marginTop: 20,
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
    marginLeft: 40,
  },
  contenedorBoton: {
    marginTop: 25,
    marginBottom: 25,
  },
  botonGuardar: {
    alignSelf: 'center',
    backgroundColor: colors.celeste,
    marginTop: 10,
  },
  inputCodigoVal: {
    marginRight: 40,
    marginBottom: 7,
    marginTop: 7,
    paddingLeft: 5,
    height: 55,
    fontSize: 18,
    backgroundColor: colors.grey,
  },
  errorVal: {
    color: '#af1a1a',
    top: -8,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Cupones);
