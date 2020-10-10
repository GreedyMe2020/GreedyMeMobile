import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PantallaLogo from '../pantalla-logo';
import IniciarSesion from '../Iniciar sesion/inicio-sesion';
import Main from './main';
import obtenerTitulo from '../obtener-titulo';
import Registro from '../Iniciar sesion/registro';
import MisDatos from '../Perfil/datosPerfil';
import Notificaciones from '../Perfil/notificaciones';
import Ubicacion from '../Perfil/ubicacion';
import CambiarContraseña from '../Perfil/cambiarContraseña';
import Proveedores from '../Proveedores/ini-proveedores';
import OlvideContraseña from '../Iniciar sesion/olvide-contraseña';
import VerificarCuenta from '../Iniciar sesion/verificar-cuenta';
import { connect } from 'react-redux';

//Funcion para determinar el color del header del componente
// Main a partir del nombre de la ruta obtenida.
function coloresHeaderTab(tabName) {
  const colorHead =
    tabName === 'Buscar' || tabName === 'Mis favoritos'
      ? '#76B39D'
      : tabName === 'Mis cupones'
      ? '#F7941E'
      : '#1E1B4D';
  return colorHead;
}

const Stack = createStackNavigator();

function NavegadorPrincipal(props) {
  const [estaLogeado, setEstaLogeado] = useState(null);

  useEffect(() => {
    if (props.auth.uid) {
      setTimeout(() => {
        setEstaLogeado(true);
      }, 3000);
    } else {
      setTimeout(() => {
        setEstaLogeado(false);
      }, 3000);
    }
  }, [props.auth.uid]);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="screen">
        {estaLogeado ? (
          <>
            <Stack.Screen
              name="Main"
              component={Main}
              options={({ route }) => ({
                headerTitle: obtenerTitulo(route),
                headerShown: obtenerTitulo(route) === 'Inicio' ? false : true,
                headerLeft: null,
                headerStyle: {
                  backgroundColor: coloresHeaderTab(obtenerTitulo(route)),
                },
                headerTitleStyle: { color: 'white' },
              })}
            />
            <Stack.Screen
              name="MisDatos"
              component={MisDatos}
              options={({ route }) => ({
                title: 'Mis datos personales',
                headerShown: true,
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: '#1E1B4D',
                },
              })}
            />
            <Stack.Screen
              name="GestionarNotificaciones"
              component={Notificaciones}
              options={({ route }) => ({
                title: 'Gestionar mis notificaciones',
                headerShown: true,
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: '#1E1B4D',
                },
              })}
            />
            <Stack.Screen
              name="GestionarUbicacion"
              component={Ubicacion}
              options={({ route }) => ({
                title: 'Gestionar mi ubicación',
                headerShown: true,
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: '#1E1B4D',
                },
              })}
            />
            <Stack.Screen
              name="GestionarProveedores"
              component={Proveedores}
              options={({ route }) => ({
                title: 'Gestionar mis proveedores',
                headerShown: true,
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: '#1E1B4D',
                },
              })}
            />
            <Stack.Screen
              name="CambiarContraseña"
              component={CambiarContraseña}
              options={({ route }) => ({
                title: 'Cambiar contraseña',
                headerShown: true,
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: '#1E1B4D',
                },
              })}
            />
          </>
        ) : estaLogeado === false ? (
          <>
            <Stack.Screen
              name="IniciarSesion"
              component={IniciarSesion}
              options={{
                title: '',
                headerShown: false,
                animationEnabled: false,
                gestureDirection: 'horizontal',
              }}
            />
            <Stack.Screen
              name="OlvideContraseña"
              component={OlvideContraseña}
              options={{
                title: 'Olvidé mi contraseña',
                headerShown: true,
                animationEnabled: false,
                gestureDirection: 'horizontal',
              }}
            />
            <Stack.Screen
              name="Registro"
              component={Registro}
              options={{ title: 'Registrarme', headerShown: true }}
            />
            <Stack.Screen
              name="VerificarCuenta"
              component={VerificarCuenta}
              options={{
                title: 'Verificar mi cuenta',
                headerShown: true,
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Home"
            component={PantallaLogo}
            options={{
              title: 'Verificar mi cuenta',
              headerShown: false,
              headerLeft: null,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(NavegadorPrincipal);
