import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { DataTable } from 'react-native-paper';
import { connect } from 'react-redux';
import _ from 'lodash';
import { colors } from '../../styles/colores';
import firebaseapp from '../../../firebase/config';

function GreedyShopHistorial(props) {
  const [productosCanjeadosTotal, setProductosCanjeadosTotal] = React.useState(
    [],
  );
  const [uid, setUid] = React.useState(props.auth.uid);
  //Traigo todos los productos canjeados del usuario.
  React.useEffect(() => {
    const obtenerProductosCanjeados = async () => {
      const firestore = firebaseapp.firestore();
      try {
        const productosCanjeados = await firestore
          .collection('usuarioConsumidor')
          .doc(uid)
          .collection('productosCanjeados')
          .get();
        const arrayProductosCanjeados = productosCanjeados.docs.map((doc) => ({
          id: doc.id,
          fecha: doc.fecha,
          nombre: doc.nombreProducto,
          greedyPoints: doc.greedyPoints,
        }));

        setProductosCanjeadosTotal(arrayProductosCanjeados);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerProductosCanjeados();
  }, []);

  return (
    <View style={styles.container}>
      {console.log(productosCanjeadosTotal)}
      <DataTable data={productosCanjeadosTotal} columns={3}>
        <DataTable.Header style={styles.header}>
          <DataTable.Title style={styles.headerTextF}>Fecha</DataTable.Title>
          <DataTable.Title style={styles.headerTextP}>Producto</DataTable.Title>
          <DataTable.Title numeric style={styles.headerTextGP}>
            GreedyPoints
          </DataTable.Title>
        </DataTable.Header>
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
