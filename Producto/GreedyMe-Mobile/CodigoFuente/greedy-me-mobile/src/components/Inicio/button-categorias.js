import * as React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../../styles/colores';
import firebaseapp from '../../../firebase/config';

const firestore = firebaseapp.firestore();
const rubros = [];
const obtenerRubros = () => {
  firestore
    .collection('rubros')
    .orderBy('prioridad')
    .onSnapshot((snapShots) => {
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
  return (
    <SafeAreaView style={styles.cont}>
      <FlatList
        data={rubros}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={(data) => (
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.cat}>
              <TouchableOpacity style={styles.categorias} activeOpacity={0.5}>
                <Image
                  source={{
                    uri: data.item.photoURL,
                  }}
                  style={styles.image}
                />
              </TouchableOpacity>
              <Text style={styles.texto}>{data.item.nombre}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cont: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  cat: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 95,
    marginLeft: 10,
  },
  categorias: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#EFEFEF',
    borderRadius: 50,
  },
  image: {
    margin: 5,
    height: 45,
    width: 45,
    resizeMode: 'stretch',
  },
  texto: {
    marginTop: 10,
    fontSize: 13,
    color: colors.darkGrey,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(ButtonCategorias);
