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

const firestore = firebaseapp.firestore();
const comercios = [];
const obtenerComercios = () => {
  firestore.collection('usuarioComercio').onSnapshot(function (snapShots) {
    snapShots.forEach((doc) => {
      const data = doc.data();
      comercios.push({
        ...data,
        id: doc.id,
      });
    });
  });
};
obtenerComercios();

function Favoritos(props) {
  const [listaComercios, setListaComercios] = React.useState([]);
  const [favoritos, setListaFavoritos] = React.useState([]);

  React.useEffect(() => {
    let comerciosFavoritos = [];
    comercios.forEach((comercio) => {
      props.profile.favorito
        ? props.profile.favorito.forEach((fav) => {
            if (comercio.id === fav) {
              comerciosFavoritos.push(comercio);
            }
          })
        : null;
    });

    setListaComercios(comerciosFavoritos);
  }, [props.profile.favorito, favoritos]);

  return (
    <SafeAreaView style={styles.container}>
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
