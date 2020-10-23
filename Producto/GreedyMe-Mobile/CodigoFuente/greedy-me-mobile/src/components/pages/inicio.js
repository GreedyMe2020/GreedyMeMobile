import * as React from 'react';
import {
  FlatList,
  StyleSheet,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Divider } from 'react-native-paper';
import * as Location from 'expo-location';
import { LogBox } from 'react-native';
import { connect } from 'react-redux';
import CardComercio from '../Inicio/card-comercio';
import BarraSup from '../Inicio/barra-superior';
import ButtonCategorias from '../Inicio/button-categorias';
import { colors } from '../../styles/colores';
import CardPremium from '../Inicio/card-premium';

//esconde los warnings
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

function Inicio(props) {
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
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={'transparent'}
      />
      <View style={styles.barraSup}>
        <BarraSup navigation={props.navigation} />
      </View>
      <ScrollView style={styles.scroll}>
        <View>
          <View style={styles.categorias}>
            <Text style={styles.texto}>Categorías</Text>
            <ButtonCategorias navigation={props.navigation} />
          </View>
          <Divider style={{ height: 7, backgroundColor: '#f8f8f8' }} />
          <View style={styles.premium}>
            <Text style={styles.texto}>Locales Premium</Text>
            <CardPremium navigation={props.navigation} />
          </View>
          <Divider style={{ height: 7, backgroundColor: '#f8f8f8' }} />
          <View style={styles.cards}>
            <Text style={styles.texto}>Locales</Text>
            <CardComercio navigation={props.navigation} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerTeclado: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flex: 1,
  },
  barraSup: {
    height: 90,
    backgroundColor: colors.azul,
  },
  categorias: {
    flex: 1,
    marginTop: 5,
    marginBottom: 20,
  },
  premium: {
    flex: 1,
    width: '100%',
    marginTop: 5,
    marginBottom: 20,
  },
  cards: {
    flex: 1,
    width: '100%',
    marginTop: 5,
  },

  texto: {
    marginBottom: 15,
    paddingLeft: 20,
    marginTop: 12,
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Inicio);
