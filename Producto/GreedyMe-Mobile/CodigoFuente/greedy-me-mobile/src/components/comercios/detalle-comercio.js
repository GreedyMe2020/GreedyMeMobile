import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../styles/colores';
import { Rating, SocialIcon } from 'react-native-elements';
import IconButton from '../icon-button';
import * as Linking from 'expo-linking';
import AppLink from 'react-native-app-link';

export default function DetalleComercio(props) {
  //Funcion para linkear a una pagina cuando se haga boton en
  //el icono correspondiente en la seccion de contacto.
  const handlePress = (web) => {
    Linking.openURL(web);
  };

  const FACEBOOK_URL = 'https://www.facebook.com/';

  return (
    <View style={styles.container}>
      <ScrollView style={styles.background}>
        <View style={styles.tituloCont}>
          <Text style={styles.titulo}>{props.data.item.nombreComercio}</Text>
          <Text style={styles.sucursal}>{props.data.item.sucursal}</Text>
          <Rating
            imageSize={24}
            readonly
            startingValue={3.5}
            tintColor={colors.avatar}
            style={styles.rating}
          />
          <Text style={styles.direccion}>{props.data.item.direccion}</Text>
        </View>
        <View style={styles.contGeneral}>
          <Text style={styles.informacion}>Información</Text>
          <Text style={styles.infoDetalle}>
            Aca supuestamente va info pero no se info de que va a ir porque no
            pusimos nada xdxdxdlol killmeplis quiero terminar la tesis.
          </Text>
        </View>
        <View style={styles.contGeneral}>
          <Text style={styles.informacion}>Contacto</Text>
          <View style={styles.contactoCont}>
            {props.data.item.web ? (
              <SocialIcon
                type="google"
                style={styles.redesBtn}
                onPress={() => handlePress(props.data.item.web)}
              />
            ) : null}
            {props.data.item.facebook || props.data.item.facebook !== '' ? (
              <SocialIcon
                type="facebook"
                style={styles.redesBtn}
                onPress={() =>
                  handlePress(
                    'fb://facewebmodal/f?href=' +
                      FACEBOOK_URL +
                      props.data.item.facebook,
                  )
                }
              />
            ) : null}
            {props.data.item.instagram ? (
              <SocialIcon
                type="instagram"
                style={styles.redesBtn}
                onPress={() =>
                  handlePress(
                    'instagram://user?username=' + props.data.item.instagram,
                  )
                }
              />
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: colors.avatar,
  },
  tituloCont: {
    marginBottom: 15,
    paddingLeft: 20,
    marginTop: 15,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
  },
  sucursal: {
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  rating: {
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  direccion: {
    fontSize: 14,
    marginTop: 2,
  },
  contGeneral: {
    marginBottom: 15,
    paddingLeft: 20,
    marginTop: 10,
  },
  informacion: {
    fontSize: 23,
  },
  infoDetalle: {
    fontSize: 14,
  },
  contactoCont: {
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  redesBtn: {
    marginLeft: 0,
  },
  background: {},
});
