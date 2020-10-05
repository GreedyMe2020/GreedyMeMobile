const initState = {
  editData: null,
  dataError: null,
  contra: null,
  contraError: null,
  proveedor: null,
  proveedorError: null,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'EDITAR_DATOS':
      console.log('se actualizaron los datos');
      return {
        ...state,
        editData: 'se edito correctamente',
      };
    case 'ERROR_DATOS':
      console.log('no se actualizaron perrito malvadito brodersito');
      return {
        ...state,
        dataError: 'Ocurrio algun error',
      };
    case 'CAMBIAR_CONTRASEÑA':
      console.log('se cambio la contraseña');
      return {
        ...state,
        contra: 'se cambio la contraseña',
        contraError: null,
      };
    case 'ERROR_CONTRASEÑA':
      console.log('no se cambio la contraseña');
      return {
        ...state,
        contraError: action.error,
        contra: null,
      };
    case 'EDITAR_PROVEEDOR':
      console.log('se cambio los proveedores');
      return {
        ...state,
        proveedor: 'se cambio los proveedores',
        proveedorError: null,
      };
    case 'ERROR_PROVEEDOR':
      console.log('no se cambio los proveedores');
      return {
        ...state,
        proveedorError: 'no se cambio los proveedores',
        proveedor: null,
      };

    default:
      return state;
  }
};

export default userReducer;