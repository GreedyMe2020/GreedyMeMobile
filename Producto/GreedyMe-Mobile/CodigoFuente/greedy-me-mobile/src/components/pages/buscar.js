import * as React from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Platform,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import BuscadorProveedores from '../buscador/buscador';
import { colors } from '../../styles/colores';
import CardComercio from '../Inicio/card-comercio';

import { connect } from 'react-redux';

function Buscador() {
  return (
    <KeyboardAvoidingView
      style={styles.containerTeclado}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      enabled={Platform.OS === 'ios'}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor={'transparent'}
        />
        <View style={styles.barraSup}>
          <BuscadorProveedores />
        </View>
        <ScrollView style={styles.scroll}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.cards}>
              <Text style={styles.texto}>Locales</Text>
              <CardComercio />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerTeclado: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flex: 2,
  },
  barraSup: {
    marginTop: 5,
    marginBottom: 5,
    flex: 0.1,
  },
  cards: {
    flex: 1,
    width: '100%',
    marginTop: 20,
  },
  texto: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: colors.darkGrey,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Buscador);
