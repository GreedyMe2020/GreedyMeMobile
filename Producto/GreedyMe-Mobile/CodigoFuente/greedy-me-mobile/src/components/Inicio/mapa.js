import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../../styles/colores';
import SearchBarBuscar from '../buscador/search-bar-buscar';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Carousel from 'react-native-snap-carousel';

Geocoder.init('AIzaSyBMSuKle9DYdzJxk9t2GPxL98Ms296DgLU');

function Mapa(props) {
  //Recibo por props los datos de los comercios ya filtrados
  const { comercios } = props.route.params;
  //esta variable la voy a usar para guardar datos del comercio y ademas la lat y lng
  const [listaComercios, setListaComercios] = React.useState(comercios);

  const _map = React.useRef(null);

  return (
    <View style={styles.map}>
      <MapView
        ref={_map}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        loadingEnabled={true}
        //La region seria cordoba, esas coordenadas son las del centro de Cordoba, pero en un futuro tendria que ser la ubicacion de la persona
        region={{
          latitude: -31.4212352,
          longitude: -64.1826816,
          latitudeDelta: 0.15,
          longitudeDelta: 0.15,
        }}
      >
        {
          //console.log(listaComercios)    Este log es para que vean los datos de los comercios para el front
        }
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
      </MapView>
    </View>
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
