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
    <SafeAreaView>
      <FlatList
        data={rubros}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={(data) => (
          <TouchableWithoutFeedback onPress={() => {}}>
            <Card style={styles.categorias}>
              <Card.Cover
                style={styles.image}
                source={{
                  uri: data.item.photoURL, //ACA TRAE LA IMAGEN Y ABAJO EN EL data.item.nombre TRAE EL NOMBRE
                }}
              />
              <Card.Content>
                <Title style={styles.tittle}>{data.item.nombre}</Title>
              </Card.Content>
            </Card>
          </TouchableWithoutFeedback>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  categorias: {
    borderWidth: 1,
    borderColor: colors.avatar,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: colors.avatar,
    borderRadius: 50,
    marginLeft: 5,
    marginRight: 5,
  },
  image: {
    padding: 10,
    margin: 5,
    height: 32,
    width: 32,
    resizeMode: 'stretch',
  },
  texto: {
    marginTop: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(ButtonCategorias);
