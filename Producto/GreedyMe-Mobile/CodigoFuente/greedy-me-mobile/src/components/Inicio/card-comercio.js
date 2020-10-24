import * as React from 'react';
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import { IconButton, List, Divider } from 'react-native-paper';
import { connect } from 'react-redux';
import firebaseapp from '../../../firebase/config';
import _ from 'lodash';
import { colors } from '../../styles/colores';

const firestore = firebaseapp.firestore();
const comercios = [];
const obtenerComercios = () => {
  firestore.collection('usuarioComercio').onSnapshot((snapShots) => {
    snapShots.forEach((doc) => {
      const data = doc.data();
      comercios.push({
        ...data,
        id: doc.id,
      });
    });
  });
};
obtenerComercios();

function CardComercio(props) {
  //Para que funcione mostrar corazon rojo
  const [corazon, setCorazon] = React.useState(false);
  return (
    <SafeAreaView>
      <FlatList
        data={comercios}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        renderItem={(data) => (
          <TouchableWithoutFeedback onPress={() => {}}>
            <View>
              <View style={styles.contList}>
                <List.Item
                  title={data.item.nombreComercio}
                  titleStyle={styles.titulo}
                  description={data.item.sucursal}
                  style={styles.lista}
                  onPress={() => {
                    props.navigation.navigate('ComerciosNavegador', {
                      data: data,
                    });
                  }}
                  right={() => (
                    <IconButton
                      icon={corazon ? 'heart-outline' : 'heart'}
                      color={corazon ? colors.grey : '#cf3434'}
                      size={27}
                      style={styles.corazonIcon}
                      onPress={() => setCorazon(!corazon)}
                    />
                  )}
                  left={() => (
                    <Image
                      style={styles.image}
                      source={{
                        uri: data.item.photoURL,
                      }}
                    />
                  )}
                />
              </View>
              <Divider
                style={{
                  height: 1,
                  backgroundColor: colors.avatar,
                  marginLeft: 20,
                  marginRight: 20,
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contList: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 8,
    marginTop: 8,
  },
  lista: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 80,
    width: 80,
    marginRight: 10,
    borderRadius: 3,
  },
  corazonIcon: {
    marginRight: 0,
    alignSelf: 'center',
    //opacity: 0.8,
  },
  titulo: {
    marginBottom: 4,
    fontSize: 17,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(CardComercio);

/*function CardComercio(props) {
  return (
    <View style={styles.cardCom}>
      {comercios
        ? comercios.map((com) => {
            return (
              <Card style={styles.cardCom}>
                <List.Item
                  title={com.nombreComercio}
                  description={com.sucursal}
                  right={(props) => (
                    <IconButton
                      icon="heart"
                      color={colors.avatar}
                      size={25}
                      style={styles.corazonIcon}
                      onPress={() => console.log('Pressed')}
                    />
                  )}
                  left={(props) => (
                    <Image
                      style={styles.image}
                      source={{
                        uri: com.photoURL,
                      }}
                    />
                  )}
                />
              </Card>
            );
          })
        : null}
    </View>
  );
}*/
