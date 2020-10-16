import * as React from 'react';
import { StyleSheet, Image, StatusBar, View, Text } from 'react-native';
import {
  Avatar,
  Button,
  Card,
  IconButton,
  List,
  Title,
  Paragraph,
  Divider,
} from 'react-native-paper';
import { connect } from 'react-redux';
import firebaseapp from '../../../firebase/config';
import _ from 'lodash';
import { colors } from '../../styles/colores';
import Carousel from 'react-native-snap-carousel';

const firestore = firebaseapp.firestore();
const comercios = [];
const obtenerComercios = () => {
  firestore.collection('usuarioComercio').onSnapshot((snapShots) => {
    snapShots.forEach((doc) => {
      const data = doc.data();
      comercios.push({
        ...data,
        id: doc.id,
      });
    });
  });
};
obtenerComercios();
/* const renderItem = ({ com, item, index }) => {
  return (
    <Card style={styles.cardComercio}>
      <Card.Cover
        style={styles.image}
        source={{
          uri: com.photoURL,
        }}
      />
      <Card.Content>
        <Title style={styles.tittle}>{com.nombreComercio}</Title>
        <Paragraph style={styles.subtittle}>{com.sucursal}</Paragraph>
      </Card.Content>
    </Card>
  );
};

const carousel = React.createRef(); */

function CardPremium(props) {
  return (
    <View style={styles.cardCom}>
      {comercios
        ? comercios.map((com) => {
            return (
              <Card style={styles.cardComercio}>
                <Card.Cover
                  style={styles.image}
                  source={{
                    uri: com.photoURL,
                  }}
                />
                <Card.Content>
                  <Title style={styles.tittle}>{com.nombreComercio}</Title>
                  <Paragraph style={styles.subtittle}>{com.sucursal}</Paragraph>
                </Card.Content>
              </Card>
            );
          })
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  cardCom: {
    height: 30,
    marginRight: 10,
    marginLeft: 10,
    flexDirection: 'row',
  },
  cardComercio: {
    height: 235,
    width: 200,
    marginRight: 10,
    marginLeft: 10,
  },
  image: {
    height: 170,
    width: 200,
    borderRadius: 3,
  },
  tittle: {
    marginTop: 5,
  },
  subtittle: {
    color: colors.darkGrey,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(CardPremium);
