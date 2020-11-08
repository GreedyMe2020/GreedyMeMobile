import * as React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { colors } from '../../styles/colores';

export default function SearchBarBuscar(props) {
  return (
    <KeyboardAvoidingView
      style={styles.containerTeclado}
      behavior={Platform.OS === 'ios' ? '' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      enabled={Platform.OS === 'ios'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SearchBar
          placeholder="Buscar comercio"
          onChangeText={props.onChangeText}
          value={props.texto}
          inputContainerStyle={{
            backgroundColor: '#F6F8F7',
            borderRadius: 100,
            height: 40,
          }}
          containerStyle={props.styleContainer}
          lightTheme
          round
        />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  searchcontainer: {
    backgroundColor: colors.azul,
    borderWidth: 0, //no effect
    shadowColor: colors.white, //no effect
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
});
