const initState = {
  editData: null,
  dataError: null,
  contraseña: null,
  contraseñaError: null,
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

    default:
      return state;
  }
};

export default userReducer;
