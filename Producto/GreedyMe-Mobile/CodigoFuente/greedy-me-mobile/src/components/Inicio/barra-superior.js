import * as React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SearchBar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { colors } from '../../styles/colores';
import Geocoder from 'react-native-geocoding';
import { useFocusEffect } from '@react-navigation/native';


Geocoder.init('AIzaSyBMSuKle9DYdzJxk9t2GPxL98Ms296DgLU');

function BarraSup(props) {
  //const [searchQuery, setSearchQuery] = React.useState('');
  //const onChangeSearch = (searchQuery) => setSearchQuery(searchQuery);

  //Recibo por props los datos de los comercios ya filtrados segun los proveedores asociados
  const [comercios, setComercios] = React.useState(props.comercios);
  //esta variable la voy a usar para guardar datos del comercio y ademas la lat y lng
  const [listaComercios, setListaComercios] = React.useState([]);
  //esta variable la uso para guardar la ubicación del usuario si es que la tiene activada

  const filtrarComercios = () => {
    setListaComercios([]);
    const comerciosCercanos = [];
    //Recorro todos los comercios y pregunto si tienen direccion para obtener la lat y lng y poder ubicarlos en el mapa
    comercios.forEach((comercio) => {
      if (comercio.direccion !== '') {
        Geocoder.from(comercio.direccion)
          .then((json) => {
            //aca pido permiso a la API para guardar la lat y lng cuando le paso la direccion de un comercio
            let location = json.results[0].geometry.location;
            //guardo en un array de objetos, los datos de los comercios a mostrar en el mapa.
            comerciosCercanos.push({
              location: { latitude: location.lat, longitude: location.lng },
              direccion: comercio.direccion,
              nombre: comercio.nombreComercio,
              sucursal: comercio.sucursal,
              web: comercio.web,
            });
          })
          .catch((error) => console.error('error al traer las coordenadas'));
      }
    });
    //Guardo todos los comercios que pude encontrar su ubicacion (porque algunos no tienen direccion)
    setListaComercios(comerciosCercanos);
  };

  useFocusEffect(
    React.useCallback(() => {
      setComercios(props.comercios);
      filtrarComercios();
    }, [props.profile.auth]),
  );

  useFocusEffect(
    React.useCallback(() => {
      setComercios(props.comercios);
      filtrarComercios();
    }, []),
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.searchcont}>
          <SearchBar
            placeholder="Buscar comercio"
            onChangeText={props.onChangeText}
            value={props.texto}
            inputContainerStyle={{
              backgroundColor: '#F6F8F7',
              borderRadius: 100,
              height: 40,
            }}
            containerStyle={styles.searchcontainer}
            lightTheme
            round
          />
        </View>
        <View style={styles.separador} />
        <View style={styles.ico}>
          <TouchableOpacity style={styles.ubicacion} activeOpacity={0.5}>
            <IconButton
              icon="map-marker-outline"
              style={styles.image}
              color="black"
              onPress={() => {
                props.navigation.navigate('Mapa', {
                  comercios: listaComercios,
                });
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerTeclado: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  searchcont: {
    marginLeft: 10,
    flex: 9,
    //justifyContent: 'center',
  },
  separador: {
    flex: 0.1,
  },
  ico: {
    flexDirection: 'row',
    flex: 1.2,
    marginRight: 10,
    //justifyContent: 'center',
  },
  searchcontainer: {
    backgroundColor: colors.azul,
    borderWidth: 0, //no effect
    shadowColor: colors.white, //no effect
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    color: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ubicacion: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    height: 38,
    backgroundColor: '#c9ded7', //celeste claro
    borderRadius: 50,
    marginRight: 6,
  },
  notificacion: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    height: 38,
    backgroundColor: '#eacaa1', //naranja claro
    borderRadius: 50,
    marginLeft: 6,
  },
  image: {
    height: 32,
    width: 32,
    resizeMode: 'stretch',
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    permisoGeo: state.user.permisoGeo,
  };
};

export default connect(mapStateToProps)(BarraSup);
