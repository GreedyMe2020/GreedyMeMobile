import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { colors } from '../../styles/colores';
import { Button } from 'react-native-paper';

function ValidacionGreedyPoints1(props) {
  return (
    <View style={{ backgroundColor: colors.white }}>
      <Text style={{ fontSize: 17 }}>Tu cupón fue validado con éxito</Text>
      <Text style={{ fontSize: 17 }}>Sumaste</Text>
      <TouchableWithoutFeedback>
        <View style={styles.cat}>
          <TouchableOpacity style={styles.categorias}>
            <Text style={styles.texto}>50</Text>
            <View style={styles.titulo}>
              <Text style={styles.letraBlanca}>gre</Text>
              <Text style={styles.letraVerde}>edy</Text>
              <Text style={styles.letraNaranja}>Points</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>

      <Button
        onPress={() => {
          props.navigation.navigate('EncuestaExtraGP');
        }}
      >
        Contestar
      </Button>
      <Button>Volver al inicio</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.avatar,
  },
  content: {
    backgroundColor: colors.avatar,
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
  },
  cont: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  cat: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categorias: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    backgroundColor: colors.azul,
    borderRadius: 150,
  },
  image: {
    margin: 5,
    height: 45,
    width: 45,
    resizeMode: 'stretch',
  },
  texto: {
    fontSize: 50,
    marginTop: -5,
    color: colors.white,
  },
  titulo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  letraBlanca: {
    color: colors.white,
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
  },
  letraVerde: {
    color: colors.celeste,
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
  },
  letraNaranja: {
    color: colors.naranja,
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(ValidacionGreedyPoints1);
