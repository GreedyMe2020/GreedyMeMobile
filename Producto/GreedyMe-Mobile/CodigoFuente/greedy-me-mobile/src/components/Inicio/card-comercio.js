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

function CardComercio(props) {
  return (
    <View style={styles.cardCom}>
      {comercios
        ? comercios.map((com) => {
            return (
              <Card style={styles.cardCom}>
                <List.Item
                  title={com.nombreComercio}
                  description={com.sucursal}
                  right={(props) => (
                    <IconButton
                      icon="heart"
                      color={colors.avatar}
                      size={25}
                      style={styles.corazonIcon}
                      onPress={() => console.log('Pressed')}
                    />
                  )}
                  left={(props) => (
                    <Image
                      style={styles.image}
                      source={{
                        uri: com.photoURL,
                      }}
                    />
                  )}
                />
              </Card>
            );
          })
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  cardCom: {
    height: 100,
    marginRight: 10,
    marginLeft: 10,
    elevation: 3,
    marginBottom: 5,
  },
  cardComercio: {
    height: 100,
    marginRight: 10,
    marginLeft: 10,
  },
  contenidoCard: {
    flexDirection: 'row',
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 3,
  },
  corazonIcon: {
    marginRight: 0,
    marginTop: 0,
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

export default connect(mapStateToProps)(CardComercio);
