import * as React from 'react';
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { Avatar, Divider, List } from 'react-native-paper';
import { connect } from 'react-redux';
import { signOut } from '../../../redux/actions/auth-actions';
import { colors } from '../../styles/colores';

function Perfil(props) {
  const handleCerrarSesion = () => {
    props.navigation.navigate('PantallaLogo');
    props.signOut();
  };
  return (
    <View style={styles.contenedor}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={'transparent'}
      />
      {props.deslogeo ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size="large" color="orange" />
          <Text></Text>
          <Text
            style={{
              fontFamily: 'Roboto',
              fontWeight: '600',
            }}
          >
            Cerrando sesión...
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.subtitulo}>
            <Avatar.Icon
              style={styles.avatar}
              size={70}
              icon="account-outline"
            />
            <Text style={styles.contenidoSubtitulo}>
              {props.profile.nombre + ' ' + props.profile.apellido}
            </Text>
          </View>
          <View style={styles.misDatos}>
            <List.Section>
              <List.Subheader>Mis datos</List.Subheader>
              <List.Item
                title="Datos personales"
                style={styles.listItem}
                left={(props) => <List.Icon icon="account" color="#707070" />}
                right={(props) => (
                  <List.Icon icon="chevron-right" color="#707070" size={20} />
                )}
                onPress={() => {
                  props.navigation.navigate('MisDatos');
                }}
              />
            </List.Section>
          </View>
          <View style={styles.miConfig}>
            <List.Section>
              <List.Subheader>Configuración</List.Subheader>
              <List.Item
                title="Gestión de notificaciones"
                style={styles.listItem}
                left={(props) => <List.Icon icon="bell" color="#707070" />}
                right={(props) => (
                  <List.Icon icon="chevron-right" color="#707070" size={20} />
                )}
                onPress={() => {
                  props.navigation.navigate('GestionarNotificaciones');
                }}
              />
              <List.Item
                title="Gestión de ubicación"
                style={styles.listItem}
                left={(props) => (
                  <List.Icon icon="map-marker" color="#707070" />
                )}
                right={(props) => (
                  <List.Icon icon="chevron-right" color="#707070" size={20} />
                )}
                onPress={() => {
                  props.navigation.navigate('GestionarUbicacion');
                }}
              />
              <List.Item
                title="Gestión de proveedores"
                style={styles.listItem}
                left={(props) => <List.Icon icon="sale" color="#707070" />}
                right={(props) => (
                  <List.Icon icon="chevron-right" color="#707070" size={20} />
                )}
                onPress={() => {
                  props.navigation.navigate('GestionarProveedores');
                }}
              />
              {/* <List.Item
                title="Términos y condiciones"
                style={styles.listItem}
                left={(props) => (
                  <List.Icon icon="information" color="#707070" />
                )}
              /> */}
              <Divider />
              <List.Item
                title="Cerrar sesión"
                style={styles.listItem}
                left={(props) => <List.Icon icon="logout" color="#707070" />}
                onPress={handleCerrarSesion}
              />
            </List.Section>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  subtitulo: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f5f5f5',
    paddingLeft: 20,
  },
  contenidoSubtitulo: {
    color: colors.black,
    paddingLeft: 20,
    fontSize: 18,
  },
  avatar: {
    backgroundColor: colors.avatar,
  },
  misDatos: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.white,
  },
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
  },
  miConfig: {
    flex: 3,
    width: '100%',
    backgroundColor: colors.white,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    deslogeo: state.auth.deslogeo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);
