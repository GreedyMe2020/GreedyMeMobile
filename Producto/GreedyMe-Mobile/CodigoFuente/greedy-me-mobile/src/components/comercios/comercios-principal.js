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
  return (
    <Tab.Navigator>
      <Tab.Screen name="Informacion" component={DetalleComercio} />
      <Tab.Screen name="Cupones" component={CuponesComercio} />
      <Tab.Screen name="Reseña" component={ReseñasComercio} />
    </Tab.Navigator>
  );
}
