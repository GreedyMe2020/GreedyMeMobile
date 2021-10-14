import * as React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { DataTable, IconButton, Portal, Dialog, Button, Paragraph } from 'react-native-paper';
import { connect } from 'react-redux';
import _ from 'lodash';
import { colors } from '../../styles/colores';
import firebaseapp from '../../../firebase/config';
import { format } from 'date-fns';


function GreedyShopHistorial(props) {
  const [productosCanjeadosTotal, setProductosCanjeadosTotal] = React.useState(
    [],
  );

  const [visible, setVisible] = React.useState(false);

  const [direccionRetiro, setDireccionRetiro] = React.useState();
  const [fechaRetiro, setFechaRetiro] = React.useState();
  const hideModal = () => setVisible(false);


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

        const fechaRetiro = element.fecha.toDate();
        fechaRetiro.setDate(fechaRetiro.getDate() + 5);
        const formatoFechaRetiro = format(fechaRetiro, 'dd/MM/yyyy');

        arrayFinal.push({
          key: element.id,
          fecha: formatoFecha,
          producto: element.nombreProducto,
          greedyPoints: element.greedyPoints,
          direccion: element.direccionRetiro,
          fechaRetiro: formatoFechaRetiro,
        });
      });
      setProductosCanjeadosTotal(arrayFinal);
    } catch (error) {
      console.log(error);
    }
  };

  //Traigo todos los productos canjeados del usuario.
  React.useEffect(() => {
    obtenerProductosCanjeados();
  }, []);

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header style={styles.header}>
          <DataTable.Title style={styles.headerTextF}>Fecha</DataTable.Title>
          <DataTable.Title style={styles.headerTextP}>Producto</DataTable.Title>
          <DataTable.Title numeric style={styles.headerTextGP}>
            GreedyPoints
          </DataTable.Title>
          <DataTable.Title style={styles.headerTextR}>Retiro</DataTable.Title>
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
              <DataTable.Cell numeric style={styles.headerTextR}>
                <IconButton
                  icon="information-outline"
                  color={colors.naranja}
                  size={20}
                  onPress={() => { setDireccionRetiro(element.direccion); setFechaRetiro(element.fechaRetiro); setVisible(true); }}
                />
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
      <Portal>
        <Dialog visible={visible} onDismiss={hideModal}>
          <Dialog.Title>Información de retiro</Dialog.Title>
          <Dialog.Content style={{ marginBottom: -10 }}>
            <Paragraph style={{ fontSize: 16 }}>
              {'Dirección: ' + direccionRetiro}
            </Paragraph>
            <Paragraph style={{ fontSize: 16 }}>
              {'Fecha límite: ' + fechaRetiro}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={{ marginRight: 8 }}>
            <Button
              onPress={hideModal}
              style={{ fontSize: 17 }}
            >
              Cerrar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
    width: 30,
  },
  headerTextP: {
    justifyContent: 'flex-start',
  },
  headerTextGP: {
    justifyContent: 'center',
  },
  headerTextR: {
    justifyContent: 'center',
    flex: 0.5,
  },
  producto: {
    justifyContent: 'flex-start',
  },
  points: {
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(GreedyShopHistorial);
