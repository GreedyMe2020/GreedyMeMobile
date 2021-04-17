import * as React from 'react';
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import { IconButton, List, Divider } from 'react-native-paper';
import { connect } from 'react-redux';
import _ from 'lodash';
import { colors } from '../../styles/colores';
import {
  agregarComercioFavorito,
  eliminarComercioFavorito,
  eliminarTokenAComercio,
  agregarTokenAComercio,
  agregarEstadisticaFavorito,
  eliminarEstadisticaFavorito,
} from '../../../redux/actions/comercio-actions';

function CardComercio(props) {
  //Seteo la variable favorito

  //const [listaComercios, setListaComercios] = React.useState(props.comercios);
  const [currentId, setCurrentId] = React.useState(null);

  const getCurrentComercio = (idComercio) => {
    const esFavorito = props.profile.favorito.some((fav) => {
      return idComercio === fav;
    });
    if (esFavorito === true) {
      props.eliminarComercioFavorito(props.auth.uid, idComercio);
      props.eliminarTokenAComercio(idComercio, props.profile.pushToken);
      props.eliminarEstadisticaFavorito(idComercio, props.auth.uid);
    } else {
      props.agregarComercioFavorito(props.auth.uid, idComercio);
      props.agregarTokenAComercio(idComercio, props.profile.pushToken);
      props.agregarEstadisticaFavorito(idComercio, props.auth.uid);
    }
  };

  return (
    <SafeAreaView>
      <FlatList
        data={props.comercios}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={(data) => (
          <TouchableWithoutFeedback>
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
                  right={() => {
                    const esFav = props.profile.favorito
                      ? props.profile.favorito.some((fav) => {
                          return data.item.id === fav;
                        })
                      : null;

                    return (
                      <IconButton
                        icon={esFav === false ? 'heart-outline' : 'heart'}
                        color={esFav === false ? colors.grey : '#cf3434'}
                        size={27}
                        style={styles.corazonIcon}
                        onPress={() => {
                          getCurrentComercio(data.item.id);
                        }}
                      />
                    );
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
  corazonIcon: {
    marginRight: 0,
    alignSelf: 'center',
    //opacity: 0.8,
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

const mapDispatchToProps = (dispatch) => {
  return {
    agregarComercioFavorito: (idUsuario, idComercio) =>
      dispatch(agregarComercioFavorito(idUsuario, idComercio)),
    eliminarComercioFavorito: (idUsuario, idComercio) =>
      dispatch(eliminarComercioFavorito(idUsuario, idComercio)),
    eliminarTokenAComercio: (idComercio, pushToken) =>
      dispatch(eliminarTokenAComercio(idComercio, pushToken)),
    agregarTokenAComercio: (idComercio, pushToken) =>
      dispatch(agregarTokenAComercio(idComercio, pushToken)),
    agregarEstadisticaFavorito: (idComercio, idConsumidor) =>
      dispatch(agregarEstadisticaFavorito(idComercio, idConsumidor)),
    eliminarEstadisticaFavorito: (idComercio, idConsumidor) =>
      dispatch(eliminarEstadisticaFavorito(idComercio, idConsumidor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardComercio);
