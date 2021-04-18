import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { editarProveedores } from '../../../redux/actions/user-actions';
import firebaseapp from '../../../firebase/config';
import { colors } from '../../styles/colores';
import ProveedoresContext from '../../context/proveedoresContext';

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

function ProveedoresLogin(props) {
  //traigo contexto global de proveedores
  const { contextProveedores, setContextProveedores } = React.useContext(
    ProveedoresContext,
  );

  const [selectedItems, setSelectedItems] = React.useState(contextProveedores);

  //const [disable, setDisable] = React.useState('');

  const onSelectedItemsChange = (selectedItems) => {
    /*if (selectedItems === null) {
      setDisable('');
    } else {
      setDisable('true');
    }*/
    setContextProveedores(selectedItems);
    setSelectedItems(selectedItems);
    props.editarProveedores(selectedItems, props.auth.uid);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        Seleccioná todos los proveedores de beneficios a los cuáles estás
        asociado para que podamos mostrarte las promociones y descuentos que
        tienen para vos!
      </Text>
      <SectionedMultiSelect
        items={items}
        IconRenderer={Icon}
        uniqueKey="name"
        subKey="lista"
        selectText="Mis proveedores "
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
      <Button
        style={styles.boton}
        mode="outlined"
        labelStyle={{ fontSize: 16, color: colors.azul }}
        onPress={() => props.navigation.goBack()}
      >
        Guardar proveedores
      </Button>

      <Button
        style={styles.botonOmitir}
        mode="text"
        labelStyle={{ fontSize: 16, color: 'rgba(30, 27, 77, 0.8)' }}
        onPress={() => props.navigation.goBack()}
      >
        Omitir por ahora
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    top: 30,
  },
  containerTeclado: {
    flex: 1,
  },
  texto: {
    marginLeft: 22,
    marginRight: 20,
    marginBottom: 30,
    fontSize: 18,
  },
  boton: {
    alignSelf: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(30, 27, 77, 0.1)',
    borderWidth: 0,
  },
  botonOmitir: {
    alignSelf: 'center',
    marginTop: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    logeo: state.auth.logeo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editarProveedores: (datos, id) => dispatch(editarProveedores(datos, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProveedoresLogin);
