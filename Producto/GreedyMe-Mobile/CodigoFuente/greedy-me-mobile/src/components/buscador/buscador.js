import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from 'react-native-elements';

const items = [
  {
    name: 'Promoción',
    id: 0,
    promociones: [
      {
        name: '2x1',
        id: 10,
      },
      {
        name: '5x4',
        id: 20,
      },
      {
        name: '3x2',
        id: 30,
      },
      {
        name: '3x1',
        id: 40,
      },
    ],
  },
  {
    name: 'Descuento',
    id: 0,
    promociones: [
      {
        name: '10%',
        id: 12,
      },
      {
        name: '15%',
        id: 22,
      },
      {
        name: '25%',
        id: 32,
      },
      {
        name: '50%',
        id: 42,
      },
    ],
  },
  {
    name: 'Rubro',
    id: 0,
    promociones: [
      {
        name: 'Indumentaria',
        id: 13,
      },
      {
        name: 'Deporte',
        id: 23,
      },
      {
        name: 'Gastonomia',
        id: 33,
      },
      {
        name: 'Hogar',
        id: 43,
      },
    ],
  },
];

export default function BuscadorProveedores(props) {
  const [selectedItems, setSelectedItems] = React.useState([]);

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };

  return (
    <View style={styles.container}>
      <SectionedMultiSelect
        items={items}
        IconRenderer={Icon}
        uniqueKey="id"
        subKey="promociones"
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
