import * as React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import { List } from 'react-native-paper';
import { connect } from 'react-redux';
import _ from 'lodash';
import { colors } from '../../styles/colores';
import firebaseapp from '../../../firebase/config';

function GreedyShopCanje(props) {
  //Estado para traer los premios
  const [premios, setPremios] = React.useState([]);
  //use effect que se ejecuta una vez y trae premios
  React.useEffect(() => {
    const obtenerPremios = async () => {
      const firestore = firebaseapp.firestore();
      try {
        const premios = await firestore.collection('greedyPremio').get();
        const arrayPremios = premios.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPremios(arrayPremios);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPremios();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.textoIntro}>Productos disponibles para canjear</Text>
      {premios ? (
        <FlatList
          data={premios}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={(data) => ( 
            <View style={styles.contList}>
              <List.Item
                title={data.item.nombre}
                titleStyle={styles.titulo}
                description={`${data.item.greedyPoints} greedyPoints`}
                style={styles.lista}
                onPress={() => {
                  props.navigation.navigate('ProductoACanjear');
                }}
                left={() => (
                  <Image
                    style={styles.image}
                    source={{
                      uri: data.item.photoURL ? data.item.photoURL : null,
                    }}
                  />
                )}
              />
            </View>
          )}
        />
      ) : null}

      <TouchableWithoutFeedback
        onPress={() => {
          props.navigation.navigate('GreedyPointsInicio');
        }}
      >
        <View style={styles.iconGP}>
          <View style={styles.greedypoints}>
            <View style={styles.tituloP}>
              <Text style={styles.puntos}>{props.profile.greedyPoints}</Text>
            </View>
            <View style={styles.letrasCont}>
              <Text style={styles.lBlanca}>gre</Text>
              <Text style={styles.lVerde}>edy</Text>
              <Text style={styles.lNaranja}>Points</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  textoIntro: {
    fontSize: 17,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 25,
  },
  contList: {
    marginLeft: 12,
    marginRight: 20,
    marginBottom: 8,
    marginTop: 12,
  },
  titulo: {
    marginBottom: 4,
    fontSize: 17,
  },
  lista: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 75,
    width: 75,
    marginRight: 10,
    borderRadius: 50,
  },
  buttonC: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: 30,
    borderColor: colors.celeste,
  },
  iconGP: {
    position: 'absolute',
    margin: 25,
    right: 0,
    bottom: 0,
  },
  greedypoints: {
    justifyContent: 'center',
    width: 85,
    height: 85,
    backgroundColor: colors.azul,
    borderRadius: 50,
    elevation: 5,
    shadowColor: colors.black,
  },
  tituloP: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: -3,
  },
  puntos: {
    color: colors.white,
    fontSize: 25,
    fontFamily: 'Poppins-Regular',
  },
  letrasCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: -7,
  },
  lBlanca: {
    color: colors.white,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  lVerde: {
    color: colors.celeste,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  lNaranja: {
    color: colors.naranja,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(GreedyShopCanje);
