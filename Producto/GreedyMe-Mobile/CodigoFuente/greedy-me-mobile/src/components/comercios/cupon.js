import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Avatar,
  IconButton,
  Button,
  Card,
  List,
  Title,
  Paragraph,
  Divider,
} from 'react-native-paper';
import { connect } from 'react-redux';
import _ from 'lodash';
import { colors } from '../../styles/colores';
import firebaseapp from '../../../firebase/config';
import { format } from 'date-fns';

function Cupon(props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.contenido}>
            <Image
              style={styles.contImagen}
              source={require('../../multimedia/personal.png')}
            />
            <View style={styles.texto}>
              <Title style={styles.titulo}>Club Personal</Title>
              <Title style={styles.beneficio}>10% OFF</Title>
              <Text style={styles.validez}>
                Válido desde el 05/11/2020 al 31/11/2020
              </Text>
              {/* Si no tiene sucursal no deberia mostrar la palabra , sucursal */}
              <Text style={styles.validez}>
                en Adidas, sucursal Patio Olmos
              </Text>
            </View>
            <View style={styles.textoSecundario}>
              <Text style={styles.validez}>- Medio de pago: tal</Text>
              <Text style={styles.validez}>- Aplica: Dias</Text>
              <Text style={styles.validez}>- Medio de pago: tal</Text>
              <Text style={styles.validez}>- Entidad crediticia: tal </Text>
              <Text style={styles.validez}>- Descripción: </Text>
              <Text style={styles.validez1}>
                - Guardá este cupón y pedí el código en la tienda para sumar
                GreedyPoints
              </Text>
            </View>
          </View>
          <View style={styles.circulos}>
            <View style={styles.contCirculo}>
              <View style={styles.circulo} />
            </View>
            <Divider
              style={{
                backgroundColor: colors.grey,
                height: 2,
                marginLeft: 45,
                marginRight: 45,
                marginTop: 25,
              }}
            />
            <View style={styles.contCirculo2}>
              <View style={styles.circuloEnd} />
            </View>
          </View>
          <View style={styles.contenedorBoton}>
            <Button
              icon="content-save-outline"
              mode="outlined"
              style={styles.botonGuardar}
              labelStyle={{ fontSize: 18, color: colors.naranja }}
            >
              Guardar
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.avatar,
    flex: 1,
    marginTop: 30,
  },
  content: {
    backgroundColor: colors.avatar,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 5,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 25,
    height: 560,
    alignContent: 'center',
    elevation: 1,
  },
  circulos: {
    marginTop: 20,
  },
  contCirculo: {
    position: 'absolute',
    justifyContent: 'center',
  },
  circulo: {
    height: 50,
    width: 50,
    backgroundColor: colors.avatar,
    borderRadius: 100,
    marginLeft: -25,
  },
  contCirculo2: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  circuloEnd: {
    height: 50,
    width: 50,
    backgroundColor: colors.avatar,
    borderRadius: 100,
    marginRight: -25,
  },
  contenido: {
    flexDirection: 'column',
    alignContent: 'center',
    marginTop: 30,
  },
  contImagen: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    height: 125,
    width: 125,
    borderRadius: 3,
  },
  divider: {
    width: 2,
    backgroundColor: colors.naranja,
  },
  texto: {
    alignItems: 'center',
    marginTop: 20,
  },
  titulo: {
    marginBottom: 10,
    fontSize: 25,
  },
  beneficio: {
    color: colors.naranja,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 15,
    fontSize: 28,
  },
  validez: {
    color: colors.darkGrey,
    marginBottom: 3,
    fontSize: 16,
  },
  validez1: {
    color: colors.darkGrey,
    marginRight: 30,
    fontSize: 16,
  },
  textoSecundario: {
    marginTop: 20,
    alignContent: 'center',
    marginLeft: 40,
  },
  contenedorBoton: {
    marginTop: 25,
  },
  botonGuardar: {
    alignSelf: 'center',
    //backgroundColor: colors.celeste,
    borderWidth: 2,
    borderColor: colors.naranja,
    backgroundColor: colors.white,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Cupon);
