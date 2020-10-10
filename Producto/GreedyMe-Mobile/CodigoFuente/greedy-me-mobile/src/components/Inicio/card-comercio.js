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

function CardComercio(props) {
  return (
    <View style={styles.cardCom}>
      <Card style={styles.cardCom}>
        <List.Item
          title="Nombre comercio"
          description="Sucursal"
          onPress={''}
          right={(props) => (
            <IconButton
              icon="heart"
              color="#e1e1e1"
              size={25}
              style={styles.corazonIcon}
              onPress={() => console.log('Pressed')}
            />
          )}
          left={(props) => (
            <Image
              style={styles.image}
              source={require('../../multimedia/adidas.jpg')}
            />
          )}
        />
      </Card>
      {/* <Divider style={{ height: 0.5 }} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  cardCom: {
    height: 100,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    elevation: 3,
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
