import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { editarProveedores } from '../../../redux/actions/user-actions';
import firebaseapp from '../../../firebase/config';

const firestore = firebaseapp.firestore();
const items = [];
const obtenerProveedores = () => {
  firestore
    .collection('proveedorServicio')
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
obtenerProveedores();

/*const items = [
  // this is the parent or 'item'
  {
    name: 'Bancos',

    // these are the children or 'sub items'
    lista: [
      {
        name: 'Galicia',
      },
      {
        name: 'Santander',
      },
      {
        name: 'Bancor',
      },
      {
        name: 'ICBC',
      },
      {
        name: 'Naranja',
      },
      {
        name: 'HSBC',
      },
    ],
  },
  {
    name: 'Clubes de beneficio',

    // these are the lista or 'sub items'
    lista: [
      {
        name: 'Club Personal',
      },
      {
        name: 'Club Movistar',
      },
      {
        name: 'Club Talleres',
      },
      {
        name: 'Club La Voz',
      },
    ],
  },
  {
    name: 'Entiedades de algo',

    // these are the lista or 'sub items'
    lista: [
      {
        name: 'Club Personal',
      },
      {
        name: 'Club Movistar',
      },
      {
        name: 'Club Talleres',
      },
    ],
  },
];*/

function Proveedores(props) {
  const [selectedItems, setSelectedItems] = React.useState(
    props.profile.proveedoresAsociados,
  );

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
    props.editarProveedores(selectedItems, props.auth.uid);
    console.log(selectedItems);
    console.log(items);
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
        uniqueKey="name"
        subKey="lista"
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
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editarProveedores: (datos, id) => dispatch(editarProveedores(datos, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Proveedores);
