import React from 'react';
import { Text, View, StatusBar, StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import CardComercio from '../Inicio/card-comercio';
import firebaseapp from '../../../firebase/config';
import { colors } from '../../styles/colores';
import { IconButton } from 'react-native-paper';

const firestore = firebaseapp.firestore();
/*const comercios = [];
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
obtenerComercios();*/

function ComerciosPorRubro(props) {
  const { data, comercios } = props.route.params;
  const [listaComercios, setListaComercios] = React.useState([]);
  const [rubro, setRubro] = React.useState(data.item.nombre);

  React.useEffect(() => {
    const comerciosFinales = [];
    comercios.forEach((comercio) => {
      if (comercio.rubro === rubro) {
        comerciosFinales.push(comercio);
      }
    });
    let set = new Set(comerciosFinales.map(JSON.stringify));
    let arrSinDuplicaciones = Array.from(set).map(JSON.parse);
    setListaComercios(arrSinDuplicaciones);
  }, [rubro]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={'transparent'}
      />
      <View style={styles.barraSup}>
        <IconButton
          icon="arrow-left"
          color={colors.white}
          size={30}
          onPress={() => props.navigation.goBack()}
          style={styles.icon}
        />
        <Text style={styles.header}>{data.item.nombre}</Text>
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
  barraSup: {
    width: '100%',
    height: 90,
    backgroundColor: colors.azul,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  header: {
    color: colors.white,
    fontSize: 22,
    marginTop: 25,
    marginLeft: 10,
  },
  icon: {
    marginTop: 30,
    marginLeft: 15,
  },
  proveedores: {
    flex: 4,
    justifyContent: 'flex-start',
    marginTop: 15,
  },
});

export default ComerciosPorRubro;
