import * as React from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Platform,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';
import BuscadorProveedores from '../buscador/buscador';
import { colors } from '../../styles/colores';
import CardComercio from '../Inicio/card-comercio';

import { connect } from 'react-redux';
import cardComercio from '../Inicio/card-comercio';

function Buscador() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <KeyboardAvoidingView
      style={styles.containerTeclado}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      enabled={Platform.OS === 'ios'}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor={'transparent'}
        />
        <View style={styles.barraSup}>
          <View style={styles.searchcont}>
            <SearchBar
              placeholder="Buscar comercio"
              onChangeText={onChangeSearch}
              value={searchQuery}
              inputContainerStyle={{
                backgroundColor: '#F6F8F7',
                borderRadius: 100,
                height: 40,
              }}
              containerStyle={styles.searchcontainer}
              lightTheme
              round
            />
          </View>
          <View style={styles.contFiltros}>
            <BuscadorProveedores />
          </View>
        </View>
        <View style={styles.proveedores}>
          <Text style={styles.texto}>Locales</Text>
          <CardComercio />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
    flex: 2,
  },
  barraSup: {
    marginTop: 5,
    marginBottom: 5,
    flex: 1,
    width: '100%',
  },
  searchcont: {
    marginLeft: 10,
    flex: 3,
    top: 13,
  },
  searchcontainer: {
    backgroundColor: colors.white,
    borderWidth: 0, //no effect
    shadowColor: colors.white, //no effect
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  contFiltros: {
    flex: 2,
    marginRight: 10,
  },
  cards: {
    flex: 1,
    width: '100%',
    marginTop: 20,
  },
  texto: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: colors.darkGrey,
    marginLeft: 10,
  },
  proveedores: {
    flex: 3,
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginRight: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Buscador);
