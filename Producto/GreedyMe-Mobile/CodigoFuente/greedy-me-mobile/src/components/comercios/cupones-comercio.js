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
  Card,
  List,
  Title,
  Paragraph,
  Divider,
} from 'react-native-paper';
import { connect } from 'react-redux';
import _ from 'lodash';
import { colors } from '../../styles/colores';

function CuponesComercio(props) {
  return (
    <SafeAreaView style={styles.container}>
      {/* <FlatList
        data={props.comercios}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        renderItem={(data) => (
          <TouchableWithoutFeedback onPress={() => {}}> */}
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.contCirculo}>
            <View style={styles.circulo} />
          </View>
          <View style={styles.contCirculo2}>
            <View style={styles.circuloEnd} />
          </View>
          <View style={styles.contenido}>
            <Avatar.Image
              style={styles.contImagen}
              size={72}
              source={require('../../multimedia/personal1.png')}
            />
            <Divider style={styles.divider} />
            <View style={styles.texto}>
              <Title>Club Personal</Title>
              <Title style={styles.beneficio}>10% OFF</Title>
              <Text style={{ color: colors.darkGrey }}>
                Válido hasta el 31/10/2020
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* </TouchableWithoutFeedback>
        )}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.avatar,
    flex: 1,
  },
  content: {
    backgroundColor: colors.avatar,
    marginTop: 30,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 25,
    height: 110,
    justifyContent: 'center',
    alignContent: 'center',
    elevation: 1,
  },
  contCirculo: {
    position: 'absolute',
    justifyContent: 'center',
  },
  circulo: {
    height: 40,
    width: 40,
    backgroundColor: colors.avatar,
    borderRadius: 100,
    marginLeft: -22,
  },
  contCirculo2: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  circuloEnd: {
    height: 40,
    width: 40,
    backgroundColor: colors.avatar,
    borderRadius: 100,
    marginRight: -22,
  },
  contenido: {
    flexDirection: 'row',
    alignContent: 'center',
    marginLeft: 15,
  },
  contImagen: {
    marginLeft: 14,
    marginRight: 20,
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  divider: {
    height: 100,
    width: 2,
    backgroundColor: colors.grey,
    marginRight: 22,
  },
  texto: {
    alignSelf: 'center',
  },
  beneficio: {
    color: colors.naranja,
    marginTop: -2,
    marginBottom: 5,
    fontSize: 23,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(CuponesComercio);
