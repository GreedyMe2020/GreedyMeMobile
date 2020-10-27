import * as React from 'react';
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import { List, Divider } from 'react-native-paper';
import { connect } from 'react-redux';
import firebaseapp from '../../../firebase/config';
import _ from 'lodash';
import { colors } from '../../styles/colores';

const firestore = firebaseapp.firestore();

const comerciosAdheridos = [];
const obtenerComerciosFavoritos = () => {
  firebaseapp.auth().onAuthStateChanged(function (user) {
    if (user) {
      const id = user.uid;
      firestore
        .collection('usuarioConsumidor')
        .doc(id)
        .collection('comerciosAdheridos')
        .onSnapshot((snapShots) => {
          snapShots.forEach((doc) => {
            const data = doc.data();
            comerciosAdheridos.push({
              ...data,
              id: doc.id,
            });
          });
        });
    }
  });
};
obtenerComerciosFavoritos();

function CardComercio(props) {
  //Guardo el id de mi usuario .

  const [formData, setFormData] = React.useState({
    id: props.auth.uid,
    idComercio: '',
    favorito: '',
  });

  const [favorito, setFavorito] = React.useState(true);

  function manejarFavorito(props) {
    //Si es true se elimina el comercio de favoritos, si es false se agrega.
    const favorito = false;
    comerciosFavoritos.map((comercio) => {
      if (comercio.idComercio == props.id) {
        console.log('igual');
      } else {
        console.log('distinto');
      }
    });
    setFormData({ ...formData });
  }

  return (
    <SafeAreaView>
      <FlatList
        data={comercios}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        renderItem={(data) => (
          <TouchableWithoutFeedback onPress={() => {}}>
            <View>
              <View style={styles.contList}>
                <List.Item
                  title={data.item.nombreComercio}
                  titleStyle={styles.titulo}
                  description={data.item.sucursal}
                  style={styles.lista}
                  onPress={() => {
                    props.navigation.navigate('ComerciosNavegador', {
                      data: data,
                    });
                  }}
                  left={() => (
                    <Image
                      style={styles.image}
                      source={{
                        uri: data.item.photoURL,
                      }}
                    />
                  )}
                />
              </View>
              <Divider
                style={{
                  height: 1,
                  backgroundColor: colors.avatar,
                  marginLeft: 20,
                  marginRight: 20,
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contList: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 8,
    marginTop: 8,
  },
  lista: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 80,
    width: 80,
    marginRight: 10,
    borderRadius: 3,
  },
  titulo: {
    marginBottom: 4,
    fontSize: 17,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(CardComercio);
