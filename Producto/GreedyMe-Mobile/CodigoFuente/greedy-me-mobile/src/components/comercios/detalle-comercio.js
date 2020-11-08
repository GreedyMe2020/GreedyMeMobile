import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../styles/colores';
import { Rating, Icon, SocialIcon } from 'react-native-elements';
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
            tintColor={'#f3f3f3'}
            style={styles.rating}
          />
          <Text style={styles.direccion}>{props.data.item.direccion}</Text>
        </View>
        <View style={styles.contGeneral}>
          {props.data.item.web ||
          props.data.item.facebook ||
          props.data.item.instagram ? (
            <Text style={styles.informacion}>Contacto</Text>
          ) : null}
          <View style={styles.contactoCont}>
            {props.data.item.web ? (
              // <SocialIcon
              //   type="google"
              //   style={styles.redesBtn}
              //   onPress={() => handlePress(props.data.item.web)}
              // />
              <Icon
                raised
                containerStyle={styles.redesBtn}
                name="world-o"
                type="fontisto"
                color="#266d58"
                reverse={true}
                size={24.8}
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
                style={{
                  backgroundColor: '#C434A3',
                  marginTop: 10,
                  marginLeft: 0,
                }}
                iconColor={colors.white} //#813CB0 - violeta - "#DA08A7"
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
    backgroundColor: '#f3f3f3',
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
    marginTop: 5,
    marginBottom: 5,
    fontFamily: 'Poppins',
  },
  rating: {
    marginBottom: 5,
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
    marginTop: 10,
  },
  background: {},
});
