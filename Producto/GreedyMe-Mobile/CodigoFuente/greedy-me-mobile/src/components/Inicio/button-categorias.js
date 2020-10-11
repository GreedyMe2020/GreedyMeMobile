import * as React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { StyleSheet, StatusBar, View, Text } from 'react-native';
import { connect } from 'react-redux';

function ButtonCategorias() {
  return (
    <View>
      <TouchableOpacity style={styles.categorias} activeOpacity={0.5}>
        <Image
          source={require('../../multimedia/categorias/shirt.png')}
          style={styles.image}
        />
      </TouchableOpacity>
      <Text style={styles.texto}>Indumentaria</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  categorias: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#ECECEC',
    borderRadius: 50,
    marginLeft: 5,
    marginRight: 5,
  },
  image: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  texto: {
    marginTop: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(ButtonCategorias);
