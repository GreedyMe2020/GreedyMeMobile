import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Switch } from 'react-native-paper';
import { connect } from 'react-redux';
import { signIn } from '../../../redux/actions/auth-actions';

function Ubicacion(props) {
  const [ubicacion, setUbicacion] = React.useState(false);

  const onToggleSwitchUbi = () => setUbicacion(!ubicacion);

  return (
    <View style={styles.contenedor}>
      <List.Section style={styles.contenedorLista}>
        <List.Subheader>Acceder a mi ubicación</List.Subheader>
        <List.Item
          title="Ubicación"
          style={styles.listItem}
          right={(props) => (
            <Switch value={ubicacion} onValueChange={onToggleSwitchUbi} />
          )}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Ubicacion);
