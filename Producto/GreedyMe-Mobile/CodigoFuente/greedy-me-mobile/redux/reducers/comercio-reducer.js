const initState = {
  favoritos: null,
  errorFavoritos: null,
};

const comercioReducer = (state = initState, action) => {
  switch (action.type) {
    case 'COMERCIO_AGREGADO':
      console.log('Comercio agregado');
      return {
        ...state,
        favoritos: 'se agregó como favorito un comercio',
      };
    case 'COMERCIO_QUITADO':
      console.log('Comercio quitado');
      return {
        ...state,
        favoritos: null,
      };
    case 'ERROR_FAVORITOS':
      console.log('Error');
      return {
        ...state,
        errorFavoritos: 'Ocurrió algún error',
      };
    default:
      return state;
  }
};

export default comercioReducer;
