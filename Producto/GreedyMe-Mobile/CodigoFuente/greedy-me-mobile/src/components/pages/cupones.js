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

function CuponesComercio(props) {
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
