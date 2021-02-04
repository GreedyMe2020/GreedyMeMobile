import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { connect } from 'react-redux';
import _ from 'lodash';
import { colors } from '../../styles/colores';

function GreedyShopHistorial(props) {
  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header style={styles.header}>
          <DataTable.Title style={styles.headerTextF}>Fecha</DataTable.Title>
          <DataTable.Title style={styles.headerTextP}>Producto</DataTable.Title>
          <DataTable.Title numeric style={styles.headerTextGP}>
            GreedyPoints
          </DataTable.Title>
        </DataTable.Header>

        <DataTable.Row style={styles.row}>
          <DataTable.Cell style={styles.fecha}>10/05/2020</DataTable.Cell>
          <DataTable.Cell numeric style={styles.producto}>
            Cuaderno GP
          </DataTable.Cell>
          <DataTable.Cell numeric style={styles.points}>
            100
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row style={styles.row}>
          <DataTable.Cell style={styles.fecha}>20/10/2020</DataTable.Cell>
          <DataTable.Cell numeric style={styles.producto}>
            Vaso térmico
          </DataTable.Cell>
          <DataTable.Cell numeric style={styles.points}>
            150
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row style={styles.row}>
          <DataTable.Cell style={styles.fecha}>28/01/2021</DataTable.Cell>
          <DataTable.Cell numeric style={styles.producto}>
            Mate GreedyMe
          </DataTable.Cell>
          <DataTable.Cell numeric style={styles.points}>
            250
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.avatar,
  },
  headerTextF: {
    justifyContent: 'flex-start',
  },
  headerTextP: {
    justifyContent: 'flex-start',
  },
  headerTextGP: {
    justifyContent: 'center',
    flex: 0.5,
  },
  producto: {
    justifyContent: 'flex-start',
  },
  points: {
    justifyContent: 'center',
    flex: 0.5,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default GreedyShopHistorial;
