import * as React from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Divider } from 'react-native-paper';
import _ from 'lodash';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { LogBox, YellowBox } from 'react-native';
import { connect } from 'react-redux';
import CardComercio from '../Inicio/card-comercio';
import BarraSup from '../Inicio/barra-superior';
import ButtonCategorias from '../Inicio/button-categorias';
import { colors } from '../../styles/colores';
import CardPremium from '../Inicio/card-premium';
import firebaseapp from '../../../firebase/config';
import { map } from 'lodash';
import {
  agregarComercioFavorito,
  guardarComerciosEnRedux,
} from '../../../redux/actions/comercio-actions';
import {
  setearLogeo,
  setNuevoUsuario,
} from '../../../redux/actions/auth-actions';

import { guardarGeolocalizacion } from '../../../redux/actions/user-actions';

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

const promociones = [];
const obtenerPromociones = () => {
  firestore.collection('promociones').onSnapshot((snapShots) => {
    snapShots.forEach((doc) => {
      const data = doc.data();
      promociones.push({
        ...data,
        id: doc.id,
      });
    });
  });
};
obtenerPromociones();
//esconde los warnings
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};
function Inicio(props) {
  if (props.logeo) {
    props.setearLogeo('False');
  }

  //funcion para pedir permiso de ubicacion cuando abre por primera vez (usuario nuevo)

  //Necesito ponerla acá porque creo que se renderiza de arriba hacia abajo (conclusión mia) y
  // si la meto abajo del if en el bloque de código que sigue no me funca

  const getLocation = async () => {
    //if props.location then nada
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      //Se rechazó el permiso para geolocalizacion
      console.log('El permiso para acceder a la ubicación fue denegado');
      props.setNuevoUsuario('False');
    } else {
      const location = await Location.getCurrentPositionAsync();
      props.guardarGeolocalizacion(location);
      props.setNuevoUsuario('False');
    }
  };

  const getDevicePushToken = () => {
    return Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((response) =>
        response.status === 'granted'
          ? response
          : Permissions.askAsync(Permissions.NOTIFICATIONS),
      )
      .then((response) => {
        if (response.status !== 'granted') {
          props.setNuevoUsuario('False');
          return Promise.reject(
            new Error('Push notifications permission was rejected'),
          );
        }
        props.setNuevoUsuario('False');
        return Notifications.getDevicePushTokenAsync();
      })
      .then((token) => {
        firestore
          .collection('usuarioConsumidor')
          .doc(props.auth.uid)
          .update({ pushToken: token.data });
        console.log(token);
        props.setNuevoUsuario('False');
      })
      .catch((error) => {
        props.setNuevoUsuario('False');
        console.log('Error while registering device push token', error);
      });
  };

  //DE ESTE IFF
  if (props.usuarioNuevo !== null) {
    console.log(props.usuarioNuevo);
    getLocation();
    getDevicePushToken();
  }

  //estados para el permiso de ubicacion
  const [errorMsgGeo, setErrorMsgGeo] = React.useState(null);
  //estado lista comercios
  const [listaComercios, setListaComercios] = React.useState(null);
  const [listaComercios2, setListaComercios2] = React.useState([]);
  const [currentId, setCurrentId] = React.useState(null);
  const [value, setValue] = React.useState(null);
  //estado texto del buscador
  const [text, setText] = React.useState('');
  //guardo los proveedores del usuario
  const [proveedores, setProveedores] = React.useState(
    props.profile.proveedoresAsociados,
  );
  //primer filtrado de comercios segun el proveedor de cada usuario
  const filtrar = (itemSeleccionados) => {
    if (itemSeleccionados === null) {
      const idComercios = [];
      promociones.forEach((promo) => {
        if (promo.visible === true) {
          if (promo.TipoProveedor === 'Propias') {
            idComercios.push(promo.idComercio);
          }
        }
      });
      for (var i = idComercios.length - 1; i >= 0; i--) {
        if (idComercios.indexOf(idComercios[i]) !== i) {
          idComercios.splice(i, 1);
        }
      }

      let comerciosFinales = [];
      comercios.forEach((comercio) => {
        idComercios.forEach((idComercio) => {
          if (comercio.id === idComercio) {
            comerciosFinales.push(comercio);
          }
        });
      });
      let set = new Set(comerciosFinales.map(JSON.stringify));
      let arrSinDuplicaciones = Array.from(set).map(JSON.parse);
      setListaComercios(arrSinDuplicaciones);
      setListaComercios2(arrSinDuplicaciones);
      return;
    }
    const idComercios = [];

    itemSeleccionados
      ? itemSeleccionados.forEach((item) => {
          promociones.forEach((promo) => {
            if (promo.visible === true) {
              if (
                promo.tipoProveedor === item ||
                promo.valueProveedor === item ||
                promo.otroProveedor === item ||
                promo.tipoProveedor === 'Propias'
              ) {
                idComercios.push(promo.idComercio);
              }
            }
          });
        })
      : null;

    for (var i = idComercios.length - 1; i >= 0; i--) {
      if (idComercios.indexOf(idComercios[i]) !== i) {
        idComercios.splice(i, 1);
      }
    }

    let comerciosFinales = [];
    comercios.forEach((comercio) => {
      idComercios.forEach((idComercio) => {
        if (comercio.id === idComercio) {
          comerciosFinales.push(comercio);
        }
      });
    });
    let set = new Set(comerciosFinales.map(JSON.stringify));
    let arrSinDuplicaciones = Array.from(set).map(JSON.parse);
    setListaComercios(arrSinDuplicaciones);
    setListaComercios2(arrSinDuplicaciones);
    return;
  };

  //funcion para el buscador de comercios por nombre de comercio
  const filter = (texto) => {
    let textoBuscar = texto;
    const datos = listaComercios2;
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

  /*const obtenerDatosComercio = React.useCallback(({ comercios }) => {
    //setListaComercios(comercios);
  }, []);*/

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

  React.useEffect(() => {
    setProveedores(props.profile.proveedoresAsociados);
    if (proveedores) {
      filtrar(proveedores);
    } else {
      console.error('No hay proveedores');
    }
    /*if (props.profile.proveedoresAsociados) {
      setProveedores(props.profile.proveedoresAsociados);
      filtrar(proveedores);
    }*/
  }, [proveedores, props.profile.proveedoresAsociados]);

  return (
    <SafeAreaView style={styles.container}>
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
          comercios={listaComercios}
        />
      </View>
      <ScrollView style={styles.scroll}>
        <View>
          <View style={styles.categorias}>
            <Text style={styles.texto}>Categorías</Text>
            <ButtonCategorias
              navigation={props.navigation}
              comercios={listaComercios}
            />
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
              //obtenerDatosComercio={obtenerDatosComercio}
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
    logeo: state.auth.logeo,
    usuarioNuevo: state.auth.usuarioNuevo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    guardarGeolocalizacion: (location) =>
      dispatch(guardarGeolocalizacion(location)),
    //quitarGeolocalizacion: () => dispatch(quitarGeolocalizacion()),

    agregarComercioFavorito: (comercio, favorito) =>
      dispatch(agregarComercioFavorito(comercio, favorito)),

    setearLogeo: (flag) => dispatch(setearLogeo(flag)),

    setNuevoUsuario: (flag) => dispatch(setNuevoUsuario(flag)),
    guardarComerciosEnRedux: (comercios) => guardarComerciosEnRedux(comercios),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inicio);
