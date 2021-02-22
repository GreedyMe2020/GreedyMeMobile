import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { colors } from '../../styles/colores';
import { ProgressBar, Divider } from 'react-native-paper';

export default function ReseñasComercio(props) {
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
                progress={0.7}
                color={colors.naranja}
                style={styles.barra}
              />
            </View>
            <View style={styles.progres}>
              <Text style={styles.textoC}>Regular</Text>
              <ProgressBar
                progress={0.5}
                color={colors.celeste}
                style={styles.barra}
              />
            </View>
            <View style={styles.progres}>
              <Text style={styles.textoC}>Mala</Text>
              <ProgressBar
                progress={0.2}
                color={colors.error}
                style={styles.barra}
              />
            </View>
          </View>
          <View style={styles.contenedorComentarios}>
            <Text style={styles.texto}>Comentarios</Text>
            <View style={styles.coments}>
              <Text style={styles.nombre}>Nombre</Text>
              <Divider
                style={{
                  height: 1,
                  backgroundColor: colors.grey,
                }}
              />
              <Text style={styles.comentario}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis
              </Text>
            </View>
            <View style={styles.coments}>
              <Text style={styles.nombre}>Nombre</Text>
              <Divider
                style={{
                  height: 1,
                  backgroundColor: colors.grey,
                }}
              />
              <Text style={styles.comentario}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
