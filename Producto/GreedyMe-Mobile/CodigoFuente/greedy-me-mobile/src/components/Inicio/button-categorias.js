import * as React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { StyleSheet, StatusBar, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../../styles/colores';

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
    borderColor: colors.avatar,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: colors.avatar,
    borderRadius: 50,
    marginLeft: 5,
    marginRight: 5,
  },
  image: {
    padding: 10,
    margin: 5,
    height: 32,
    width: 32,
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
