import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { editarProveedores } from '../../../redux/actions/user-actions';
import firebaseapp from '../../../firebase/config';
import ProveedoresContext from '../../context/proveedoresContext';
import { LogBox } from 'react-native';

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

function Proveedores(props) {
  //traigo contexto global de proveedores
  const { contextProveedores, setContextProveedores } = React.useContext(
    ProveedoresContext,
  );
  const [proveedores, setProveedores] = React.useState(items);
  const [selectedItems, setSelectedItems] = React.useState(contextProveedores);

  const [cargando, setCargando] = React.useState(false);

  const onSelectedItemsChange = (selectedItems) => {
    setContextProveedores(selectedItems);
    setSelectedItems(selectedItems);
    props.editarProveedores(selectedItems, props.auth.uid);
  };


  const obtenerProveedores = async () => {
    const firestore = firebaseapp.firestore();
    try {
      const proveedores = await firestore.collection('proveedorServicio').get();

      const items = proveedores.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProveedores(items);
    }
    catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    setCargando(false);
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    obtenerProveedores().then(setCargando(true));
  }, []);

  return (
    <View style={styles.container}>
      {cargando ? (
        <SectionedMultiSelect
          items={proveedores}
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
      ) : null}
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
