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
import firebaseSecondary from '../../../firebase/config-secondary';

//Variable que contiene un codigo de prueba para comparar con el del input del cupon
//const CODIGO_VALIDAR = 'ABCDEF';

function Cupones(props) {
  const [cupones, setCupones] = React.useState(null);
  //estado que contiene el mensaje de error en la validacion del cupon
  const [errorCupon, setErrorCupon] = React.useState('');
  //estado que maneja el contenido del input de validacion
  const [codigo, setCodigo] = React.useState(null);
  //estado que donde se guardan la lista de codigos a validar 
  const [listaCodigos, setListaCodigos] = React.useState([]);
  
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
        console.log(arrayCodigos);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCodigos();
  }, []);

  //funcion que asigna el valor del input de validacion en el estado cupon
  const handleChangeCodigo = (codigo) => {
    setCodigo(codigo);
  };
  //funcion que valida el codigo
  const handleSubmit = () => {
    listaCodigos.forEach((cod) => {
      if (cod.codigo === codigo && cod.idCupon === data.item.id) {
        //aca deberia saltar a la encuesta
        console.log('claro');
      } else {
        console.log('pete');
      }
    });
  };

  const { data } = props.route.params;
  return (
    <SafeAreaView style={styles.container}>
      {data !== null ? (
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.content}>
            <View style={styles.card}>
              <View style={styles.contenido}>
                <Image
                  style={styles.contImagen}
                  source={{
                    uri:
                      data.item.tipoProveedor === 'Propias'
                        ? props.fotocomercio
                        : data.item.valueProveedor === 'Otro'
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
                      data.item.comercio +
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
                          (data.item.diaAplicacion.viernes ? 'Viernes ' : '') +
                          (data.item.diaAplicacion.sabado ? 'Sábado ' : '') +
                          (data.item.diaAplicacion.domingo ? 'Domingo ' : '') +
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

                    <Text style={styles.validez2}>
                      {data.item.descripcion ? data.item.descripcion + '.' : ''}
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
                    //onBlur={() => {
                    //codigoValidator;
                    //}}
                    onChangeText={handleChangeCodigo}
                    //error={errorCupon}
                    value={codigo}
                  />
                  <Text style={styles.errorVal}>{errorCupon}</Text>
                </View>
                <Button
                  icon="coin"
                  mode="outlined"
                  onPress={handleSubmit}
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