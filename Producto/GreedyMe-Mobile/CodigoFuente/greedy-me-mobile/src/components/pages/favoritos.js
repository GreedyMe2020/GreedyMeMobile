import * as React from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { colors } from '../../styles/colores';
import { connect } from 'react-redux';
import CardComercioFav from '../favoritos/card-comercio-fav';
import firebaseapp from '../../../firebase/config';

import { useFocusEffect } from '@react-navigation/native';



function Favoritos(props) {
  const [listaComercios, setListaComercios] = React.useState([]);
  const [favoritos, setListaFavoritos] = React.useState([]);

  const [cargando, setCargando] = React.useState(false);

  const obtenerComerciosFavoritos = async () => {
    const firestore = firebaseapp.firestore();
    try {
      const comerciosOrigen = await firestore
        .collection('usuarioComercio')
        .get();
      const comerciosTemporal = comerciosOrigen.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListaComercios(comerciosTemporal);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setCargando(false);
      obtenerComerciosFavoritos();
      setCargando(true);
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      {cargando ? (
        <>
          <StatusBar
            barStyle="light-content"
            translucent={true}
            backgroundColor={'transparent'}
          />
          <ScrollView style={styles.scroll}>
            <View>
              <CardComercioFav
                navigation={props.navigation}
                comercios={listaComercios}
              />
            </View>
          </ScrollView>
        </>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  texto: {
    marginBottom: 15,
    paddingLeft: 20,
    marginTop: 12,
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Favoritos);
