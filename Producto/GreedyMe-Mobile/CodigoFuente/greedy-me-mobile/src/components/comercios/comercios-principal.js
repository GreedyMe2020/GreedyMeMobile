import React from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import SearchBarBuscar from '../buscador/search-bar-buscar';
import SafeAreaView from 'react-native-safe-area-view';
import BuscadorProveedores from '../buscador/buscador';
import { colors } from '../../styles/colores';
import CardComercio from '../Inicio/card-comercio';
import { connect } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DetalleComercio from './detalle-comercio';
import CuponesComercio from './cupones-comercio';
import ReseñasComercio from './reseñas-comercio';

const Tab = createMaterialTopTabNavigator();

export default function ComerciosNav(props) {
  const { data } = props.route.params;
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.logo} source={{ uri: data.item.photoURL }} />
      </View>
      <Tab.Navigator
        backBehavior="none"
        initialRouteName="Cupones"
        tabBarOptions={{
          labelStyle: {
            fontSize: 15,
            letterSpacing: 0.5,
            fontWeight: '600',
          },
          activeTintColor: colors.white,
          inactiveTintColor: colors.white,
          //pressColor: '#324D43',
          indicatorStyle: {
            backgroundColor: '#324D43',
            height: 50,
            opacity: 0.4,
          },
          // indicatorStyle: {
          //   backgroundColor: colors.azul,
          // },
          style: { backgroundColor: colors.celeste },
          activeBackgroundColor: { backgroundColor: '#324D43' },
        }}
      >
        <Tab.Screen name="Información" component={DetalleComercio} />
        <Tab.Screen name="Cupones" component={CuponesComercio} />
        <Tab.Screen name="Reseñas" component={ReseñasComercio} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 200,
    width: '100%',
  },
});
