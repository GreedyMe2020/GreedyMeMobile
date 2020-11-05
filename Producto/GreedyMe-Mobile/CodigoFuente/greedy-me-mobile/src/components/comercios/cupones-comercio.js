import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
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
  console.log(props.idcomercio);
  console.log(props.nombrecomercio);
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
      <FlatList
        data={listaPromociones}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        renderItem={(data) => (
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.content}>
              <View style={styles.card} id={data.item.id}>
                <View style={styles.contCirculo}>
                  <View style={styles.circulo} />
                </View>
                <View style={styles.contCirculo2}>
                  <View style={styles.circuloEnd} />
                </View>
                <View style={styles.contenido}>
                  <Avatar.Image
                    style={styles.contImagen}
                    size={72}
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
                        format(data.item.hastaVigencia.toDate(), 'dd/MM/yyyy') +
                        '.'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.avatar,
    flex: 1,
  },
  content: {
    backgroundColor: colors.avatar,
    marginTop: 30,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 25,
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
    backgroundColor: colors.avatar,
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
    backgroundColor: colors.avatar,
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
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(CuponesComercio);
