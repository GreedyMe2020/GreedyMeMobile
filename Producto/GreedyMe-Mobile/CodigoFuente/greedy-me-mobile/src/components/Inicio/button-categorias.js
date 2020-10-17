import * as React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { StyleSheet, StatusBar, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../../styles/colores';
import Carousel from 'react-native-snap-carousel';

function ButtonCategorias() {
  /*   const { activeIndex, setActive } = React.useState(0);

  const categorias = [
    {
      title: 'Indumentaria',
      ico: 'Text 1',
    },
    {
      title: 'Hogar',
      text: 'Text 2',
    },
    {
      title: 'Supermercado',
      text: 'Text 3',
    },
    {
      title: 'Supermercado',
      text: 'Text 4',
    },
    {
      title: 'Supermercado',
      text: 'Text 5',
    },
  ];

  const renderItem = ({ tittle, item, index }) => {
    return (
      <View>
        <TouchableOpacity style={styles.categorias} activeOpacity={0.5}>
          <Image
            source={require('../../multimedia/categorias/shirt.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.texto}>{tittle}</Text>
      </View>
    );
  };

  const carousel = React.createRef(); */

  return (
    <View>
      <TouchableOpacity style={styles.categorias} activeOpacity={0.5}>
        <Image
          source={require('../../multimedia/categorias/shirt.png')}
          style={styles.image}
        />
      </TouchableOpacity>
      <Text style={styles.texto}>Indumentaria</Text>
      {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Carousel
          layout={'default'}
          ref={carousel}
          data={categorias}
          sliderWidth={300}
          itemWidth={300}
          renderItem={renderItem}
          onSnapToItem={(index) => setActive({ activeIndex: index })}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  categorias: {
    borderWidth: 1,
    borderColor: colors.avatar,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: colors.avatar,
    borderRadius: 50,
    marginLeft: 5,
    marginRight: 5,
  },
  image: {
    padding: 10,
    margin: 5,
    height: 32,
    width: 32,
    resizeMode: 'stretch',
  },
  texto: {
    marginTop: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(ButtonCategorias);
