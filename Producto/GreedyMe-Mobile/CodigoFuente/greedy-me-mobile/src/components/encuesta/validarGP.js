import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { colors } from '../../styles/colores';
import { Button } from 'react-native-paper';

function ValidacionGreedyPoints1(props) {
  //Traigo la info del beneficio y se la asigno a la variable data,
  //y los datos del comercio a las otras variables:
  const { data } = props.route.params;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.textoIntro}>¡Gracias por contestar!</Text>
          <Text style={styles.textoIntro2}>
            Tu cupón fue validado con éxito
          </Text>
        </View>
        <TouchableWithoutFeedback>
          <View style={styles.cat}>
            <View style={styles.categorias}>
              <Text style={styles.textoSumaste}>Sumaste</Text>
              <Text style={styles.texto}>10</Text>
              <View style={styles.titulo}>
                <Text style={styles.letraBlanca}>gre</Text>
                <Text style={styles.letraVerde}>edy</Text>
                <Text style={styles.letraNaranja}>Points</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.sumaExtra}>
          <Text style={styles.textoSumaExtra}>
            Podés sumar 20 greedyPoints extras
          </Text>
          <Text style={styles.textoSumaExtra}>
            si contestas la siguiente encuesta
          </Text>
        </View>
        <View style={styles.botones}>
          <Button
            mode="outlined"
            style={styles.botonContestar}
            labelStyle={{ fontSize: 18, color: colors.white }}
            onPress={() => {
              props.navigation.navigate('EncuestaExtraGP', {
                data: data,
              });
            }}
          >
            Contestar
          </Button>
          <Button
            mode="outlined"
            style={styles.botonVolverInicio}
            labelStyle={{ fontSize: 18, color: '#70708e' }}
            onPress={() => {
              props.navigation.navigate('Inicio');
            }}
          >
            Omitir
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  textoIntro: {
    fontSize: 23,
    color: colors.black,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 8,
  },
  textoIntro2: {
    fontSize: 19,
    color: colors.black,
    alignSelf: 'center',
    marginBottom: 40,
  },
  cat: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categorias: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    backgroundColor: colors.azul,
    borderRadius: 150,
  },
  image: {
    margin: 5,
    height: 45,
    width: 45,
    resizeMode: 'stretch',
  },
  textoSumaste: {
    color: colors.white,
    fontSize: 20,
  },
  texto: {
    fontSize: 65,
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
    fontSize: 21,
    fontFamily: 'Poppins-Regular',
  },
  letraVerde: {
    color: colors.celeste,
    fontSize: 21,
    fontFamily: 'Poppins-Regular',
  },
  letraNaranja: {
    color: colors.naranja,
    fontSize: 21,
    fontFamily: 'Poppins-Regular',
  },
  sumaExtra: {
    marginTop: 40,
    marginBottom: 25,
    marginLeft: 25,
    marginRight: 25,
  },
  textoSumaExtra: {
    fontSize: 19,
    color: colors.black,
    textAlign: 'center',
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  botonContestar: {
    alignSelf: 'center',
    backgroundColor: colors.azul,
  },
  botonVolverInicio: {
    alignSelf: 'center',
    marginLeft: 10,
    borderColor: '#9595ad',
    borderWidth: 1,
    width: 115,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(ValidacionGreedyPoints1);
