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
  const LeftContent = (props) => (
    <Image
      style={styles.image}
      source={require('../../multimedia/adidas.jpg')}
    />
  );

  const RightContent = (props) => (
    <View>
      <Title>10%</Title>
    </View>
  );

  return (
    <SafeAreaView>
      {/* <FlatList
        data={props.comercios}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        renderItem={(data) => (
          <TouchableWithoutFeedback onPress={() => {}}> */}
      <View>
        <Card style={styles.contList}>
          <List.Item
            title="Club Personal"
            titleStyle={styles.titulo}
            description="Válido hasta el 31/10/2020"
            style={styles.lista}
            right={() => <Title style={styles.beneficio}>10%</Title>}
            left={() => (
              <Image
                style={styles.image}
                source={require('../../multimedia/adidas.jpg')}
              />
            )}
          />
        </Card>
      </View>
      <View style={styles.card}>
        <View>
          <Image
            style={styles.image2}
            source={require('../../multimedia/adidas.jpg')}
          />
        </View>
        <View
          style={{
            height: 100,
            width: 1,
            backgroundColor: colors.grey,
            marginRight: 15,
            marginLeft: 4,
          }}
        />
        <View>
          <Title>Club Personal</Title>
          <Title
            style={{
              color: colors.celeste,
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
      {/* </TouchableWithoutFeedback>
        )}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  image: {
    height: 80,
    width: 80,
    marginRight: 10,
    borderRadius: 100,
  },
  image2: {
    height: 80,
    width: 80,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 100,
  },
  titulo: {
    marginBottom: 4,
    fontSize: 17,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 5,
    margin: 15,
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
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(CuponesComercio);
