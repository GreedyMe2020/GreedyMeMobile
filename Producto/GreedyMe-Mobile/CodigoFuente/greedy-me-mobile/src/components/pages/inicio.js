import * as React from 'react';
import {
  FlatList,
  StyleSheet,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Divider } from 'react-native-paper';
import _ from 'lodash';
import * as Location from 'expo-location';
import { LogBox } from 'react-native';
import { connect } from 'react-redux';
import CardComercio from '../Inicio/card-comercio';
import BarraSup from '../Inicio/barra-superior';
import ButtonCategorias from '../Inicio/button-categorias';
import { colors } from '../../styles/colores';
import CardPremium from '../Inicio/card-premium';
import firebaseapp from '../../../firebase/config';
import { setearFavorito } from '../../../redux/actions/comercio-actions';
import { map } from 'lodash';
import { agregarComercioFavorito } from '../../../redux/actions/comercio-actions';
//Obtengo todos los comercios que en un principio solo deberian estar los que tienen proveedor de servicio del usuario
const firestore = firebaseapp.firestore();
const comercios = [];
const obtenerComercios = () => {
  firebaseapp.auth().onAuthStateChanged(function (user) {
    if (user) {
      firestore.collection('usuarioComercio').onSnapshot((snapShots) => {
        snapShots.forEach((doc) => {
          const data = doc.data();
          comercios.push({
            ...data,
            id: doc.id,
          });
        });
      });
    }
  });
};
obtenerComercios();

//esconde los warnings
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

function Inicio(props) {
  //estados para el permiso de ubicacion
  const [estadoGeo, setEstadoGeo] = React.useState(null);
  const [errorMsgGeo, setErrorMsgGeo] = React.useState(null);
  //estado lista comercios
  const [listaComercios, setListaComercios] = React.useState(comercios);
  const [currentId, setCurrentId] = React.useState(null);
  const [value, setValue] = React.useState(null);
  //estado texto del buscador
  const [text, setText] = React.useState('');
  //funcion para el buscador de comercios por nombre de comercio
  const filter = (texto) => {
    let textoBuscar = texto;
    const datos = comercios;
    const newDatos = datos.filter(function (item) {
      const itemNombreComercio = item.nombreComercio.toUpperCase();
      const itemSucursal = item.sucursal.toUpperCase();
      const campo = itemNombreComercio + ' ' + itemSucursal;
      const textData = textoBuscar.toUpperCase();
      return campo.indexOf(textData) > -1;
    });
    setListaComercios(newDatos);
    setText(texto);
  };

  //use effect para pedir permiso de ubicacion cuando abre por primera vez
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsgGeo('El permiso para acceder a la ubicación fue denegado');
        setEstadoGeo(status);
      } else {
        setEstadoGeo(status);
      }
    })();
  }, []);

  const obtenerDatosComercio = React.useCallback(({ comercios }) => {
    //setListaComercios(comercios);
  }, []);

  /*React.useEffect(() => {
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
      props.agregarComercioFavorito(currentId, value);
      setListaComercios(listaComercios);
    }

    setCurrentId(null);
  }, [currentId]);*/

  return (
    <SafeAreaView style={styles.container}>
      {console.log(listaComercios)}
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={'transparent'}
      />
      <View style={styles.barraSup}>
        <BarraSup
          navigation={props.navigation}
          onChangeText={filter}
          texto={text}
        />
      </View>
      <ScrollView style={styles.scroll}>
        <View>
          <View style={styles.categorias}>
            <Text style={styles.texto}>Categorías</Text>
            <ButtonCategorias navigation={props.navigation} />
          </View>
          <Divider style={{ height: 7, backgroundColor: '#f8f8f8' }} />
          <View style={styles.premium}>
            <Text style={styles.texto}>Locales destacados</Text>
            <CardPremium navigation={props.navigation} />
          </View>
          <Divider style={{ height: 7, backgroundColor: '#f8f8f8' }} />
          <View style={styles.cards}>
            <Text style={styles.texto}>Todos los locales</Text>
            <CardComercio
              navigation={props.navigation}
              comercios={listaComercios}
              obtenerDatosComercio={obtenerDatosComercio}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerTeclado: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flex: 1,
  },
  barraSup: {
    height: 90,
    backgroundColor: colors.azul,
  },
  categorias: {
    flex: 1,
    marginTop: 5,
    marginBottom: 20,
  },
  premium: {
    flex: 1,
    width: '100%',
    marginTop: 5,
    marginBottom: 20,
  },
  cards: {
    flex: 1,
    width: '100%',
    marginTop: 5,
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
    favoritos: state.comercio.favoritos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    agregarComercioFavorito: (comercio, favorito) =>
      dispatch(agregarComercioFavorito(comercio, favorito)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inicio);
