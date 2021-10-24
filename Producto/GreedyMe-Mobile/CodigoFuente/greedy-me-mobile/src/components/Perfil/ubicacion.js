import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Switch } from 'react-native-paper';
import { connect } from 'react-redux';
import { signIn } from '../../../redux/actions/auth-actions';
import * as Location from 'expo-location';
import { guardarGeolocalizacion } from '../../../redux/actions/user-actions';
import { quitarGeolocalizacion } from '../../../redux/actions/user-actions';

function Ubicacion(props) {
  const [ubicacion, setUbicacion] = React.useState(false);

  //Esta es la función que cambia el estado del Switch cuando le haces 'tap'
  const onToggleSwitchUbi = () => {
    //cambia el estado pero al próximo render por eso los if del "getLocation" están invertidos porque se corre el useEffect tambien.
    setUbicacion(!ubicacion);
    getLocation();
  };

  //Consigo la ubicacion
  const getLocation = async () => {
    if (ubicacion === true) {
      //La quito
      props.quitarGeolocalizacion();
    } else {
      //Pido la localización.
      await Location.getCurrentPositionAsync().then((value) =>
        props.guardarGeolocalizacion(value),
      );
    }
  };

  React.useEffect(() => {
    if (props.permisoGeo && ubicacion === false) {
      //Si ya tiene la ubicación activada de cuando ingresó por primera vez, seteo a true el marcador (Switch)
      setUbicacion(!ubicacion);
    }
  }, [props.permisoGeo, ubicacion]);

  return (
    <View style={styles.contenedor}>
      <List.Section style={styles.contenedorLista}>
        <List.Subheader>Acceder a mi ubicación</List.Subheader>
        <List.Item
          title="Ubicación"
          style={styles.listItem}
          right={(props) => (
            <Switch value={ubicacion} onValueChange={onToggleSwitchUbi} />
          )}
        />
      </List.Section>
    </View>
  );
}
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  contenedorLista: {
    top: 10,
  },
  listItem: {
    height: 60,
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    permisoGeo: state.user.permisoGeo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch(signIn(user)),
    guardarGeolocalizacion: (location) =>
      dispatch(guardarGeolocalizacion(location)),
    quitarGeolocalizacion: () => dispatch(quitarGeolocalizacion()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ubicacion);
