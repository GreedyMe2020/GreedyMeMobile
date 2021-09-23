import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { connect } from 'react-redux';
import firebaseapp from '../../../firebase/config';
import _ from 'lodash';
import { colors } from '../../styles/colores';
import { useFocusEffect } from '@react-navigation/native';

function CardPremium(props) {
  const [cargandoComercios, setCargando] = React.useState(false);
  const [comerciosPremium, setComerciosPremium] = React.useState([]);
  const obtenerComercios = async () => {
    const firestore = firebaseapp.firestore();
    try {
      const comerciosOrigen = await firestore
        .collection('usuarioComercio')
        .where('tipoSuscripcion', '==', 2)
        .get();
      const comerciosTemporal = comerciosOrigen.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComerciosPremium(comerciosTemporal);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setCargando(false);
      obtenerComercios();
      setCargando(true);
    }, []),
  );

  return (
    <SafeAreaView style={styles.flatlist}>
      {cargandoComercios ? (
        <FlatList
          data={comerciosPremium}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={(data) => (
            <TouchableWithoutFeedback>
              <Card
                style={styles.cardComercio}
                onPress={() => {
                  props.navigation.navigate('ComerciosNavegador', {
                    data: data,
                  });
                }}
              >
                <Card.Cover
                  style={styles.image}
                  source={{
                    uri: data.item.photoURL,
                  }}
                />
                <Card.Content>
                  <Title style={styles.tittle}>
                    {data.item.nombreComercio}
                  </Title>
                  <Paragraph style={styles.subtittle}>
                    {data.item.sucursal}
                  </Paragraph>
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>
          )}
        />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardComercio: {
    marginRight: 7,
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 3,
    elevation: 3,
    borderRadius: 7,
    borderColor: colors.avatar,
  },
  image: {
    height: 170,
    width: 180,
    borderRadius: 3,
  },
  tittle: {
    marginTop: 8,
    fontSize: 18,
  },
  subtittle: {
    color: colors.darkGrey,
    marginTop: -2,
    fontSize: 14,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(CardPremium);
