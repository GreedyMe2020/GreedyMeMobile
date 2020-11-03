import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from 'react-native-elements';
import firebaseapp from '../../../firebase/config';

const firestore = firebaseapp.firestore();
const items = [];
const obtenerPromociones = () => {
  firestore
    .collection('tipoPromocion')
    .get()
    .then((snapShots) => {
      snapShots.forEach((doc) => {
        const data = doc.data();
        items.push({
          ...data,
          id: doc.id,
        });
      });
    });
};
obtenerPromociones();

const rubros = [];
const obtenerRubros = () => {
  firestore
    .collection('rubros')
    .orderBy('prioridad')
    .onSnapshot((snapShots) => {
      snapShots.forEach((doc) => {
        const data = doc.data();
        rubros.push({
          ...data,
          id: doc.id,
        });
      });
    });
};
obtenerRubros();


export default function BuscadorProveedores(props) {
  //estado para controlar el use Effect
  const [yaPaso, setYaPaso] = React.useState(false);
  //estado para el useEffect de los rubros
  const [listaRubros, setListaRubros] = React.useState(rubros);
  //estado de los items seleccionados
  const [selectedItems, setSelectedItems] = React.useState([]);
  //funcion que selecciona los items
  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
    //paso los items seleccionados al componente padre buscar de pages
    props.filtrar(selectedItems);
  };
  //use effect para acomodar los rubros en el selectionedMultiSelect
  React.useEffect(() => {
    if (listaRubros.length > 1) {
      const lista = [];
      rubros.forEach((rubro) => {
        lista.push({
          name: rubro.nombre,
          id: rubro.prioridad + Math.random() * 100,
        });
      });
      items.push({
        name: 'Rubros',
        lista: lista,
      });
    }
  }, [listaRubros]);

  return (
    <View style={styles.container}>
      <SectionedMultiSelect
        items={items}
        IconRenderer={Icon}
        uniqueKey="name"
        subKey="lista"
        selectText={
          selectedItems.length > 1 ? (
            'Filtros'
          ) : (
            <View style={styles.filtroText}>
              <Icons name="filter-outline" size={18} color="#838d9e" />
              <Text style={styles.icons}>    Seleccionar filtros</Text>
            </View>
          )
        }
        showDropDowns={true}
        readOnlyHeadings={true}
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
        confirmText="Confirmar"
        selectedText="seleccionados"
        searchPlaceholderText="Buscar filtro..."
        noResultsComponent={<Text>Lo siento, no encontramos resultados.</Text>}
        colors={{
          primary: '#1E1B4D',
          chipColor: '#76B39D',
          success: '#76B39D',
          subText: '#707070',
        }}
        styles={{
          chipText: { fontSize: 16, fontWeight: 'bold' },
          selectToggle: {
            marginLeft: 22,
            marginRight: 18,
            marginBottom: 10,
            backgroundColor: '#F6F8F7',
            borderRadius: 100,
            height: 40,
            paddingTop: 8,
            paddingLeft: 7,
            paddingRight: 8,
          },
          selectToggleText: {
            fontSize: 17,
          },
          itemText: {
            fontSize: 22,
            marginLeft: 5,
            paddingTop: 15,
          },
          toggleIcon: {
            paddingTop: 18,
          },
          selectedItem: {
            marginRight: 16,
          },
          subItemText: {
            fontSize: 17,
            marginLeft: 16,
            marginRight: 16,
            paddingTop: 5,
          },
          selectedSubItemText: {
            fontWeight: 'bold',
          },
          chipsWrapper: {
            marginLeft: 22,
            marginRight: 22,
          },
          button: {
            height: 50,
          },
          listContainer: {
            marginLeft: 22,
            marginRight: 22,
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  containerTeclado: {
    flex: 1,
  },
  filtroText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icons: {
    marginLeft: 0,
    fontSize: 17,
    letterSpacing: 0.4,
    color: '#838d9e',
  },
});
