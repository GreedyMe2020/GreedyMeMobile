import * as React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { connect } from 'react-redux';
import _ from 'lodash';
import { colors } from '../../styles/colores';

function GreedyShop(props) {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <View style={styles.cat}>
          <View style={styles.categorias}>
            <Text style={styles.texto}>250</Text>
            <View style={styles.titulo}>
              <Text style={styles.letraBlanca}>gre</Text>
              <Text style={styles.letraVerde}>edy</Text>
              <Text style={styles.letraNaranja}>Points</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.miConfig}>
        <List.Section>
          <List.Item
            title="Canjear puntos"
            style={styles.listItem}
            left={(props) => <List.Icon icon="gift" color="#707070" />}
            right={(props) => (
              <List.Icon icon="chevron-right" color="#707070" size={20} />
            )}
            onPress={() => {
              props.navigation.navigate('CanjearPuntos');
            }}
          />
          <List.Item
            title="Historial de canjes"
            style={styles.listItem}
            left={(props) => <List.Icon icon="file-document" color="#707070" />}
            right={(props) => (
              <List.Icon icon="chevron-right" color="#707070" size={20} />
            )}
            onPress={() => {
              props.navigation.navigate('HistorialPuntos');
            }}
          />
        </List.Section>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  cat: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 50,
  },
  categorias: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    backgroundColor: colors.azul,
    borderRadius: 150,
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
  miConfig: {
    marginTop: 30,
  },
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    marginTop: 5,
    backgroundColor: colors.avatar,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default GreedyShop;
