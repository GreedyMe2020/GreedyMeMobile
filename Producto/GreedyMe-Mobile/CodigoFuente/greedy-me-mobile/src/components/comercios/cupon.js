import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Button, Title, Snackbar, Divider } from 'react-native-paper';
import { connect } from 'react-redux';
import _ from 'lodash';
import { colors } from '../../styles/colores';
import firebaseapp from '../../../firebase/config';
import { format } from 'date-fns';
import { guardarCupon } from '../../../redux/actions/comercio-actions';

function Cupon(props) {
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
                  <Text style={styles.validez2}>
                    {data.item.descripcion
                      ? '- ' + data.item.descripcion + '.'
                      : ''}
                  </Text>
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
              {guardado ? (
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
              )}
            </View>
          </View>
        </View>
      </ScrollView>
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
  },
  validez1: {
    color: colors.darkGrey,
    marginTop: 15,
    marginBottom: -15,
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
    marginTop: 30,
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
  botonGuardarDisabled: {
    alignSelf: 'center',
    backgroundColor: '#afafaf',
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
