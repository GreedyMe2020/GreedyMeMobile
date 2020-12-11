import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Button, Title, Divider, Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';
import _ from 'lodash';
import { colors } from '../../styles/colores';
import firebaseapp from '../../../firebase/config';
import { format } from 'date-fns';
import { guardarCupon } from '../../../redux/actions/comercio-actions';

function Cupon(props) {
  //estado para tener los cupones para que no se puedan guardar cupones iguales
  const [cupones, setCupones] = React.useState([]);
  //estado para mostrar un mensaje de error si se quieren guardar cupones iguales
  const [mensajeError, setMensajeError] = React.useState(false);
  const [mensajeCorrecto, setMensajeCorrecto] = React.useState(false);
  //use effect para traer los cupones del usuario de la base de datos
  React.useEffect(() => {
    const obtenerCupones = async () => {
      const firestore = firebaseapp.firestore();
      try {
        const cupones = await firestore
          .collection('usuarioConsumidor')
          .doc(props.auth.uid)
          .collection('cupones')
          .get();
        const arrayCupones = cupones.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCupones(arrayCupones);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCupones();
  }, []);
  //funcion que cierra el mensaje de error
  const onDismissSnackBar2 = () => setMensajeError(false);
  const onDismissSnackBar3 = () => setMensajeCorrecto(false);
  //funcion para guardar el cupon
  const onSubmit = () => {
    let contador = 0;
    cupones.forEach((cupon) => {
      if (cupon.id === data.item.id) {
        contador += 1;
      }
    });
    if (contador === 0) {
      props.guardarCupon(props.auth.uid, data.item, comercio, sucursal);
      cupones.push({
        id: data.item.id,
        tipoPromo: data.item.tipoPromo,
        valuePromo: data.item.valuePromo,
        otraPromo: data.item.otraPromo,
        tipoProveedor: data.item.tipoProveedor,
        valueProveedor: data.item.valueProveedor,
        otroProveedor: data.item.otroProveedor,
        desdeVigencia: data.item.desdeVigencia,
        hastaVigencia: data.item.hastaVigencia,
        descripcion: data.item.descripcion,
        photoURL: data.item.photoURL,
        diaAplicacion: data.item.diaAplicacion,
        medioPago: data.item.medioPago,
        nombreComercio: comercio,
        sucursal: sucursal,
      });
      setMensajeCorrecto(true);
    } else {
      setMensajeError(true);
    }
  };
  //Traigo la info del beneficio y se la asigno a la variable data,
  //y los datos del comercio a las otras variables:
  const { data, sucursal, comercio, fotocomercio } = props.route.params;

  //Estado para abrir o cerrar el snackbar de guardado
  const [guardado, setGuardado] = React.useState(false);

  //Estado para abrir o cerrar el snackbar de guardado
  const [visible, setVisible] = React.useState(false);

  //Funcion para cerrar el aviso de guardado
  const onDismissSnackBar = () => setVisible(false);

  // useEffect para mostrar la confirmacion
  /*  const abrirMensajeConfirmacion = React.useEffect(() => {
    if (props.guardarCupon) {
      setVisible(true);
    }
  }, []); */

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.contenido}>
              <Image
                style={styles.contImagen}
                source={{
                  uri:
                    data.item.tipoProveedor === 'Propias'
                      ? fotocomercio
                      : data.item.valueProveedor === 'Otro'
                      ? 'https://firebasestorage.googleapis.com/v0/b/greedyme-d6c6c.appspot.com/o/proveedores%2F1.jpg?alt=media&token=d186f078-7cfa-437c-9287-1bbfd9de8c00'
                      : data.item.valueProveedor === 'Todos'
                      ? 'https://firebasestorage.googleapis.com/v0/b/greedyme-d6c6c.appspot.com/o/proveedores%2F1.jpg?alt=media&token=d186f078-7cfa-437c-9287-1bbfd9de8c00'
                      : data.item.photoURL,
                }}
              />
              <View style={styles.texto}>
                <Title style={styles.titulo}>
                  {data.item.valueProveedor === 'Otro'
                    ? data.item.otroProveedor
                    : data.item.valueProveedor === 'Propio'
                    ? comercio
                    : data.item.valueProveedor === 'Todos'
                    ? data.item.valueProveedor + ' los Bancos'
                    : data.item.valueProveedor}
                </Title>
                <Title style={styles.beneficio}>
                  {data.item.valuePromo === 'Otro'
                    ? data.item.otraPromo
                    : data.item.tipoPromo === 'Descuento'
                    ? data.item.valuePromo + ' OFF'
                    : data.item.valuePromo}
                </Title>
                <Text style={styles.validez}>
                  {'Válido desde el ' +
                    format(data.item.desdeVigencia.toDate(), 'dd/MM/yyyy')}
                </Text>
                <Text style={styles.validez}>
                  {' hasta el ' +
                    format(data.item.hastaVigencia.toDate(), 'dd/MM/yyyy')}
                </Text>
                <Text style={styles.validez}>
                  {'en ' + comercio + ', sucursal ' + sucursal + '.'}
                </Text>
              </View>
              <View>
                <View style={styles.textoSecundario}>
                  <Text style={styles.validez2}>
                    {'- Aplica: ' +
                      ((data.item.diaAplicacion.lunes ? 'Lunes ' : '') +
                        (data.item.diaAplicacion.martes ? 'Martes ' : '') +
                        (data.item.diaAplicacion.miercoles
                          ? 'Miércoles '
                          : '') +
                        (data.item.diaAplicacion.jueves ? 'Jueves ' : '') +
                        (data.item.diaAplicacion.viernes ? 'Viernes ' : '') +
                        (data.item.diaAplicacion.sabado ? 'Sábado ' : '') +
                        (data.item.diaAplicacion.domingo ? 'Domingo ' : '') +
                        (data.item.diaAplicacion.todoslosdias
                          ? 'Todos los días' + '.'
                          : ''))}
                  </Text>
                  <Text style={styles.validez2}>
                    {/* {'- Medio de pago: ' + data.item.medioPago.efectivo + '.'} */}
                    {data.item.medioPago === 'Efectivo'
                      ? '- Válido solo en ' + data.item.medioPago + '.'
                      : '- Válido con ' + data.item.medioPago + '.'}
                  </Text>

                  {data.item.otroProveedor ? (
                    <Text style={styles.validez2}>
                      {'- Entidad crediticia: ' + data.item.otroProveedor + '.'}
                    </Text>
                  ) : null}

                  {data.item.descripcion ? (
                    <Text style={styles.validez2}>
                      {'- ' + data.item.descripcion + '.'}
                    </Text>
                  ) : null}
                </View>
                <Text style={styles.validez1}>
                  ¡Guardá este cupón y pedí el código en la tienda para sumar
                  GreedyPoints!
                </Text>
              </View>
            </View>
            <View style={styles.circulos}>
              <View style={styles.contCirculo}>
                <View style={styles.circulo} />
              </View>
              <Divider style={styles.divider} />
              <View style={styles.contCirculo2}>
                <View style={styles.circuloEnd} />
              </View>
            </View>
            <View style={styles.contenedorBoton}>
              {/*  {guardado ? (
                <Button
                  icon="check"
                  mode="contained"
                  style={styles.botonGuardar}
                  labelStyle={{ fontSize: 18, color: colors.white }}
                  disabled
                >
                  Guardado
                </Button>
              ) : (
                <Button
                  icon="content-save-outline"
                  mode="contained"
                  style={styles.botonGuardar}
                  labelStyle={{ fontSize: 18, color: colors.white }}
                  onPress={() => {
                    props.guardarCupon(
                      props.auth.uid,
                      data.item,
                      comercio,
                      sucursal,
                    );
                    setGuardado(true);
                  }}
                >
                  Guardar
                </Button>
              )} */}
              <Button
                icon="content-save-outline"
                mode="outlined"
                style={styles.botonGuardar}
                labelStyle={{ fontSize: 18, color: colors.white }}
                onPress={onSubmit}
              >
                Guardar
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.contenedorSnack}>
        {mensajeCorrecto ? (
          <Snackbar
            visible={mensajeCorrecto}
            onDismiss={onDismissSnackBar3}
            theme={{ colors: { accent: '#76B39D' } }}
            action={{
              label: 'OK',
              onPress: () => {
                onDismissSnackBar3;
              },
            }}
            style={styles.snackbar}
          >
            Cupón guardado correctamente!
          </Snackbar>
        ) : null}
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
            Ya tenés guardado este cupón.
          </Snackbar>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.avatar,
  },
  content: {
    backgroundColor: colors.avatar,
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 5,
    marginLeft: 30,
    marginRight: 30,
    flex: 1,
    alignContent: 'center',
    elevation: 1,
  },
  contenido: {
    flexDirection: 'column',
    alignContent: 'center',
    marginTop: 30,
  },
  contImagen: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    height: 125,
    width: 125,
    borderRadius: 5,
  },
  texto: {
    alignItems: 'center',
    marginTop: 20,
  },
  titulo: {
    marginBottom: 10,
    fontSize: 25,
  },
  beneficio: {
    color: colors.naranja,
    marginTop: 5,
    marginBottom: 15,
    fontSize: 28,
  },
  validez: {
    color: colors.black,
    marginBottom: 2,
    fontSize: 16,
    textAlign: 'center',
  },
  textoSecundario: {
    marginTop: 20,
    alignContent: 'center',
    marginLeft: 20,
    marginBottom: 15,
  },
  validez1: {
    color: colors.darkGrey,
    marginRight: 20,
    marginLeft: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  validez2: {
    color: colors.black,
    marginBottom: 3,
    fontSize: 16,
    marginRight: 39,
  },
  circulos: {
    marginTop: 15,
  },
  contCirculo: {
    position: 'absolute',
    justifyContent: 'center',
  },
  circulo: {
    height: 50,
    width: 50,
    backgroundColor: colors.avatar,
    borderRadius: 100,
    marginLeft: -25,
  },
  divider: {
    backgroundColor: colors.grey,
    height: 2,
    marginLeft: 45,
    marginRight: 45,
    marginTop: 25,
  },
  contCirculo2: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  circuloEnd: {
    height: 50,
    width: 50,
    backgroundColor: colors.avatar,
    borderRadius: 100,
    marginRight: -25,
  },
  contenedorBoton: {
    marginTop: 25,
    marginBottom: 25,
  },
  botonGuardar: {
    alignSelf: 'center',
    backgroundColor: colors.celeste,
  },
  snackbar: {
    alignSelf: 'flex-end',
    backgroundColor: colors.alertGrey,
  },
  snackbar2: {
    alignSelf: 'flex-end',
    backgroundColor: colors.error,
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
    guardarCupon: (idUsuario, datos, comercio, sucursal) =>
      dispatch(guardarCupon(idUsuario, datos, comercio, sucursal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cupon);
