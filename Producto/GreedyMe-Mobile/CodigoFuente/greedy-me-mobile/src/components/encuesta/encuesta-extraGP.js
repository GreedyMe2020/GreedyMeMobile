import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  Button,
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

function EncuestaExtraGP(props) {
  const [value, setValue] = React.useState('si');
  const [value1, setValue1] = React.useState('si');
  const [value2, setValue2] = React.useState('muybuena');
  const [text, setText] = React.useState('');

  return (
    <View>
      <ScrollView>
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontSize: 17, marginTop: 12 }}>
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
                <Text style={{ fontSize: 17, marginLeft: 8 }}>Si</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <RadioButton value="no" />
                <Text style={{ fontSize: 17, marginLeft: 8 }}>No</Text>
              </View>
            </RadioButton.Group>
          </View>
        </View>
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontSize: 17 }}>
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
                <Text style={{ fontSize: 17, marginLeft: 8 }}>Si</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <RadioButton value="no" />
                <Text style={{ fontSize: 17, marginLeft: 8 }}>No</Text>
              </View>
            </RadioButton.Group>
          </View>
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
                <Text style={{ fontSize: 17, marginLeft: 8 }}>Muy buena</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <RadioButton value="buena" />
                <Text style={{ fontSize: 17, marginLeft: 8 }}>Buena</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <RadioButton value="mala" />
                <Text style={{ fontSize: 17, marginLeft: 8 }}>Mala</Text>
              </View>
            </RadioButton.Group>
          </View>
        </View>
        <View style={{ marginTop: 14 }}>
          <Text style={{ fontSize: 17 }}>Dejanos tu comentario</Text>
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

      <Button onPress={''} style={{ fontSize: 17 }}>
        Validar
      </Button>
    </View>
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
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(EncuestaExtraGP);
