import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Avatar,
  IconButton,
  Button,
  Card,
  List,
  Title,
  Paragraph,
  Divider,
} from 'react-native-paper';
import { connect } from 'react-redux';
import _ from 'lodash';
import { colors } from '../../styles/colores';
import firebaseapp from '../../../firebase/config';
import { format } from 'date-fns';

function Cupon(props) {
  //Traigo la info del beneficio y se la asigno a la variable data,
  //y los datos del comercio a las otras variables:
  const { data, sucursal, comercio } = props.route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.contenido}>
            <Image
              style={styles.contImagen}
              source={{
                uri:
                  data.item.tipoProveedor === 'Propias'
                    ? props.fotocomercio
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
                  ? props.nombrecomercio
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
            <View style={styles.textoSecundario}>
              <Text style={styles.validez2}>
                {'- Aplica: ' +
                  ((data.item.diaAplicacion.lunes ? 'Lunes ' : '') +
                    (data.item.diaAplicacion.martes ? 'Martes ' : '') +
                    (data.item.diaAplicacion.miercoles ? 'Miercoles ' : '') +
                    (data.item.diaAplicacion.jueves ? 'Jueves ' : '') +
                    (data.item.diaAplicacion.viernes ? 'Viernes ' : '') +
                    (data.item.diaAplicacion.sabado ? 'Sábado ' : '') +
                    (data.item.diaAplicacion.domingo ? 'Domingo ' : '') +
                    (data.item.diaAplicacion.todoslosdias
                      ? 'Todos los días' + '.'
                      : ''))}
              </Text>
              <Text style={styles.validez2}>
                {'- Medio de pago: ' + data.item.medioPago + '.'}
              </Text>

              {data.item.otroProveedor ? (
                <Text style={styles.validez2}>
                  {'- Entidad crediticia: ' + data.item.otroProveedor + '.'}
                </Text>
              ) : null}

              <Text style={styles.validez2}>
                {data.item.descripcion ? data.item.descripcion + '.' : ''}
              </Text>
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
            <Divider
              style={{
                backgroundColor: colors.grey,
                height: 2,
                marginLeft: 45,
                marginRight: 45,
                marginTop: 25,
              }}
            />
            <View style={styles.contCirculo2}>
              <View style={styles.circuloEnd} />
            </View>
          </View>
          <View style={styles.contenedorBoton}>
            <Button
              icon="content-save-outline"
              mode="outlined"
              style={styles.botonGuardar}
              labelStyle={{ fontSize: 18, color: colors.white }}
            >
              Guardar
            </Button>
          </View>
        </View>
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
    marginBottom: 25,
    flex: 1,
    alignContent: 'center',
    elevation: 1,
  },
  circulos: {
    marginTop: 20,
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
  divider: {
    width: 2,
    backgroundColor: colors.naranja,
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
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 15,
    fontSize: 28,
  },
  validez: {
    color: colors.black,
    marginBottom: 3,
    fontSize: 16,
    textAlign: 'center',
    paddingLeft: 2,
    paddingRight: 2,
  },
  validez1: {
    color: colors.darkGrey,
    marginTop: 15,
    marginBottom: -15,
    marginRight: 39,
    fontSize: 16,
    textAlign: 'center',
  },
  validez2: {
    color: colors.black,
    marginBottom: 3,
    fontSize: 16,
    marginRight: 39,
    textAlign: 'center',
  },
  textoSecundario: {
    marginTop: 20,
    alignContent: 'center',
    marginLeft: 40,
  },
  contenedorBoton: {
    marginTop: 25,
  },
  botonGuardar: {
    alignSelf: 'center',
    backgroundColor: colors.celeste,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Cupon);
