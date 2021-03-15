import * as React from 'react';
import {
  IconButton,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Snackbar,
} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { connect } from 'react-redux';
import _ from 'lodash';
import { colors } from '../../styles/colores';
import firebaseapp from '../../../firebase/config';
import { guardarProductoCanjeado } from '../../../redux/actions/user-actions';

function ProductoACanjear(props) {
  const { data } = props.route.params;
  const firestore = firebaseapp.firestore();

  const [puntoRetiroDefault, setPuntoRetiroDefault] = React.useState(false);

  const [puntoRetiro, setPuntoRetiro] = React.useState([]);

  //estado para mostrar un mensaje de error si se quiere comprar un producto sin tener los greedyPoints necesarios
  const [mensajeError, setMensajeError] = React.useState(false);
  //funcion que cierra el mensaje de error
  const onDismissSnackBar2 = () => setMensajeError(false);

  const [puntoRetiroSeleccionado, setPuntoRetiroSeleccionado] = React.useState(
    null,
  );

  //estados para manejar el dialog
  const [visible, setVisible] = React.useState(false);
  //falta agregar los datos del producto que tendrian que venir por props, yo lo preparo en el back comentado
  //el label es la direccion y el value es la localidad
  const onSubmit = () => {
    setVisible(true);
    if (props.profile.greedyPoints >= data.item.greedyPoints) {
      let greedyPointsRestantes =
        props.profile.greedyPoints - data.item.greedyPoints;
      props.guardarProductoCanjeado(
        props.auth.uid,
        data.item.id,
        data.item.nombre,
        data.item.greedyPoints,
        puntoRetiroSeleccionado.label,
        puntoRetiroSeleccionado.value,
        greedyPointsRestantes,
      );
    } else {
      setMensajeError(true);
    }
  };

  const hideDialog = () => setVisible(false);

  //use effect que se ejecuta una vez y trae cupones
  React.useEffect(() => {
    const obtenerPuntoRetiro = async () => {
      const firestore = firebaseapp.firestore();
      try {
        const puntosRetiro = await firestore.collection('puntoRetiro').get();
        const arrayPuntosRetiro = puntosRetiro.docs.map((doc) => ({
          label: doc.data().direccion,
          value: doc.data().localidad,
        }));

        setPuntoRetiro(arrayPuntosRetiro);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPuntoRetiro();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: data.item.photoURL }} />
      <View style={styles.texto}>
        <Text style={styles.nombreProducto}>{data.item.nombre}</Text>
        <Text style={styles.descripcion}>{data.item.descripcion}</Text>
        <Text
          style={styles.puntos}
        >{`${data.item.greedyPoints} greedyPoints`}</Text>
      </View>
      <View style={styles.botones}>
        <Text style={styles.textoRetiro}>Seleccionar punto de retiro: </Text>
        <DropDownPicker
          items={puntoRetiro}
          defaultValue={puntoRetiroDefault}
          placeholder={'Puntos de retiro'}
          containerStyle={{
            height: 40,
            marginRight: 20,
            marginLeft: 20,
            marginTop: 12,
          }}
          style={{ backgroundColor: '#fafafa', zIndex: 2 }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{ backgroundColor: '#fafafa', zIndex: 1 }}
          onChangeItem={(item) => setPuntoRetiroSeleccionado(item)}
          //   onChangeItem={(item) =>
          //     setPuntoRetiro({
          //       country: item.value,
          //     })
          //   }
        />
      </View>

      <View style={{ zIndex: 3 }}>
        {puntoRetiroSeleccionado ? (
          <Button
            mode="contained"
            labelStyle={{ fontSize: 18, color: colors.white }}
            style={styles.btncanjear}
            onPress={onSubmit}
          >
            Canjear
          </Button>
        ) : (
          <Button
            mode="contained"
            labelStyle={{ fontSize: 18, color: colors.white }}
            style={styles.btncanjearblocked}
            disabled
            onPress={onSubmit}
          >
            Canjear
          </Button>
        )}

        {mensajeError ? (
          <Snackbar
            visible={mensajeError}
            onDismiss={onDismissSnackBar2}
            theme={{ colors: { accent: 'white' } }}
            action={{
              label: 'OK',
              onPress: () => {
                onDismissSnackBar2;
              },
            }}
            style={styles.snackbar2}
          >
            No tenés los suficientes greedyPoints para canjear este producto.
          </Snackbar>
        ) : (
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>¡¡Premio canjeado!! </Dialog.Title>
              <Dialog.Content>
                <Paragraph style={{ fontSize: 16 }}>
                  Tenés como máximo 5 días hábiles para retirar tu premio en el
                  punto de entrega elegido. Pasado ese periodo no podrás
                  reclamarlo.
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  style={{ marginRight: 7 }}
                  onPress={() => {
                    props.navigation.navigate('GreedyPointsInicio');
                  }}
                >
                  OK
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    borderRadius: 100,
    marginTop: 40,
  },
  texto: {
    alignItems: 'center',
  },
  nombreProducto: {
    marginTop: 16,
    fontSize: 22,
    color: colors.black,
  },
  descripcion: {
    fontSize: 16,
    marginTop: 5,
    marginLeft: 22,
    marginRight: 22,
    textAlign: 'center',
    color: colors.black,
  },
  puntos: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.naranja,
    marginTop: 15,
  },
  textoRetiro: {
    fontSize: 17,
    marginLeft: 20,
    marginTop: 30,
  },
  btncanjear: {
    backgroundColor: colors.naranja,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 25,
  },
  btncanjearblocked: {
    backgroundColor: colors.naranja,
    opacity: 0.5,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 25,
  },
  iconGP: {
    position: 'absolute',
    margin: 25,
    right: 0,
    bottom: 0,
  },
  greedypoints: {
    justifyContent: 'center',
    width: 85,
    height: 85,
    backgroundColor: colors.azul,
    borderRadius: 50,
    elevation: 5,
    shadowColor: colors.black,
  },
  tituloP: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: -3,
  },
  puntosGP: {
    color: colors.white,
    fontSize: 25,
    fontFamily: 'Poppins-Regular',
  },
  letrasCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: -7,
  },
  lBlanca: {
    color: colors.white,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  lVerde: {
    color: colors.celeste,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  lNaranja: {
    color: colors.naranja,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    guardarProductoCanjeado: (
      idUsuario,
      idProducto,
      nombreProducto,
      greedyPoints,
      direccion,
      localidad,
      greedyPointsADescontar,
    ) =>
      dispatch(
        guardarProductoCanjeado(
          idUsuario,
          idProducto,
          nombreProducto,
          greedyPoints,
          direccion,
          localidad,
          greedyPointsADescontar,
        ),
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductoACanjear);
