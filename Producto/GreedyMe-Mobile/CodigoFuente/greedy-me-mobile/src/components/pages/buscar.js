import * as React from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import SearchBarBuscar from '../buscador/search-bar-buscar';
import SafeAreaView from 'react-native-safe-area-view';
import BuscadorProveedores from '../buscador/buscador';
import { colors } from '../../styles/colores';
import CardComercio from '../Inicio/card-comercio';
import { connect } from 'react-redux';
import firebaseapp from '../../../firebase/config';

const firestore = firebaseapp.firestore();
const comercios = [];
const obtenerComercios = () => {
  firestore.collection('usuarioComercio').onSnapshot((snapShots) => {
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
function Buscador(props) {
  //estado de lista de comercios
  const [listaComercios, setListaComercios] = React.useState([]);
  //Estado que trae lo que se quiere buscar
  const [searchQuery, setSearchQuery] = React.useState('');
  //Funcion para setear lo que se quiere buscar
  const onChangeSearch = (query) => setSearchQuery(query);

  const filtrar = (itemSeleccionados) => {
    const idComercios = [];
    itemSeleccionados.forEach((item) => {
      promociones.forEach((promo) => {
        if (promo.valuePromo === item){
          idComercios.push(promo.idComercio);
        }
      });
    });
    itemSeleccionados.forEach((item) => {
      comercios.forEach((comercio) => {
        if (comercio.rubro === item){
          idComercios.push(comercio.id);
        }
      });
    });
    for (var i = idComercios.length - 1; i >= 0; i--) {
      if (idComercios.indexOf(idComercios[i]) !== i) {
        idComercios.splice(i, 1);
      }
    }
    const comerciosFinales = [];
    comercios.forEach((comercio) => {
      idComercios.forEach((idComercio) => {
        if (comercio.id === idComercio) {
          comerciosFinales.push(comercio);
        }
      });
    });
    setListaComercios(comerciosFinales);
    return;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={'transparent'}
      />
      <View style={styles.searchcont}>
        <SearchBarBuscar
          onChangeSearch={onChangeSearch}
          searchQuery={searchQuery}
          styleContainer={styles.searchcontainer}
        />
      </View>
      <View style={styles.contFiltros}>
        <BuscadorProveedores filtrar={filtrar} />
      </View>
      <View style={styles.proveedores}>
        <Text style={styles.texto}>Locales</Text>
        <CardComercio
          comercios={listaComercios}
          navigation={props.navigation}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  searchcont: {
    marginLeft: 13,
    marginRight: 20,
    height: 75,
    top: 13,
  },
  contFiltros: {
    flex: 1,
    marginRight: 10,
  },
  texto: {
    marginBottom: 15,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
  },
  proveedores: {
    flex: 4,
    justifyContent: 'flex-start',
    marginLeft: 22,
    marginRight: 10,
    paddingBottom: 50,
  },
  searchcontainer: {
    backgroundColor: colors.white,
    borderWidth: 0, //no effect
    shadowColor: colors.white, //no effect
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Buscador);
