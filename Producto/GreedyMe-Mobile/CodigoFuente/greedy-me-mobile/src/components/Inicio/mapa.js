import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { SearchBar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { colors } from '../../styles/colores';
import SearchBarBuscar from '../buscador/search-bar-buscar';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyCBJZ7n6qX4fqB9BEqLFmf9PNq3UnNzLJI');

function Mapa(props) {
  //Aca guardo el centro del mapa que estará ubicado en la ciudad de CBA
  const center = {
    latitude: -31.4212352,
    longitude: -64.1826816,
  };

  //Recibo por props los datos de los comercios ya filtrados
  const { comercios } = props.route.params;
  //esta variable la voy a usar para guardar datos del comercio y ademas la lat y lng
  const [listaComercios, setListaComercios] = React.useState([]);

  React.useEffect(() => {
    setListaComercios([]);
    let comerciosCercanos = [];
    console.log(comercios);
    console.log({ comercios });
    comercios.forEach((comercio) => {
      comercio.direccion
        ? Geocoder.from(comercio.direccion)
            .then((json) => {
              var location = json.results[0].geometry.location;
              console.log(location);
              //guardo en un array, los datos de los comercios a mostrar en el mapa.
              //comerciosCercanos.push({location: location, direccion: comercio.direccion, nombre: comercio.nombreComercio, sucursal: comercio.sucursal, web: comercio.web)};
            })
            .catch((error) => console.warn(error))
        : null;
    });
    setListaComercios(comerciosCercanos);
  }, [comercios]);

  return (
    <MapView
      style={styles.map}
      loadingEnabled={true}
      region={{
        latitude: -31.4212352,
        longitude: -64.1826816,
        latitudeDelta: 0.15,
        longitudeDelta: 0.15,
      }}
      //onRegionChange={this.onRegionChange}
    >
      {console.log('RENDER')}
      {console.log(comercios)}
      {/*this.state.markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
        />
      ))*/}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Mapa);
