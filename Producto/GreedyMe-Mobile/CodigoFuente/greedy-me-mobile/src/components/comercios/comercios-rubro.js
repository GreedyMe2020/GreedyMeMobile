import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import CardComercio from '../Inicio/card-comercio';
import firebaseapp from '../../../firebase/config';
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

function ComerciosPorRubro(props) {
  const { data } = props.route.params;
  const [listaComercios, setListaComercios] = React.useState(comercios);
  const [rubro, setRubro] = React.useState(data.item.nombre);

  React.useEffect(() => {
    const comerciosFinales = [];
    comercios.forEach((comercio) => {
      if (comercio.rubro === rubro) {
        comerciosFinales.push(comercio);
      }
    });
    setListaComercios(comerciosFinales);
  }, [rubro]);

  return (
    <SafeAreaView style={styles.container}>
      <View styles={styles.container}>
        <Text>{data.item.nombre}</Text>
      </View>
      <View style={styles.proveedores}>
        <CardComercio
          comercios={listaComercios}
          navigation={props.navigation}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  proveedores: {
    flex: 4,
    justifyContent: 'flex-start',
    marginLeft: 22,
    marginRight: 10,
    paddingBottom: 50,
  },
});

export default ComerciosPorRubro;
