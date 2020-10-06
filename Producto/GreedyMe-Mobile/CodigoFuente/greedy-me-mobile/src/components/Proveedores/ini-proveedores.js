import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { connect } from 'react-redux';
import { signIn } from '../../../redux/actions/auth-actions';

const items = [
  // this is the parent or 'item'
  {
    name: 'Bancos',
    id: 0,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Galicia',
        id: 10,
      },
      {
        name: 'Santander',
        id: 17,
      },
      {
        name: 'Bancor',
        id: 13,
      },
      {
        name: 'ICBC',
        id: 14,
      },
      {
        name: 'Naranja',
        id: 15,
      },
      {
        name: 'HSBC',
        id: 16,
      },
    ],
  },
  {
    name: 'Clubes de beneficio',
    id: 1,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Club Personal',
        id: 1,
      },
      {
        name: 'Club Movistar',
        id: 2,
      },
      {
        name: 'Club Talleres',
        id: 3,
      },
      {
        name: 'Club La Voz',
        id: 4,
      },
    ],
  },
  {
    name: 'Entiedades de algo',
    id: 2,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Club Personal',
        id: 20,
      },
      {
        name: 'Club Movistar',
        id: 30,
      },
      {
        name: 'Club Talleres',
        id: 40,
      },
    ],
  },
];

function Proveedores(props) {
  const [selectedItems, setSelectedItems] = React.useState([]);

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };
  /* const list = [
    {
      name: 'Amy Farha',
      subtitle: 'Vice President',
    },
    {
      name: 'Chris Jackson',
      subtitle: 'Vice Chairman',
    },
  ];

  const [checked, setChecked] = React.useState('unchecked');

  const handleChangeCheck = () => {
    if (checked === 'checked') {
      setChecked('unchecked');
    } else {
      setChecked('checked');
    }
  }; */

  return (
    <View style={styles.container}>
      <SectionedMultiSelect
        items={items}
        IconRenderer={Icon}
        uniqueKey="id"
        subKey="children"
        selectText="Mis proveedores de descuento"
        showDropDowns={true}
        readOnlyHeadings={true}
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
        confirmText="Confirmar"
        selectedText="seleccionados"
        searchPlaceholderText="Buscar proveedor"
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
            marginRight: 22,
            marginBottom: 10,
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
      {/* {list.map((l, i) => (
        <List.Item
          key={i}
          title={l.name}
          right={(props) => (
            <Checkbox.Item onPress={handleChangeCheck} status={checked} />
          )}
        />
      ))} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    top: 50,
  },
  containerTeclado: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch(signIn(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Proveedores);
