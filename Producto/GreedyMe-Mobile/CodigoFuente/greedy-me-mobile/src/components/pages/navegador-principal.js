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
import Mapa from '../Inicio/mapa';
import Notificaciones from '../Perfil/notificaciones';
import Ubicacion from '../Perfil/ubicacion';
import CambiarContraseña from '../Perfil/cambiarContraseña';
import Proveedores from '../Proveedores/ini-proveedores';
import ProveedoresLogin from '../Proveedores/login-proveedores';
import OlvideContraseña from '../Iniciar sesion/olvide-contraseña';
import VerificarCuenta from '../Iniciar sesion/verificar-cuenta';
import ComerciosNav from '../comercios/comercios-principal';
import ComerciosPorRubro from '../comercios/comercios-rubro';
import Cupon from '../comercios/cupon';
import Validarcupones from '../mis cupones/validar-cupones';
import { connect } from 'react-redux';
import ValidacionGreedyPoints1 from '../encuesta/validarGP';
import EncuestaExtraGP from '../encuesta/encuesta-extraGP';
import GreedyShop from '../pages/greedy-shop';
import GreedyShopCanje from '../greedypoints/greedy-canje';
import GreedyShopHistorial from '../greedypoints/greedy-historial';
import ProductoACanjear from '../greedypoints/producto-canjear';
import { setearDesLogeo } from '../../../redux/actions/auth-actions';
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
  if (props.deslogeo) {
    props.setearDesLogeo('False');
  }
  const [estaLogeado, setEstaLogeado] = useState(null);
  useEffect(() => {
    if (props.auth.uid) {
      setTimeout(() => {
        setEstaLogeado(true);
      }, 2000);
    } else {
      setTimeout(() => {
        setEstaLogeado(false);
      }, 2000);
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
                animationEnabled: false,
                gestureDirection: 'horizontal',
              })}
            />
            <Stack.Screen
              name="Mapa"
              component={Mapa}
              options={({ route }) => ({
                title: 'Locales cercanos',
                headerShown: true,
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: '#1E1B4D',
                },
                animationEnabled: false,
                gestureDirection: 'horizontal',
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
                animationEnabled: false,
                gestureDirection: 'horizontal',
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
                animationEnabled: false,
                gestureDirection: 'horizontal',
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
                animationEnabled: false,
                gestureDirection: 'horizontal',
              })}
            />
            <Stack.Screen
              name="ComerciosNavegador"
              component={ComerciosNav}
              options={({ route }) => ({
                title: 'Comercios',
                headerShown: false,
                headerTintColor: 'black',
                headerStyle: {
                  backgroundColor: 'white',
                },
                animationEnabled: false,
                gestureDirection: 'horizontal',
              })}
            />
            <Stack.Screen
              name="ComerciosPorRubro"
              component={ComerciosPorRubro}
              options={({ route }) => ({
                title: 'Rubro',
                headerShown: false,
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: '#1E1B4D',
                },
                animationEnabled: false,
                gestureDirection: 'horizontal',
              })}
            />
            <Stack.Screen
              name="Cupon"
              component={Cupon}
              options={({ route }) => ({
                title: 'Cupon',
                headerShown: false,
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: '#1E1B4D',
                },
                animationEnabled: false,
                gestureDirection: 'horizontal',
              })}
            />
            <Stack.Screen
              name="Validar-cupones"
              component={Validarcupones}
              options={({ route }) => ({
                title: 'Mis cupones',
                headerShown: true,
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: '#F7941E',
                },
                animationEnabled: false,
                gestureDirection: 'horizontal',
              })}
            />
            <Stack.Screen
              name="ValidacionGreedyPoints1"
              component={ValidacionGreedyPoints1}
              options={{
                title: 'GreedyPoints',
                headerLeft: null,
                headerShown: true,
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: '#1E1B4D',
                },
                animationEnabled: false,
                gestureDirection: 'horizontal',
              }}
            />
            <Stack.Screen
              name="EncuestaExtraGP"
              component={EncuestaExtraGP}
              options={{
                title: 'Encuesta',
                headerLeft: null,
                headerShown: true,
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: '#1E1B4D',
                },
                animationEnabled: false,
                gestureDirection: 'horizontal',
              }}
            />
            <Stack.Screen
              name="GreedyPointsInicio"
              component={GreedyShop}
              options={{
                title: 'GreedyPoints',
                headerShown: true,
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: '#1E1B4D',
                },
                animationEnabled: false,
                gestureDirection: 'horizontal',
              }}
            />
            <Stack.Screen
              name="CanjearPuntos"
              component={GreedyShopCanje}
              options={{
                title: 'GreedyShop',
                headerShown: true,
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: '#1E1B4D',
                },
                animationEnabled: false,
                gestureDirection: 'horizontal',
              }}
            />
            <Stack.Screen
              name="HistorialPuntos"
              component={GreedyShopHistorial}
              options={{
                title: 'Historial de GreedyPoints',
                headerShown: true,
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: '#1E1B4D',
                },
                animationEnabled: false,
                gestureDirection: 'horizontal',
              }}
            />
            <Stack.Screen
              name="ProductoACanjear"
              component={ProductoACanjear}
              options={{
                title: 'Producto a canjear',
                headerShown: true,
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: '#1E1B4D',
                },
                animationEnabled: false,
                gestureDirection: 'horizontal',
              }}
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
                animationEnabled: false,
                gestureDirection: 'horizontal',
              })}
            />
            <Stack.Screen
              name="PantallaLogo"
              component={PantallaLogo}
              options={{
                headerShown: false,
                headerLeft: null,
                animationEnabled: false,
                gestureDirection: 'horizontal',
              }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ title: '', headerTransparent: true }}
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
              options={{
                title: 'Registrarme',
                headerShown: true,
                animationEnabled: false,
                gestureDirection: 'horizontal',
              }}
            />
            <Stack.Screen
              name="VerificarCuenta"
              component={VerificarCuenta}
              options={{
                title: 'Verificar mi cuenta',
                headerShown: true,
                animationEnabled: false,
                gestureDirection: 'horizontal',
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="PantallaLogo"
            component={PantallaLogo}
            options={{
              headerShown: false,
              headerLeft: null,
              animationEnabled: false,
              gestureDirection: 'horizontal',
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Settings() {
  return (
    <Stack.Navigator initialRouteName="ProveedoresLogin">
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
          animationEnabled: false,
          gestureDirection: 'horizontal',
        })}
      />
      <Stack.Screen
        name="ProveedoresLogin"
        component={ProveedoresLogin}
        options={({ route }) => ({
          title: 'Gestionar mis proveedores',
          headerShown: true,
          headerLeft: null,
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#1E1B4D',
          },
          animationEnabled: false,
          gestureDirection: 'horizontal',
        })}
      />
    </Stack.Navigator>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    deslogeo: state.auth.deslogeo,
    logeo: state.auth.logeo,
    usuarioNuevo: state.auth.usuarioNuevo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setearDesLogeo: (flag) => dispatch(setearDesLogeo(flag)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavegadorPrincipal);
