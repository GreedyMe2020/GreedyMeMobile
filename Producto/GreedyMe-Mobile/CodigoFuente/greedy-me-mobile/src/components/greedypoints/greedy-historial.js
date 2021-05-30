import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { DataTable } from 'react-native-paper';
import { connect } from 'react-redux';
import _ from 'lodash';
import { colors } from '../../styles/colores';
import firebaseapp from '../../../firebase/config';
import { format } from 'date-fns';

function GreedyShopHistorial(props) {
  const [productosCanjeadosTotal, setProductosCanjeadosTotal] = React.useState(
    [],
  );
  //Traigo todos los productos canjeados del usuario.
  React.useEffect(() => {
    const obtenerProductosCanjeados = async () => {
      const firestore = firebaseapp.firestore();
      try {
        const productosCanjeados = await firestore
          .collection('usuarioConsumidor')
          .doc(props.auth.uid)
          .collection('productosCanjeados')
          .get();
        const arrayProductosCanjeados = productosCanjeados.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          /*fecha: doc.fecha,
          nombre: doc.nombreProducto,
          greedyPoints: doc.greedyPoints,*/
        }));
        const arrayFinal = [];
        arrayProductosCanjeados.forEach((element) => {
          const formatoFecha = format(element.fecha.toDate(), 'dd/MM/yyyy');
          arrayFinal.push({
            key: element.id,
            fecha: formatoFecha,
            producto: element.nombreProducto,
            greedyPoints: element.greedyPoints,
          });
        });
        setProductosCanjeadosTotal(arrayFinal);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerProductosCanjeados();
  });

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
        {productosCanjeadosTotal.map((element) => {
          return (
            <DataTable.Row style={styles.row} key={element.id}>
              <DataTable.Cell style={styles.fecha}>
                {element.fecha}
              </DataTable.Cell>
              <DataTable.Cell numeric style={styles.producto}>
                {element.producto}
              </DataTable.Cell>
              <DataTable.Cell numeric style={styles.points}>
                {element.greedyPoints}
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
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

export default connect(mapStateToProps)(GreedyShopHistorial);
