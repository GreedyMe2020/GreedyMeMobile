import * as React from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { colors } from '../../styles/colores';
import { connect } from 'react-redux';
import CardComercioFav from '../favoritos/card-comercio-fav';

function Favoritos(props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={'transparent'}
      />
      <Text style={styles.texto}>Locales</Text>
      <ScrollView style={styles.scroll}>
        <View>
          <CardComercioFav navigation={props.navigation} />
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
/*const styles = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});*/
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Favoritos);
