const initState = {
  favoritos: null,
  errorFavoritos: null,
  cupon: null,
  errorCupon: null,
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
      console.log('Comercio agregado');
      return {
        ...state,
        cupon: 'Se agrego cupon',
      };
    case 'ERROR_CUPON':
      console.log('Error');
      return {
        ...state,
        errorCupon: 'Ocurrió algún error con el cupon',
      };
    case 'SETEAR_FAVORITO':
      console.log('SeteoFav');
      return {
        ...state,
        favoritos: null,
      };
    case 'LISTA_COMERCIOS':
      console.log('Seteoloscomerciospadre');
      return {
        ...state,
        comerciosRedux: action.comercios,
      };
    default:
      return state;
  }
};

export default comercioReducer;
