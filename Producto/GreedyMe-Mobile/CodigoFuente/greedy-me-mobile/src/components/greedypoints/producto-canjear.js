import * as React from 'react';
import {
  IconButton,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { connect } from 'react-redux';
import _ from 'lodash';
import { colors } from '../../styles/colores';
import firebaseapp from '../../../firebase/config';
import { guardarProductoCanjeado } from '../../../redux/actions/user-actions';

function ProductoACanjear(props) {
  const firestore = firebaseapp.firestore();

  const [puntoRetiroDefault, setPuntoRetiroDefault] = React.useState(false);

  const [puntoRetiro, setPuntoRetiro] = React.useState([]);

  const [puntoRetiroSeleccionado, setPuntoRetiroSeleccionado] = React.useState(
    null,
  );
  //estados para manejar el dialog
  const [visible, setVisible] = React.useState(false);
  //falta agregar los datos del producto que tendrian que venir por props, yo lo preparo en el back comentado
  //el label es la direccion y el value es la localidad
  const onSubmit = () => {
    setVisible(true);
    props.guardarProductoCanjeado(
      props.auth.uid,
      puntoRetiroSeleccionado.label,
      puntoRetiroSeleccionado.value,
    );
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
      <Image
        style={styles.image}
        source={require('../../multimedia/cuaderno.jpg')}
      />
      <View style={styles.texto}>
        <Text style={styles.nombreProducto}>Cuaderno GreedyMe</Text>
        <Text style={styles.puntos}>100 greedyPoints</Text>
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
      <TouchableWithoutFeedback
        onPress={() => {
          props.navigation.navigate('GreedyPointsInicio');
        }}
      >
        <View style={styles.iconGP}>
          <View style={styles.greedypoints}>
            <View style={styles.tituloP}>
              <Text style={styles.puntosGP}>{props.profile.greedyPoints}</Text>
            </View>
            <View style={styles.letrasCont}>
              <Text style={styles.lBlanca}>gre</Text>
              <Text style={styles.lVerde}>edy</Text>
              <Text style={styles.lNaranja}>Points</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    marginTop: 20,
    fontSize: 22,
    color: colors.black,
  },
  descripcion: {
    fontSize: 18,
    marginTop: 5,
    color: colors.black,
  },
  puntos: {
    fontSize: 20,
    color: colors.naranja,
    marginTop: 5,
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
    guardarProductoCanjeado: (idUsuario, direccion, localidad) =>
      dispatch(guardarProductoCanjeado(idUsuario, direccion, localidad)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductoACanjear);
