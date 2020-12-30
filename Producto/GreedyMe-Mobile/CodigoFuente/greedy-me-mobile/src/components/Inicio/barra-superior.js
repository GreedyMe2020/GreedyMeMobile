import * as React from 'react';
import { StyleSheet, StatusBar, View, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SearchBar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { colors } from '../../styles/colores';

function BarraSup(props) {
  //const [searchQuery, setSearchQuery] = React.useState('');
  //const onChangeSearch = (searchQuery) => setSearchQuery(searchQuery);

  return (
    <SafeAreaView>
      <StatusBar
        barStyle="light-content"
        //translucent={true}
        backgroundColor={colors.azul}
      />
      <View style={styles.container}>
        <View style={styles.searchcont}>
          <SearchBar
            placeholder="Buscar comercio"
            onChangeText={props.onChangeText}
            value={props.texto}
            inputContainerStyle={{
              backgroundColor: '#F6F8F7',
              borderRadius: 100,
              height: 40,
            }}
            containerStyle={styles.searchcontainer}
            lightTheme
            round
          />
          {/*<SearchBarBuscar
          navigation={props.navigation}
          styleContainer={styles.searchcontainer}
          //onChangeText={props.onChangeText}
          onChangeSearch={onChangeSearch}
          searchQuery={searchQuery}
        />*/}
        </View>
        <View style={styles.separador}></View>
        <View style={styles.ico}>
          <TouchableOpacity style={styles.ubicacion} activeOpacity={0.5}>
            <IconButton
              icon="map-marker-outline"
              style={styles.image}
              color="black"
              onPress={() => {
                props.navigation.navigate('Mapa', {
                  data: props.comercios,
                });
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificacion} activeOpacity={0.5}>
            <IconButton icon="bell-outline" color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerTeclado: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    //height: 90,
  },
  searchcont: {
    marginLeft: 10,
    flex: 3,
    //justifyContent: 'center',
  },
  separador: {
    flex: 0.1,
  },
  ico: {
    flexDirection: 'row',
    flex: 1.2,
    marginRight: 10,
    //justifyContent: 'center',
  },
  searchcontainer: {
    backgroundColor: colors.azul,
    borderWidth: 0, //no effect
    shadowColor: colors.white, //no effect
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    color: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ubicacion: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    height: 38,
    backgroundColor: '#c9ded7', //celeste claro
    borderRadius: 50,
    marginRight: 6,
  },
  notificacion: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    height: 38,
    backgroundColor: '#eacaa1', //naranja claro
    borderRadius: 50,
    marginLeft: 6,
  },
  image: {
    height: 32,
    width: 32,
    resizeMode: 'stretch',
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(BarraSup);
