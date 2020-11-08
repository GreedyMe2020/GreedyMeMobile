import * as React from 'react';
import {
  StyleSheet,
  Image,
  StatusBar,
  View,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
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

const firestore = firebaseapp.firestore();
const comerciosPremium = [];
const obtenerComercios = () => {
  firestore
    .collection('usuarioComercio')
    .where('tipoSuscripcion', '==', 2)
    .onSnapshot((snapShots) => {
      snapShots.forEach((doc) => {
        const data = doc.data();
        comerciosPremium.push({
          ...data,
          id: doc.id,
        });
      });
    });
};
obtenerComercios();

function CardPremium(props) {
  return (
    <SafeAreaView style={styles.flatlist}>
      <FlatList
        data={comerciosPremium}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={(data) => (
          <TouchableWithoutFeedback>
            <Card
              style={styles.cardComercio}
              onPress={() => {
                props.navigation.navigate('ComerciosNavegador', {
                  data: data,
                });
              }}
            >
              <Card.Cover
                style={styles.image}
                source={{
                  uri: data.item.photoURL,
                }}
              />
              <Card.Content>
                <Title style={styles.tittle}>{data.item.nombreComercio}</Title>
                <Paragraph style={styles.subtittle}>
                  {data.item.sucursal}
                </Paragraph>
              </Card.Content>
            </Card>
          </TouchableWithoutFeedback>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardComercio: {
    marginRight: 7,
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 3,
    elevation: 3,
    borderRadius: 7,
    borderColor: colors.avatar,
  },
  image: {
    height: 170,
    width: 180,
    borderRadius: 3,
  },
  tittle: {
    marginTop: 8,
    fontSize: 18,
  },
  subtittle: {
    color: colors.darkGrey,
    marginTop: -2,
    fontSize: 14,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(CardPremium);

/*function CardPremium(props) {
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
}*/
