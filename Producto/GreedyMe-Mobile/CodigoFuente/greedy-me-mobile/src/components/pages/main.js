import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Inicio from './inicio';
import Cupones from './cupones';
import Favoritos from './favoritos';
import Buscador from './buscar';
import Perfil from './perfil';
import { connect } from 'react-redux';
import { setearLogeo } from '../../../redux/actions/auth-actions';
import firebaseapp from '../../../firebase/config';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
const firestore = firebaseapp.firestore();

const Tab = createMaterialBottomTabNavigator();

function Main(props) {
  return (
    <Tab.Navigator initialRouteName="Inicio" activeColor="white">
      <Tab.Screen
        name="Inicio"
        component={Inicio}
        options={{
          tabBarLabel: 'Inicio',
          tabBarColor: '#1E1B4D',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Buscador"
        component={Buscador}
        options={{
          tabBarLabel: 'Buscar',
          tabBarColor: '#76B39D',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Cupones"
        component={Cupones}
        options={{
          tabBarLabel: 'Cupones',
          tabBarColor: '#F7941E',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="ticket-percent"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={Favoritos}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarColor: '#76B39D',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarLabel: 'Perfil',
          tabBarColor: '#1E1B4D',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(Main);
