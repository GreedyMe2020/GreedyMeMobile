import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  RadioButton,
  Snackbar,
  TextInput,
} from 'react-native-paper';
import { connect } from 'react-redux';
import _ from 'lodash';
import { colors } from '../../styles/colores';
import { sumarGreedyPointsEncuesta } from '../../../redux/actions/comercio-actions';

function EncuestaExtraGP(props) {
  const [value, setValue] = React.useState('si');
  const [value1, setValue1] = React.useState('si');
  const [value2, setValue2] = React.useState('muybuena');
  const [text, setText] = React.useState('');
  const [mensajeError, setMensajeError] = React.useState(false);

  //estados para manejar los dialog que se abren de la primer encuesta
  const [visible, setVisible] = React.useState(false);
  const showDialogValidar = () => {
    if (text === '' || /^\s*$/.test(text)) {
      setMensajeError(true);
      return;
    }
    setVisible(true);
  };
  const hideDialogValidar = () => setVisible(false);

  const onDismissSnackBar2 = () => setMensajeError(false);
  //Traigo la info del beneficio y se la asigno a la variable data,
  //y los datos del comercio a las otras variables:
  const { data } = props.route.params;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.contenedor}>
          <View>
            <Text style={styles.textoPregunta}>
              ¿Pudo utilizar el beneficio por el cual asistió a la tienda?
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
                  <Text style={styles.textoRespuesta}>Si</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <RadioButton value="no" />
                  <Text style={styles.textoRespuesta}>No</Text>
                </View>
              </RadioButton.Group>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.textoPregunta}>
              ¿El beneficio coincide con lo especificado en el perfil del
              comercio?
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
                  <Text style={styles.textoRespuesta}>Si</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <RadioButton value="no" />
                  <Text style={styles.textoRespuesta}>No</Text>
                </View>
              </RadioButton.Group>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.textoPregunta}>
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
                  <Text style={styles.textoRespuesta}>Muy buena</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <RadioButton value="buena" />
                  <Text style={styles.textoRespuesta}>Buena</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <RadioButton value="mala" />
                  <Text style={styles.textoRespuesta}>Mala</Text>
                </View>
              </RadioButton.Group>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.textoPregunta}>Dejanos tu comentario</Text>
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
          <Button
            mode="outlined"
            style={styles.botonContestar}
            labelStyle={{ fontSize: 18, color: colors.white }}
            onPress={showDialogValidar}
          >
            Enviar encuesta
          </Button>
          <Portal>
            <Dialog
              visible={visible}
              onDismiss={hideDialogValidar}
              style={{ borderRadius: 8 }}
            >
              <Dialog.Content>
                <View>
                  <Text style={styles.textoIntro}>¡Gracias por contestar!</Text>
                </View>
                <TouchableWithoutFeedback>
                  <View style={styles.cat}>
                    <View style={styles.categorias}>
                      <Text style={styles.textoSumaste}>Sumaste otros</Text>
                      <Text style={styles.texto}>20</Text>
                      <View style={styles.titulo}>
                        <Text style={styles.letraBlanca}>gre</Text>
                        <Text style={styles.letraVerde}>edy</Text>
                        <Text style={styles.letraNaranja}>Points</Text>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Dialog.Content>
              <Dialog.Actions style={{ marginRight: 8 }}>
                <Button
                  onPress={() => {
                    props.sumarGreedyPointsEncuesta(
                      props.auth.uid,
                      data.item.idComercio,
                      value,
                      value1,
                      value2,
                      text,
                    );
                    props.navigation.navigate('Inicio');
                  }}
                  style={{ fontSize: 20 }}
                >
                  Volver al inicio
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
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
              Debés dejar un comentario.
            </Snackbar>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contenedor: {
    marginLeft: 24,
    marginRight: 25,
    marginTop: 15,
  },
  textoPregunta: {
    fontSize: 17,
    marginTop: 5,
  },
  textoRespuesta: {
    fontSize: 17,
    marginLeft: 8,
  },
  botonContestar: {
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: colors.azul,
  },
  textoIntro: {
    fontSize: 23,
    color: colors.black,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  textoIntro2: {
    fontSize: 19,
    color: colors.black,
    alignSelf: 'center',
    marginBottom: 40,
  },
  cat: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categorias: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    backgroundColor: colors.azul,
    borderRadius: 150,
  },
  textoSumaste: {
    color: colors.white,
    fontSize: 20,
  },
  texto: {
    fontSize: 65,
    color: colors.white,
  },
  titulo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  letraBlanca: {
    color: colors.white,
    fontSize: 21,
    fontFamily: 'Poppins-Regular',
  },
  letraVerde: {
    color: colors.celeste,
    fontSize: 21,
    fontFamily: 'Poppins-Regular',
  },
  letraNaranja: {
    color: colors.naranja,
    fontSize: 21,
    fontFamily: 'Poppins-Regular',
  },
  sumaExtra: {
    marginTop: 40,
    marginBottom: 25,
    marginLeft: 25,
    marginRight: 25,
  },
  textoSumaExtra: {
    fontSize: 19,
    color: colors.black,
    textAlign: 'center',
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  botonVolverInicio: {
    alignSelf: 'center',
    marginLeft: 10,
    borderColor: colors.azul,
    borderWidth: 1,
    marginTop: 40,
    width: 160,
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
    sumarGreedyPointsEncuesta: (
      idUsuarioConsumidor,
      idUsuarioComercio,
      value,
      value1,
      value2,
      text,
    ) =>
      dispatch(
        sumarGreedyPointsEncuesta(
          idUsuarioConsumidor,
          idUsuarioComercio,
          value,
          value1,
          value2,
          text,
        ),
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EncuestaExtraGP);
