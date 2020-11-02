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
      <View style={{ backgroundColor: colors.avatar, marginTop: 30 }}>
        <View style={styles.card}>
          <View style={styles.circulo} />
          <Avatar.Image
            style={styles.contImagen}
            size={80}
            source={require('../../multimedia/personal.png')}
          />
          <View
            style={{
              height: 100,
              width: 1,
              backgroundColor: colors.grey,
              marginRight: 25,
              marginLeft: 4,
            }}
          />
          <View>
            <Title>Club Personal</Title>
            <Title
              style={{
                color: colors.naranja,
                marginTop: -2,
                marginBottom: 5,
                fontSize: 23,
              }}
            >
              10% OFF
            </Title>
            <Text style={{ color: colors.darkGrey }}>
              Válido hasta el 31/10/2020
            </Text>
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
  contList: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 8,
    marginTop: 30,
  },
  lista: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image2: {
    height: 80,
    width: 80,
    marginRight: 10,
    marginLeft: 10,
    //borderRadius: 100,
  },
  contImagen: {
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: 'transparent',
  },
  titulo: {
    marginBottom: 4,
    fontSize: 17,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 25,
    flexDirection: 'row',
    height: 110,
    justifyContent: 'flex-start',
    alignItems: 'center',
    elevation: 1,
  },
  beneficio: {
    alignSelf: 'center',
    marginRight: 10,
    fontSize: 25,
    color: colors.naranja,
  },
  circulo: {
    height: 30,
    width: 30,
    backgroundColor: colors.avatar,
    borderRadius: 100,
    position: 'absolute',
    marginTop: 55,
    marginLeft: -15,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(CuponesComercio);
