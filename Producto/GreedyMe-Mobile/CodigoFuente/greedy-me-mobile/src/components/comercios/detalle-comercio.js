import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colores';
import { Rating, SocialIcon } from 'react-native-elements';
import IconButton from '../icon-button';

export default function DetalleComercio(props) {
  return (
    <View style={styles.container}>
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
          <IconButton
            icon="camera"
            text={props.data.item.telefono}
            color={colors.naranja}
          />
          {props.data.item.web ? (
            <IconButton
              icon="camera"
              text={props.data.item.web}
              color={colors.naranja}
              textColor="black"
            />
          ) : (
            <IconButton
              icon="camera"
              text="No cuenta con página web"
              color={colors.azul}
              textColor="white"
            />
          )}
        </View>
      </View>
      <View style={styles.contGeneral}>
        <Text style={styles.informacion}>Seguinos en las redes sociales</Text>
        {props.data.item.facebook ? (
          <SocialIcon button type="facebook" />
        ) : (
          <SocialIcon button disabled type="facebook" />
        )}
        {props.data.item.instagram ? (
          <SocialIcon button type="instagram" />
        ) : (
          <SocialIcon button disabled type="instagram" />
        )}
      </View>
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
    fontSize: 20,
  },
  infoDetalle: {
    fontSize: 14,
  },
  contactoCont: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
