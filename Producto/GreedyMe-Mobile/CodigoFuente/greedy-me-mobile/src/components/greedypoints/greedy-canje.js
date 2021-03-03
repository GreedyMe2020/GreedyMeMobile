import * as React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import { List, Divider } from 'react-native-paper';
import { connect } from 'react-redux';
import _ from 'lodash';
import { colors } from '../../styles/colores';
import firebaseapp from '../../../firebase/config';

function GreedyShopCanje(props) {
  const [greedyPremio, setGreedyPremio] = React.useState([]);

  React.useEffect(() => {
    const obtenerGreedyPremio = async () => {
      const firestore = firebaseapp.firestore();
      try {
        const greedyPremio = await firestore.collection('greedyPremio').get();
        const arrayGreedyPremio = greedyPremio.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setGreedyPremio(arrayGreedyPremio);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerGreedyPremio();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={greedyPremio}
        style={{ marginTop: 5 }}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={(data) => (
          <TouchableWithoutFeedback>
            <View>
              <View style={styles.contList}>
                <List.Item
                  title={data.item.nombre}
                  titleStyle={styles.titulo}
                  description={data.item.descripcion}
                  style={styles.lista}
                  onPress={() => {
                    props.navigation.navigate('ProductoACanjear', {
                      data: data,
                    });
                  }}
                  left={() => (
                    <Image
                      style={styles.image}
                      source={{ uri: data.item.photoURL }}
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
    marginBottom: 10,
    marginTop: 10,
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
    borderRadius: 10,
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
    width: 88,
    height: 88,
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

export default connect(mapStateToProps)(GreedyShopCanje);
