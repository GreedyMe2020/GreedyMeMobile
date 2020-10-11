import * as React from 'react';
import { StyleSheet, StatusBar, View, Text } from 'react-native';
import * as Location from 'expo-location';
import { LogBox } from 'react-native';
import { connect } from 'react-redux';
import CardComercio from '../Inicio/card-comercio';
import BarraSup from '../Inicio/barra-superior';

//esconde los warnings
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

function Inicio({ navigation }, props) {
  //estados para el permiso de ubicacion
  const [estadoGeo, setEstadoGeo] = React.useState(null);
  const [errorMsgGeo, setErrorMsgGeo] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsgGeo('El permiso para acceder a la ubicación fue denegado');
        setEstadoGeo(status);
      } else {
        setEstadoGeo(status);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={'transparent'}
      />
      <BarraSup navigation={props.navigation} />
      <View style={styles.cards}>
        <CardComercio navigation={props.navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  barraSup: {
    flex: 1,
  },
  cards: {
    flex: 6,
    width: '100%',
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Inicio);
