import * as React from 'react';
import {
  StyleSheet,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { Appbar, IconButton, List, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

function BarraSup(props) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchcont}>
        <Searchbar
          placeholder="Buscar comercio"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.search}
        />
      </View>
      <View style={styles.ico}>
        <IconButton
          icon="map-marker-outline"
          style={{ paddingLeft: 6 }}
          color="black"
        />
        <IconButton icon="bell-outline" color="black" />
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
    flex: 3,
  },
  search: {
    borderRadius: 100,
    height: 36,
    backgroundColor: '#FBFBFB',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    borderWidth: 0, //no effect
    shadowColor: 'white', //no effect
  },
  ico: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(BarraSup);
