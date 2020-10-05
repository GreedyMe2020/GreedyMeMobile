import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Divider, List, Switch } from 'react-native-paper';
import { connect } from 'react-redux';
import { signIn } from '../../../redux/actions/auth-actions';

function Notificaciones(props) {
  const [swiComerciosFav, setSwiComerciosFav] = React.useState(false);
  const [swiComerciosUbic, setSwiComerciosUbic] = React.useState(false);
  const [swiComerciosTodos, setSwiComerciosTodos] = React.useState(true);

  const onToggleSwitchFav = () => setSwiComerciosFav(!swiComerciosFav);
  const onToggleSwitchUbic = () => setSwiComerciosUbic(!swiComerciosUbic);
  const onToggleSwitchTodos = () => setSwiComerciosTodos(!swiComerciosTodos);

  return (
    <View style={styles.contenedor}>
      <List.Section style={styles.contenedorLista}>
        <List.Subheader>Notificaciones push</List.Subheader>
        <List.Item
          title="Mis comercios favoritos"
          style={styles.listItem}
          right={(props) => (
            <Switch value={swiComerciosFav} onValueChange={onToggleSwitchFav} />
          )}
        />
        <Divider style={{ height: 1 }} />
        <List.Item
          title="Comercios cercanos a mi ubicación"
          style={styles.listItem}
          right={(props) => (
            <Switch
              value={swiComerciosUbic}
              onValueChange={onToggleSwitchUbic}
            />
          )}
        />
        <Divider style={{ height: 1 }} />
        <List.Item
          title="Todos los comercios"
          style={styles.listItem}
          right={(props) => (
            <Switch
              value={swiComerciosTodos}
              onValueChange={onToggleSwitchTodos}
            />
          )}
        />
        <Divider style={{ height: 1 }} />
      </List.Section>
    </View>
  );
}
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  contenedorLista: {
    top: 10,
  },
  listItem: {
    height: 60,
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

export default connect(mapStateToProps, mapDispatchToProps)(Notificaciones);
