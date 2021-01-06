const initState = {
  favoritos: null,
  errorFavoritos: null,
  cupon: null,
  errorCupon: null,
  eliminarCupon: null,
  errorEliminarCupon: null,
  validarCupon: null,
  errorValidarCupon: null,
  comerciosRedux: null,
};

const comercioReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CAMBIAR_FAVORITO':
      console.log('Comercio agregado');
      return {
        ...state,
        favoritos: 'Se cambió favorito',
      };
    case 'ERROR_FAVORITOS':
      console.log('Error');
      return {
        ...state,
        errorFavoritos: 'Ocurrió algún error',
      };
    case 'GUARDAR_CUPON':
      console.log('Cupon agregado');
      return {
        ...state,
        cupon: 'Se agrego cupon',
      };
    case 'ERROR_CUPON':
      console.log('Error');
      return {
        ...state,
        errorCupon: 'Ocurrió algún error al agregar cupon',
      };
    case 'ELIMINAR_CUPON':
      console.log('Cupon eliminado');
      return {
        ...state,
        eliminarCupon: 'Se elimino cupon',
      };
    case 'ERROR_ELIMINAR_CUPON':
      console.log('Error al eliminar cupon');
      return {
        ...state,
        errorEliminarCupon: 'Ocurrió algún error al eliminar cupon',
      };
    case 'VALIDAR_CUPON':
      console.log('Cupon validado');
      return {
        ...state,
        validarCupon: 'Se valido el cupon',
      };
    case 'ERROR_VALIDAR_CUPON':
      console.log('Error al validar cupon');
      return {
        ...state,
        errorValidarCupon: 'Ocurrió algún error al validar cupon',
      };
    default:
      return state;
  }
};

export default comercioReducer;
