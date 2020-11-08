const initState = {
  favoritos: null,
  errorFavoritos: null,
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
    case 'SETEAR_FAVORITO':
      console.log('SeteoFav');
      return {
        ...state,
        favoritos: null,
      };
    default:
      return state;
  }
};

export default comercioReducer;
