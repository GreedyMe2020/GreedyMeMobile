import React from 'react';
import { StyleSheet, StatusBar, View, Image } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../styles/colores';
import { connect } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DetalleComercio from './detalle-comercio';
import CuponesComercio from './cupones-comercio';
import ReseñasComercio from './reseñas-comercio';

const Tab = createMaterialTopTabNavigator();

export default function ComerciosNav(props) {
  //Traigo la info del comerico y se la asigno a la variable data:
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
            letterSpacing: 0.2,
            fontWeight: '600',
          },
          activeTintColor: colors.naranja,
          inactiveTintColor: colors.azul,
          pressColor: colors.naranja,
          indicatorStyle: {
            backgroundColor: colors.naranja,
          },
          style: { backgroundColor: colors.white },
          activeBackgroundColor: { backgroundColor: '#324D43' },
        }}
      >
        <Tab.Screen
          name="Información"
          children={() => <DetalleComercio data={data} />}
        />
        <Tab.Screen
          name="Cupones"
          children={() => (
            <CuponesComercio
              idcomercio={data.item.id}
              navigation={props.navigation}
              fotocomercio={data.item.photoURL}
              nombrecomercio={data.item.nombreComercio}
              sucursalcomercio={data.item.sucursal}
            />
          )}
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
