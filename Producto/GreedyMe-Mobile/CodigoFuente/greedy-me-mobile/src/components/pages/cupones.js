import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  Text,
  SafeAreaView,
  ScrollView,
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
  Dialog,
  Portal,
  RadioButton,
  Divider,
  TextInput,
} from 'react-native-paper';
import { connect } from 'react-redux';
import _ from 'lodash';
import { colors } from '../../styles/colores';
import firebaseapp from '../../../firebase/config';
import { format } from 'date-fns';
import { Rating, AirbnbRating } from 'react-native-elements';

function Cupones(props) {
  //estado de cupones
  const [cupones, setCupones] = React.useState(null);
  //use effect que se ejecuta una vez y trae cupones
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

  const [visible, setVisible] = React.useState(false);
  const [visible1, setVisible1] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [visible3, setVisible3] = React.useState(false);

  const showDialogValidar = () => setVisible(true);

  const hideDialogValidar = () => setVisible(false);

  const showDialogPreg1 = () => setVisible1(true);
  const hideDialogPreg1 = () => setVisible1(false);
  const showDialogPreg2 = () => setVisible2(true);
  const hideDialogPreg2 = () => setVisible2(false);
  const showDialogPreg3 = () => setVisible(true);
  const [value, setValue] = React.useState('si');
  const [value1, setValue1] = React.useState('si');
  const [value2, setValue2] = React.useState('muybuena');

  const [text, setText] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {cupones !== null ? (
          <View style={styles.content}>
            <View style={styles.card}>
              <View style={styles.contenido}>
                <Image
                  style={styles.contImagen}
                  source={{
                    uri:
                      cupones[0].tipoProveedor === 'Propias'
                        ? props.fotocomercio
                        : cupones[0].valueProveedor === 'Otro'
                        ? 'https://firebasestorage.googleapis.com/v0/b/greedyme-d6c6c.appspot.com/o/proveedores%2F1.jpg?alt=media&token=d186f078-7cfa-437c-9287-1bbfd9de8c00'
                        : cupones[0].valueProveedor === 'Todos'
                        ? 'https://firebasestorage.googleapis.com/v0/b/greedyme-d6c6c.appspot.com/o/proveedores%2F1.jpg?alt=media&token=d186f078-7cfa-437c-9287-1bbfd9de8c00'
                        : cupones[0].photoURL,
                  }}
                />
                <View style={styles.texto}>
                  <Title style={styles.titulo}>
                    {cupones[0].valueProveedor === 'Otro'
                      ? cupones[0].otroProveedor
                      : cupones[0].valueProveedor === 'Propio'
                      ? props.nombrecomercio
                      : cupones[0].valueProveedor === 'Todos'
                      ? cupones[0].valueProveedor + ' los Bancos'
                      : cupones[0].valueProveedor}
                  </Title>
                  <Title style={styles.beneficio}>
                    {cupones[0].valuePromo === 'Otro'
                      ? cupones[0].otraPromo
                      : cupones[0].tipoPromo === 'Descuento'
                      ? cupones[0].valuePromo + ' OFF'
                      : cupones[0].valuePromo}
                  </Title>
                  <Text style={styles.validez}>
                    {'Válido desde el ' +
                      format(cupones[0].desdeVigencia.toDate(), 'dd/MM/yyyy')}
                  </Text>
                  <Text style={styles.validez}>
                    {' hasta el ' +
                      format(cupones[0].hastaVigencia.toDate(), 'dd/MM/yyyy')}
                  </Text>
                  <Text style={styles.validez}>
                    {'en ' +
                      cupones[0].comercio +
                      ', sucursal ' +
                      cupones[0].sucursal +
                      '.'}
                  </Text>
                </View>
                <View>
                  <View style={styles.textoSecundario}>
                    <Text style={styles.validez2}>
                      {'- Aplica: ' +
                        ((cupones[0].diaAplicacion.lunes ? 'Lunes ' : '') +
                          (cupones[0].diaAplicacion.martes ? 'Martes ' : '') +
                          (cupones[0].diaAplicacion.miercoles
                            ? 'Miercoles '
                            : '') +
                          (cupones[0].diaAplicacion.jueves ? 'Jueves ' : '') +
                          (cupones[0].diaAplicacion.viernes ? 'Viernes ' : '') +
                          (cupones[0].diaAplicacion.sabado ? 'Sábado ' : '') +
                          (cupones[0].diaAplicacion.domingo ? 'Domingo ' : '') +
                          (cupones[0].diaAplicacion.todoslosdias
                            ? 'Todos los días' + '.'
                            : ''))}
                    </Text>

                    <Text style={styles.validez2}>
                      {cupones[0].medioPago === 'Efectivo'
                        ? '- Válido solo en ' + cupones[0].medioPago + '.'
                        : '- Válido con ' + cupones[0].medioPago + '.'}
                    </Text>

                    {cupones[0].otroProveedor ? (
                      <Text style={styles.validez2}>
                        {'- Entidad crediticia: ' +
                          cupones[0].otroProveedor +
                          '.'}
                      </Text>
                    ) : null}

                    <Text style={styles.validez2}>
                      {cupones[0].descripcion
                        ? '- ' + cupones[0].descripcion + '.'
                        : ''}
                    </Text>
                  </View>
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
                <Button
                  icon="content-save-outline"
                  mode="outlined"
                  style={styles.botonGuardar}
                  labelStyle={{ fontSize: 18, color: colors.white }}
                  onPress={showDialogValidar}
                >
                  Validar
                </Button>
              </View>
              <Portal>
                <Dialog visible={visible} onDismiss={hideDialogValidar}>
                  <Dialog.Title>Validar cupón</Dialog.Title>
                  <Dialog.Content style={{ marginBottom: -10 }}>
                    <Paragraph style={{ fontSize: 17 }}>
                      Contestá una breve encuenta para validar este cupón y
                      sumar GreedyPoints para canjearlos por premios.
                    </Paragraph>
                  </Dialog.Content>
                  <Dialog.Actions style={{ marginRight: 8 }}>
                    <Button onPress={showDialogPreg2} style={{ fontSize: 17 }}>
                      Contestar
                    </Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
              {/* <Portal>
                <Dialog visible={visible1} onDismiss={hideDialogPreg1}>
                  <Dialog.Title>Encuesta</Dialog.Title>
                  <Dialog.Content style={{ marginBottom: -10 }}>
                    <Paragraph style={{ fontSize: 17 }}>
                      ¿Cómo evaluarías tu experiencia de compra?
                    </Paragraph>
                    <AirbnbRating
                      count={5}
                      defaultRating={3}
                      reviews={[
                        'Mala',
                        'Regular',
                        'Buena',
                        'Muy Buena',
                        'Excelente',
                      ]}
                    />
                    <Rating showRating style={{ paddingVertical: 10 }} />
                  </Dialog.Content>
                  <Dialog.Actions style={{ marginRight: 8 }}>
                    <Button onPress={showDialogPreg2} style={{ fontSize: 17 }}>
                      Siguiente
                    </Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal> */}
              <Portal>
                <Dialog
                  visible={visible2}
                  onDismiss={hideDialogPreg2}
                  style={{ flex: 0.9 }}
                >
                  <Dialog.Title>Encuesta</Dialog.Title>
                  <Dialog.ScrollArea>
                    <ScrollView>
                      <View style={{ marginTop: 12 }}>
                        <Text style={{ fontSize: 17, marginTop: 12 }}>
                          ¿Pudo utilizar el beneficio por el cual asistió a la
                          tienda?
                        </Text>
                        <View style={{ marginTop: 8 }}>
                          <RadioButton.Group
                            onValueChange={(value) => setValue(value)}
                            value={value}
                          >
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <RadioButton value="si" />
                              <Text style={{ fontSize: 17, marginLeft: 8 }}>
                                Si
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <RadioButton value="no" />
                              <Text style={{ fontSize: 17, marginLeft: 8 }}>
                                No
                              </Text>
                            </View>
                          </RadioButton.Group>
                        </View>
                      </View>
                      <View style={{ marginTop: 12 }}>
                        <Text style={{ fontSize: 17 }}>
                          ¿El beneficio coincide con lo especificado en el
                          perfil del comercio?
                        </Text>
                        <View style={{ marginTop: 8 }}>
                          <RadioButton.Group
                            onValueChange={(value1) => setValue1(value1)}
                            value={value1}
                          >
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <RadioButton value="si" />
                              <Text style={{ fontSize: 17, marginLeft: 8 }}>
                                Si
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <RadioButton value="no" />
                              <Text style={{ fontSize: 17, marginLeft: 8 }}>
                                No
                              </Text>
                            </View>
                          </RadioButton.Group>
                        </View>
                      </View>
                      <View style={{ marginTop: 12 }}>
                        <Text style={{ fontSize: 17 }}>
                          ¿Cómo evaluarías tu experiencia de compra?
                        </Text>
                        <Rating
                          imageSize={35}
                          style={{
                            paddingVertical: 10,
                          }}
                        />
                      </View>
                      <View style={{ marginTop: 12 }}>
                        <Text style={{ fontSize: 17 }}>
                          ¿Cómo evaluaría la atención del vendedor?
                        </Text>
                        <View style={{ marginTop: 8 }}>
                          <RadioButton.Group
                            onValueChange={(value2) => setValue2(value2)}
                            value={value2}
                          >
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <RadioButton value="muybuena" />
                              <Text style={{ fontSize: 17, marginLeft: 8 }}>
                                Muy buena
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <RadioButton value="buena" />
                              <Text style={{ fontSize: 17, marginLeft: 8 }}>
                                Buena
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <RadioButton value="mala" />
                              <Text style={{ fontSize: 17, marginLeft: 8 }}>
                                Mala
                              </Text>
                            </View>
                          </RadioButton.Group>
                        </View>
                      </View>
                      <View style={{ marginTop: 14 }}>
                        <Text style={{ fontSize: 17 }}>
                          Dejanos tu comentario
                        </Text>
                        <View style={{ marginTop: 4 }}>
                          <TextInput
                            label="Comentario"
                            value={text}
                            mode="outlined"
                            multiline={true}
                            numberOfLines={3}
                            onChangeText={(text) => setText(text)}
                            style={{
                              backgroundColor: colors.avatar,
                              marginTop: 8,
                            }}
                          />
                        </View>
                      </View>
                    </ScrollView>

                    <Dialog.Actions style={{ marginRight: 8 }}>
                      <Button
                        onPress={showDialogPreg3}
                        style={{ fontSize: 17 }}
                      >
                        Validar
                      </Button>
                    </Dialog.Actions>
                  </Dialog.ScrollArea>
                </Dialog>
              </Portal>
            </View>
          </View>
        ) : null}
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
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Cupones);
