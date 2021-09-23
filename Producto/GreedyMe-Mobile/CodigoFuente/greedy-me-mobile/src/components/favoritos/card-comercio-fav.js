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
import _ from 'lodash';
import { colors } from '../../styles/colores';

import { useFocusEffect } from '@react-navigation/native';

function CardComercioFav(props) {
  const [listaComerciosFavoritos, setListaComerciosFavoritos] = React.useState([]);
  const [cargando, setCargando] = React.useState(false);

  const comerciosFavoritos = () => {
    const comerciosFavTemporal = [];
    props.comercios.forEach((comercio) => {
      props.profile.favorito
        ? props.profile.favorito.forEach((fav) => {
          if (comercio.id === fav) {
            comerciosFavTemporal.push(comercio);
          }
        })
        : null;
    });
    setListaComerciosFavoritos(comerciosFavTemporal);
  };

  useFocusEffect(
    React.useCallback(() => {
      setCargando(false);
      comerciosFavoritos();
      setCargando(true);
    }, [props.profile.favorito]),
  );
  return (
    <SafeAreaView>
      {cargando ? (
        <FlatList
          data={listaComerciosFavoritos}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={(data) => (
            <TouchableWithoutFeedback onPress={() => { }}>
              <View>
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
              </View>
            </TouchableWithoutFeedback>
          )}
        />)
        : null}

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

export default connect(mapStateToProps)(CardComercioFav);
