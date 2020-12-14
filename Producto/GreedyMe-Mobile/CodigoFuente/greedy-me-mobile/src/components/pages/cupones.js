import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Avatar,
  IconButton,
  Card,
  List,
  Title,
  Paragraph,
  Divider,
} from 'react-native-paper';
import { connect } from 'react-redux';
import _ from 'lodash';
import { colors } from '../../styles/colores';
import firebaseapp from '../../../firebase/config';
import { format } from 'date-fns';
import { eliminarCupon } from '../../../redux/actions/comercio-actions';

function Cupones(props) {
  //estado de cupones
  const [cupones, setCupones] = React.useState(null);

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

  //funcion para eliminar cupon
  const handleEliminar = (id) => {
    props.eliminarCupon(props.auth.uid, id);
    const cuponEliminado = _.remove(cupones, function (n) {
      return n.id === id;
    });
    setCupones([...cupones]);
  };

  /*  //estados para manejar los dialog que se abren de la primer encuesta
  const [visible, setVisible] = React.useState(false);
  const [visible1, setVisible1] = React.useState(false);
  const showDialogValidar = () => setVisible(true);

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
  }, [codigo]); */

  return (
    <SafeAreaView style={styles.container}>
      {cupones ? (
        <FlatList
          data={cupones}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={(data) => (
            <TouchableWithoutFeedback>
              <View style={styles.content}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Validar-cupones', {
                      data: data,
                    });
                  }}
                >
                  <View style={styles.card} id={data.item.id}>
                    <View style={styles.contCirculo}>
                      <View style={styles.circulo} />
                    </View>
                    <View style={styles.contCirculo2}>
                      <View style={styles.circuloEnd} />
                    </View>
                    <View style={styles.contCirculo2}>
                      <IconButton
                        icon="trash-can-outline"
                        color={colors.darkGrey}
                        size={21}
                        style={{ marginTop: 78, marginRight: 5 }}
                        onPress={() => {
                          handleEliminar(data.item.id);
                        }}
                      />
                    </View>

                    <View style={styles.contenido}>
                      <Image
                        style={styles.contImagen}
                        resizeMode="cover"
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
                      <Divider style={styles.divider} />
                      <View style={styles.texto}>
                        <Title>{data.item.nombreComercio}</Title>
                        <Title style={styles.beneficio}>
                          {data.item.valuePromo === 'Otro'
                            ? data.item.otraPromo
                            : data.item.tipoPromo === 'Descuento'
                            ? data.item.valuePromo + ' OFF'
                            : data.item.valuePromo}
                        </Title>
                        <Text style={{ color: colors.darkGrey, fontSize: 16 }}>
                          {data.item.valueProveedor === 'Otro'
                            ? data.item.otroProveedor
                            : data.item.valueProveedor === 'Propio'
                            ? props.nombrecomercio
                            : data.item.valueProveedor === 'Todos'
                            ? data.item.valueProveedor + ' los Bancos'
                            : data.item.valueProveedor}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      ) : (
        <View style={styles.contenedor}>
          <Image
            style={styles.image}
            source={require('../../multimedia/no-promociones.png')}
          />
          <Text style={styles.text}>
            No guardaste ningun cupon por el momento
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f3f3',
    flex: 1,
  },
  contenedor: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#f3f3f3',
    marginTop: 23,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 4,
    height: 110,
    justifyContent: 'center',
    alignContent: 'center',
    elevation: 1,
  },
  contCirculo: {
    position: 'absolute',
    justifyContent: 'center',
  },
  circulo: {
    height: 40,
    width: 40,
    backgroundColor: '#f3f3f3',
    borderRadius: 100,
    marginLeft: -22,
  },
  contCirculo2: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  circuloEnd: {
    height: 40,
    width: 40,
    backgroundColor: '#f3f3f3',
    borderRadius: 100,
    marginRight: -22,
  },
  contenido: {
    flexDirection: 'row',
    alignContent: 'center',
    marginLeft: 15,
  },
  contImagen: {
    marginLeft: 14,
    marginRight: 20,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    height: 68,
    width: 68,
    borderRadius: 5,
  },
  divider: {
    height: 100,
    width: 2,
    backgroundColor: colors.grey,
    marginRight: 22,
  },
  texto: {
    alignSelf: 'center',
  },
  beneficio: {
    color: colors.naranja,
    marginBottom: 5,
    marginTop: -3,
    fontSize: 23,
  },
  image: {
    width: 350,
    height: 350,
  },
  text: {
    fontSize: 17,
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
    eliminarCupon: (id, idCupon) => dispatch(eliminarCupon(id, idCupon)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cupones);
