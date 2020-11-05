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
import { IconButton } from 'react-native-paper';

import SearchBarBuscar from '../buscador/search-bar-buscar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
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
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={false}
        backgroundColor={colors.azul}
      />
      <View style={styles.comercioImg}>
        <Image
          resizeMode="cover"
          style={styles.logo}
          source={{ uri: data.item.photoURL }}
        />
        <IconButton
          icon="arrow-left"
          color={colors.white}
          size={25}
          onPress={() => props.navigation.goBack()}
          style={styles.icon}
        />
      </View>

      <Tab.Navigator
        backBehavior="none"
        initialRouteName="Cupones"
        tabBarOptions={{
          labelStyle: {
            fontSize: 14,
            letterSpacing: 0.4,
            fontWeight: '600',
          },
          activeTintColor: colors.naranja,
          inactiveTintColor: colors.azul,
          //pressColor: '#324D43',
          pressColor: colors.naranja,
          // indicatorStyle: {
          //   backgroundColor: colors.celeste,
          //   height: 50,
          //   opacity: 0.4,
          // },
          indicatorStyle: {
            backgroundColor: colors.naranja,
          },
          style: { backgroundColor: colors.white },
          activeBackgroundColor: { backgroundColor: '#324D43' },
        }}
      >
        <Tab.Screen
          name="Información"
          component={() => <DetalleComercio data={data} />}
        />
        <Tab.Screen
          name="Cupones"
          children={() => (
            <CuponesComercio
              idcomercio={data.item.id}
              fotocomercio={data.item.photoURL}
              nombrecomercio={data.item.nombreComercio}
            />
          )}
          //component={CuponesComercio}
          //options={{ title: data.item.id }}
        />
        <Tab.Screen name="Reseñas" component={ReseñasComercio} />
      </Tab.Navigator>
    </SafeAreaView>
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
  icon: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  comercioImg: {
    width: '100%',
  },
  img: {},
});
