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
import { useFocusEffect } from '@react-navigation/native';

function ButtonCategorias(props) {
  const [cargandoRubros, setCargando] = React.useState(false);
  const [rubros, setRubros] = React.useState([]);

  const obtenerRubros = async () => {
    const firestore = firebaseapp.firestore();
    try {
      const rubrosOrigen = await firestore
        .collection('rubros')
        .orderBy('prioridad')
        .get();
      const rubrosTemporal1 = rubrosOrigen.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRubros(rubrosTemporal1);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setCargando(false);
      obtenerRubros();
      setCargando(true);
    }, []),
  );

  return (
    <SafeAreaView style={styles.cont}>
      {cargandoRubros ? (
        <FlatList
          data={rubros}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={(data) => (
            <TouchableWithoutFeedback>
              <View style={styles.cat}>
                <TouchableOpacity
                  style={styles.categorias}
                  activeOpacity={0.5}
                  onPress={() => {
                    props.navigation.navigate('ComerciosPorRubro', {
                      data: data,
                      comercios: props.comercios,
                    });
                  }}
                >
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
      ) : null}
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
