import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Divider, List, Switch } from 'react-native-paper';
import { connect } from 'react-redux';
import {
  editarNotificacionesFavoritas,
  editarNotificacionesUbicacion,
  editarNotificacionesTodas,
} from '../../../redux/actions/user-actions';

function Notificaciones(props) {
  const [swiComerciosFav, setSwiComerciosFav] = React.useState(
    props.profile.notificacionesFavoritas,
  );
  const [swiComerciosUbic, setSwiComerciosUbic] = React.useState(
    props.profile.notificacionesUbicacion,
  );
  const [swiComerciosTodos, setSwiComerciosTodos] = React.useState(
    props.profile.notificacionesTodas,
  );

  const onToggleSwitchFav = () => {
    setSwiComerciosFav(!swiComerciosFav);
    props.editarNotificacionesFavoritas(!swiComerciosFav, props.auth.uid);
  };
  const onToggleSwitchUbic = () => {
    setSwiComerciosUbic(!swiComerciosUbic);
    props.editarNotificacionesUbicacion(!swiComerciosUbic, props.auth.uid);
  };
  const onToggleSwitchTodos = () => {
    setSwiComerciosTodos(!swiComerciosTodos);
    props.editarNotificacionesTodas(!swiComerciosTodos, props.auth.uid);
  };

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
    profile: state.firebase.profile,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editarNotificacionesFavoritas: (datos, id) =>
      dispatch(editarNotificacionesFavoritas(datos, id)),
    editarNotificacionesUbicacion: (datos, id) =>
      dispatch(editarNotificacionesUbicacion(datos, id)),
    editarNotificacionesTodas: (datos, id) =>
      dispatch(editarNotificacionesTodas(datos, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notificaciones);
