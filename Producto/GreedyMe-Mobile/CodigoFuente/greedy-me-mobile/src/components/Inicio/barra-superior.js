import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SearchBar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

function BarraSup(props) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchcont}>
        <SearchBar
          placeholder="Buscar comercio"
          onChangeText={onChangeSearch}
          value={searchQuery}
          inputContainerStyle={{
            backgroundColor: '#ececec',
            borderRadius: 100,
            height: 38,
          }}
          containerStyle={styles.searchcontainer}
          lightTheme
          round
        />
      </View>
      <View style={styles.ico}>
        <TouchableOpacity style={styles.ubicacion} activeOpacity={0.5}>
          <IconButton
            icon="map-marker-outline"
            style={styles.image}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificacion} activeOpacity={0.5}>
          <IconButton icon="bell-outline" color="black" />
        </TouchableOpacity>
        {/* <IconButton
          icon="map-marker-outline"
          style={{ paddingLeft: 6 }}
          color="black"
        />
        <IconButton icon="bell-outline" color="black" /> */}
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
    top: 5,
  },
  searchcont: {
    marginLeft: 10,
    flex: 2.7,
  },
  searchcontainer: {
    backgroundColor: 'white',
    borderWidth: 0, //no effect
    shadowColor: 'white', //no effect
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  ico: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 15,
    marginLeft: 5,
  },
  ubicacion: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    height: 38,
    backgroundColor: '#c9ded7',
    borderRadius: 50,
    marginRight: 5,
  },
  notificacion: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    height: 38,
    backgroundColor: '#eacaa1',
    borderRadius: 50,
    marginLeft: 5,
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
