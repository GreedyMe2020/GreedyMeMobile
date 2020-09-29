import * as React from 'react';
import {
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Avatar, List } from 'react-native-paper';
import { connect } from 'react-redux';
import { signIn } from '../../../redux/actions/auth-actions';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Perfil() {
  return (
    <KeyboardAvoidingView
      style={styles.containerTeclado}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      enabled={Platform.OS === 'ios'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.contenedor}>
          <View style={styles.subtitulo}>
            <Avatar.Icon style={styles.avatar} size={70} icon="camera" />
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
                  <List.Icon icon="chevron-right" color="#707070" size={24} />
                )}
              />
            </List.Section>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  containerTeclado: {
    flex: 1,
  },
  contentPerfil: {
    flex: 1,
  },
  hearder: {
    height: 35,
  },
  tituloHeader: {
    justifyContent: 'flex-start',
    alignSelf: 'center',
    bottom: 10,
  },
  subtitulo: {
    flexDirection: 'row',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    top: 20,
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
    flex: 3,
    width: '100%',
    backgroundColor: 'white',
  },
  listItem: {
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
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
