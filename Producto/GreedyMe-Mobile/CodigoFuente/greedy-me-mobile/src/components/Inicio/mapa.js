import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../../styles/colores';
import SearchBarBuscar from '../buscador/search-bar-buscar';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Carousel from 'react-native-snap-carousel';
import ubicacionMarker from '../../multimedia/ubicacion.png';

Geocoder.init('AIzaSyBMSuKle9DYdzJxk9t2GPxL98Ms296DgLU');

function Mapa(props) {
  //Recibo por props los datos de los comercios ya filtrados
  const { comercios } = props.route.params;
  //esta variable la voy a usar para guardar datos del comercio y ademas la lat y lng
  const [listaComercios, setListaComercios] = React.useState(comercios);
  //esta variable la uso para guardar la ubicacion del usuario si es que la tiene activada, si no la tiene le seteo por defecto el centro de Córdoba Capital
  const [ubicacion, setUbicacion] = React.useState({
    latitude: -31.4212352,
    longitude: -64.1826816,
    latitudeDelta: 0.15,
    longitudeDelta: 0.15,
  });

  React.useEffect(() => {
    if (props.location) {
      setUbicacion({
        latitude: props.location.coords.latitude,
        longitude: props.location.coords.longitude,
        latitudeDelta: 0.15,
        longitudeDelta: 0.15,
      });
    }
  }, [props.location]);
  const _map = React.useRef(null);

  return (
    <View style={styles.map}>
      <MapView
        ref={_map}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        loadingEnabled={true}
        //La region seria cordoba, esas coordenadas son las del centro de Cordoba, pero en un futuro tendria que ser la ubicacion de la persona
        region={ubicacion}
      >
        {
          // Recorro toda la lista de comercios y guardo las coordenadas, le pongo un titulo y una descripcion (la direccion)
        }
        {listaComercios
          ? listaComercios.map((comercio, index) => {
              return (
                <MapView.Marker
                  key={index}
                  coordinate={comercio.location} //Le paso las coordenadas
                  title={`${comercio.nombre} - ${comercio.sucursal}`} //El nombre
                  description={comercio.direccion} // Y una descripcion que seria mas info.
                />
              );
            })
          : null}
        {props.permisoGeo ? (
          <MapView.Marker
            coordinate={{
              latitude: ubicacion.latitude,
              longitude: ubicacion.longitude,
            }}
          >
            <Image source={ubicacionMarker} style={styles.marker} />
          </MapView.Marker>
        ) : null}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  marker: {
    width: 30,
    height: 30,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    permisoGeo: state.user.permisoGeo,
    location: state.user.location,
  };
};

export default connect(mapStateToProps)(Mapa);
