import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Divider, List } from 'react-native-paper';
import { connect } from 'react-redux';
import { signIn } from '../../../redux/actions/auth-actions';

function Perfil() {
  return (
    <View style={styles.contenedor}>
      <View style={styles.subtitulo}>
        <Avatar.Icon style={styles.avatar} size={70} icon="account-outline" />
        <Text style={styles.contenidoSubtitulo}>NOMBRE APELLIDO</Text>
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
          />
          <List.Item
            title="Gestión de ubicación"
            style={styles.listItem}
            left={(props) => <List.Icon icon="map-marker" color="#707070" />}
            right={(props) => (
              <List.Icon icon="chevron-right" color="#707070" size={20} />
            )}
          />
          <List.Item
            title="Términos y condiciones"
            style={styles.listItem}
            left={(props) => <List.Icon icon="information" color="#707070" />}
          />
          <Divider />
          <List.Item
            title="Cerrar sesión"
            style={styles.listItem}
            left={(props) => <List.Icon icon="logout" color="#707070" />}
          />
        </List.Section>
      </View>
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
    color: 'black',
    paddingLeft: 20,
    fontSize: 18,
  },
  avatar: {
    backgroundColor: '#e0e0e0',
  },
  misDatos: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
  },
  miConfig: {
    flex: 3,
    width: '100%',
    backgroundColor: 'white',
  },
});

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch(signIn(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);
