import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { colors } from '../../styles/colores';
import { ProgressBar, Divider } from 'react-native-paper';
import firebaseapp from '../../../firebase/config';

const firestore = firebaseapp.firestore();
export default function ReseñasComercio(props) {
  const [reseñas, setReseñas] = React.useState(null);
  const [muyBuena, setMuyBuena] = React.useState(0);
  const [buena, setBuena] = React.useState(0);
  const [mala, setMala] = React.useState(0);

  React.useEffect(() => {
    firestore
      .collection('usuarioComercio')
      .doc(props.idcomercio)
      .collection('reseñas')
      .get()
      .then((reseñas) => {
        const arrayReseñas = reseñas.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        let muybuena = 0;
        let buena = 0;
        let mala = 0;
        arrayReseñas.forEach((reseña) => {
          if (reseña.atencionVendedor === 'muybuena') {
            muybuena += 1;
          }
          if (reseña.atencionVendedor === 'buena') {
            buena += 1;
          }
          if (reseña.atencionVendedor === 'mala') {
            mala += 1;
          }
          setMuyBuena(muybuena);
          setBuena(buena);
          setMala(mala);
        });
        setReseñas(arrayReseñas);
      })
      .catch((err) => console.log(err));
  }, []);

  //esta if no funciona no se porque
  if (reseñas === null || reseñas === []) {
    return (
      <View style={styles.contenedor}>
        <Image
          style={styles.image}
          source={require('../../multimedia/reseñas.png')}
        />
        <Text style={styles.text}>No se encontraron reseñas</Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {/* <View style={styles.contenedor}>
          <Image
            style={styles.image}
            source={require('../../multimedia/reseñas.png')}
          />
          <Text style={styles.text}>No se encontraron reseñas</Text>
        </View> */}
          <View style={styles.contenedorTodo}>
            <Text style={styles.texto}>Atención en el local</Text>
            <View style={styles.contenedorOpinion}>
              <View style={styles.progres}>
                <Text style={styles.textoC}>Muy buena</Text>
                <ProgressBar
                  progress={
                    reseñas.lenght === 0
                      ? 0
                      : muyBuena === 0
                      ? 0
                      : muyBuena / reseñas.lenght
                  }
                  color={colors.naranja}
                  style={styles.barra}
                />
              </View>
              <View style={styles.progres}>
                <Text style={styles.textoC}>Regular</Text>
                <ProgressBar
                  progress={
                    reseñas.lenght === 0
                      ? 0
                      : buena === 0
                      ? 0
                      : buena / reseñas.lenght
                  }
                  color={colors.celeste}
                  style={styles.barra}
                />
              </View>
              <View style={styles.progres}>
                <Text style={styles.textoC}>Mala</Text>
                <ProgressBar
                  progress={
                    reseñas.lenght === 0
                      ? 0
                      : mala === 0
                      ? 0
                      : mala / reseñas.lenght
                  }
                  color={colors.error}
                  style={styles.barra}
                />
              </View>
            </View>
            <View style={styles.contenedorComentarios}>
              <Text style={styles.texto}>Comentarios</Text>
              {reseñas.map((reseña) => {
                return (
                  <View style={styles.coments} key={reseña.id}>
                    <Text style={styles.nombre}>
                      {reseña.nombre + ' ' + reseña.apellido}
                    </Text>
                    <Divider
                      style={{
                        height: 1,
                        backgroundColor: colors.grey,
                      }}
                    />
                    <Text style={styles.comentario}>{reseña.comentario}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f3f3',
    flex: 1,
  },
  contenedor: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 350,
  },
  text: {
    fontSize: 17,
  },
  contenedorTodo: {
    marginTop: 20,
    marginLeft: 20,
  },
  contenedorOpinion: {
    marginTop: 5,
  },
  progres: {
    marginRight: 22,
    marginTop: 10,
  },
  texto: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textoC: {
    fontSize: 16,
  },
  contenedorComentarios: {
    marginTop: 30,
    marginRight: 22,
  },
  coments: {
    marginTop: 10,
  },
  nombre: {
    color: colors.black,
    fontSize: 16,
  },
  comentario: {
    marginTop: 5,
    color: colors.black,
    fontSize: 15,
    marginBottom: 3,
  },
});
