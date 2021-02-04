import * as React from 'react';
import { StyleSheet, StatusBar, View, Text, ScrollView } from 'react-native';
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
  //estado lista de comercios para el buscador
  const [listaComercios2, setListaComercios2] = React.useState([]);
  //estado texto del buscador
  const [text, setText] = React.useState('');

  //funcion que filtra los resultados
  const filtrar = (itemSeleccionados) => {
    const idComercios = [];
    itemSeleccionados
      ? itemSeleccionados.forEach((item) => {
          promociones.forEach((promo) => {
            if (promo.visible === true) {
              if (promo.valuePromo === item) {
                idComercios.push(promo.idComercio);
              }
            }
          });
        })
      : null;
    itemSeleccionados.forEach((item) => {
      comercios.forEach((comercio) => {
        if (comercio.rubro === item) {
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
    setListaComercios2(comerciosFinales);
    return;
  };

  //funcion para el buscador de comercios por nombre de comercio
  const filter = (texto) => {
    let textoBuscar = texto;
    const datos = listaComercios2;
    const newDatos = datos.filter(function (item) {
      const itemNombreComercio = item.nombreComercio.toUpperCase();
      const campo = itemNombreComercio;
      const textData = textoBuscar.toUpperCase();
      return campo.indexOf(textData) > -1;
    });
    setListaComercios(newDatos);
    setText(texto);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={'transparent'}
      />
      <ScrollView style={styles.container}>
        <View style={styles.searchcont}>
          <SearchBarBuscar
            onChangeText={filter}
            texto={text}
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
      </ScrollView>
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
    paddingLeft: 25,
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
  },
  proveedores: {
    flex: 4,
    justifyContent: 'flex-start',
    paddingBottom: 40,
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
