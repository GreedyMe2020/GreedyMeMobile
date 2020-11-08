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
const comercios = [];
const obtenerComercios = () => {
  firestore
    .collection('usuarioComercio')
    .where('favorito', '==', true)
    .onSnapshot(function (snapShots) {
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

function CardComercio(props) {
  //Guardo el id de mi usuario .

  /*React.useEffect(() => {
    obtenerComerciosFavoritos();
  }, [props.countFavorito]);*/
  /*ListEmptyComponent={
          <Text>Todavía no tienes locales favoritos... </Text>
        }*/
  //const [listaComercios, setListaComercios] = React.useState(comercios);

  /*React.useEffect(() => {
    setListaComercios([]);
    setListaComercios(comercios);
    console.log(props.favoritos);
  }, [props.favoritos]);*/

  return (
    <SafeAreaView>
      <FlatList
        data={comercios}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        renderItem={(data) => (
          <TouchableWithoutFeedback onPress={() => {}}>
            <View>
              {data.item.favorito === true ? (
                <>
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
                </>
              ) : null}
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
    favoritos: state.comercio.favoritos,
  };
};

export default connect(mapStateToProps)(CardComercio);
