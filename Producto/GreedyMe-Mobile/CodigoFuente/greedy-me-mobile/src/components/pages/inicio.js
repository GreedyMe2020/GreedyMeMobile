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
import * as Location from 'expo-location';
import { LogBox } from 'react-native';
import { connect } from 'react-redux';
import CardComercio from '../Inicio/card-comercio';
import BarraSup from '../Inicio/barra-superior';
import ButtonCategorias from '../Inicio/button-categorias';
import { colors } from '../../styles/colores';
import CardPremium from '../Inicio/card-premium';
import Constants from 'expo-constants';

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
    <KeyboardAvoidingView
      style={styles.containerTeclado}
      behavior={Platform.OS === 'ios' ? '' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      enabled={Platform.OS === 'ios'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor={colors.avatar} />
          <View style={styles.barraSup}>
            <BarraSup navigation={props.navigation} />
          </View>
          <View style={styles.categorias}>
            <Text style={styles.texto}>Categorías</Text>
            <ButtonCategorias navigation={props.navigation} />
          </View>
          <View style={styles.premium}>
            <Text style={styles.texto}>Locales premium</Text>
            <CardPremium navigation={props.navigation} />
          </View>
          <View style={styles.cards}>
            <Text style={styles.texto}>Locales</Text>
            <CardComercio navigation={props.navigation} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  barraSup: {
    flex: 0.5,
  },
  categorias: {
    flex: 3,
    marginTop: 40,
    marginLeft: 20,
  },
  premium: {
    flex: 7,
    width: '100%',
    marginTop: 50,
  },
  cards: {
    flex: 4,
    width: '100%',
    marginTop: 20,
  },
  texto: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: colors.darkGrey,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Inicio);
