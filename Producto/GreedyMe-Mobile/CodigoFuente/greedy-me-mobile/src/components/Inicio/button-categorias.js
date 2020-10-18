import * as React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { connect } from 'react-redux';
import { colors } from '../../styles/colores';
import firebaseapp from '../../../firebase/config';

const firestore = firebaseapp.firestore();
const rubros = [];
const obtenerRubros = () => {
  firestore.collection('rubros').onSnapshot((snapShots) => {
    snapShots.forEach((doc) => {
      const data = doc.data();
      rubros.push({
        ...data,
        id: doc.id,
      });
    });
  });
};
obtenerRubros();

function ButtonCategorias() {
  //LAU TE TRAIGO EL CODIGO COPIADO DE LA CARD-PREMIUM, LO UNICO QUE TENDRIAS QUE CAMBIAR ES EL ESTILO DENTRO DEL renderItem de la FlatList
  return (
    <SafeAreaView style={styles.cont}>
      <View style={styles.cat}>
        <TouchableOpacity style={styles.categorias} activeOpacity={0.5}>
          <Image
            source={require('../../multimedia/categorias/gastronomia.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.texto}>Gastronomia</Text>
      </View>
      <View style={styles.cat}>
        <TouchableOpacity style={styles.categorias} activeOpacity={0.5}>
          <Image
            source={require('../../multimedia/categorias/tienda.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.texto}>Indumentaria</Text>
      </View>
      <View style={styles.cat}>
        <TouchableOpacity style={styles.categorias} activeOpacity={0.5}>
          <Image
            source={require('../../multimedia/categorias/libreria.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.texto}>Farmacias</Text>
      </View>
      <View style={styles.cat}>
        <TouchableOpacity style={styles.categorias} activeOpacity={0.5}>
          <Image
            source={require('../../multimedia/categorias/hogar.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.texto}>Deporte</Text>
      </View>
      {/* <FlatList
        data={rubros}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={(data) => (
          <TouchableWithoutFeedback onPress={() => {}}>
            <Card style={styles.categorias}>
              <Card.Cover
                style={styles.image}
                // source={{
                //   uri: data.item.photoURL, //ACA TRAE LA IMAGEN Y ABAJO EN EL data.item.nombre TRAE EL NOMBRE
                // }}
                source={require('../../multimedia/categorias/shirt.png')}
              />
              <Card.Content>
                <Title style={styles.tittle}>{data.item.nombre}</Title>
              </Card.Content>
            </Card>
          </TouchableWithoutFeedback>
        )}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cat: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categorias: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: colors.white,
    borderRadius: 50,
    marginLeft: 5,
    marginRight: 15,
  },
  image: {
    margin: 5,
    height: 60,
    width: 60,
    resizeMode: 'stretch',
  },
  texto: {
    marginTop: 10,
  },
  cont: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(ButtonCategorias);
