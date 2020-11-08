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
import { agregarComercioFavorito } from '../../../redux/actions/comercio-actions';
import firebaseapp from '../../../firebase/config';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
const firestore = firebaseapp.firestore();

//obtengo los comercios favoritos solamente para el fucking corazoncito, despues vemos como lo podemos mejorar

function CardComercio(props) {
  //Seteo la variable favorito

  const [listaComercios, setListaComercios] = React.useState(props.comercios);
  const [currentId, setCurrentId] = React.useState(null);
  const [value, setValue] = React.useState(null);

  const getCurrentComercio = (comercioId, comercioFavorito) => {
    props.agregarComercioFavorito(comercioId, comercioFavorito);
    setCurrentId(comercioId);
    setValue(!comercioFavorito);

    //props.obtenerDatosComercio({ comercioId, comercioFavorito });
  };

  /*React.useEffect(() => {
    setListaComercios(props.comercios);
  }, [favorito, props.comercios]);*/

  React.useEffect(() => {
    if (currentId) {
      const indiceACambiar = _.findIndex(listaComercios, function (o) {
        return o.id === currentId;
      });

      const objCambiar = _.nth(listaComercios, indiceACambiar);

      listaComercios.splice(indiceACambiar, 1, {
        id: objCambiar.id,
        cuit: objCambiar.cuit,
        direccion: objCambiar.direccion,
        email: objCambiar.email,
        facebook: objCambiar.facebook,
        fechaCreacion: objCambiar.fechaCreacion,
        instagram: objCambiar.instagram,
        nombreComercio: objCambiar.nombreComercio,
        photoURL: objCambiar.photoURL,
        rubro: objCambiar.rubro,
        sucursal: objCambiar.sucursal,
        favorito: value,
        telefono: objCambiar.telefono,
        tipoSuscripcion: objCambiar.tipoSuscripcion,
        web: objCambiar.web,
      });
      //props.obtener
      //setListaComercios(listaComercios);
      props.obtenerDatosComercio([listaComercios]);
    }
    setCurrentId(null);
  }, [currentId]);

  return (
    <SafeAreaView>
      <FlatList
        data={listaComercios}
        keyExtractor={(item) => item}
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
                  right={() => (
                    <IconButton
                      icon={
                        data.item.favorito === false ? 'heart-outline' : 'heart'
                      }
                      color={
                        data.item.favorito === false ? colors.grey : '#cf3434'
                      }
                      size={27}
                      style={styles.corazonIcon}
                      onPress={() => {
                        getCurrentComercio(data.item.id, data.item.favorito);

                        //setFavorito(!favorito);
                      }}
                    />
                  )}
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
    agregarComercioFavorito: (comercio, favorito) =>
      dispatch(agregarComercioFavorito(comercio, favorito)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardComercio);
