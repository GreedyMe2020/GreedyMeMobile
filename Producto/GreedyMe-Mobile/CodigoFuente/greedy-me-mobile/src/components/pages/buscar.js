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

function Buscador(props) {
  //Estado que trae lo que se quiere buscar
  const [searchQuery, setSearchQuery] = React.useState('');

  //Funcion para setear lo que se quiere buscar
  const onChangeSearch = (query) => setSearchQuery(query);

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
        />
      </View>
      <View style={styles.contFiltros}>
        <BuscadorProveedores />
      </View>
      <View style={styles.proveedores}>
        <Text style={styles.texto}>Locales</Text>
        <CardComercio navigation={props.navigation} />
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
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Buscador);
