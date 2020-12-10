import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { Title, Divider } from 'react-native-paper';
import { connect } from 'react-redux';
import _ from 'lodash';
import { colors } from '../../styles/colores';
import firebaseapp from '../../../firebase/config';
import { format } from 'date-fns';

const firestore = firebaseapp.firestore();
const promociones = [];
const obtenerPromociones = () => {
  firestore.collection('promociones').onSnapshot((snapShots) => {
    snapShots.forEach((doc) => {
      const data = doc.data();
      promociones.push({
        ...data,
        id: doc.id,
      });
    });
  });
};
obtenerPromociones();

function CuponesComercio(props) {
  const [idComercio, setIdComercio] = React.useState(props.idcomercio);
  const [listaPromociones, setListaPromociones] = React.useState([]);
  console.log(props.fotocomercio);
  React.useEffect(() => {
    const promocionesIntermedio = [];
    promociones.forEach((promocion) => {
      if (promocion.visible === true) {
        if (promocion.idComercio === idComercio) {
          promocionesIntermedio.push(promocion);
        }
      }
    });
    for (var i = promocionesIntermedio.length - 1; i >= 0; i--) {
      if (promocionesIntermedio.indexOf(promocionesIntermedio[i]) !== i) {
        promocionesIntermedio.splice(i, 1);
      }
    }
    setListaPromociones(promocionesIntermedio);
  }, [idComercio]);
  return (
    <SafeAreaView style={styles.container}>
      {listaPromociones.length > 0 ? (
        <FlatList
          data={listaPromociones}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={(data) => (
            <TouchableWithoutFeedback>
              <View style={styles.content}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Cupon', {
                      data: data,
                      sucursal: props.sucursalcomercio,
                      comercio: props.nombrecomercio,
                      fotocomercio: props.fotocomercio,
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
                        <Title>
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
                        <Text style={{ color: colors.darkGrey }}>
                          {'Válido hasta el ' +
                            format(
                              data.item.hastaVigencia.toDate(),
                              'dd/MM/yyyy',
                            ) +
                            '.'}
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
          <Text style={styles.text}>No hay promociones por el momento</Text>
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
    marginTop: -2,
    marginBottom: 5,
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

export default connect(mapStateToProps)(CuponesComercio);
