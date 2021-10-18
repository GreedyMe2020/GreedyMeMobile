const initState = {
  favoritos: null,
  errorFavoritos: null,
  cupon: null,
  errorCupon: null,
  eliminarCupon: null,
  errorEliminarCupon: null,
  validarCupon: null,
  errorValidarCupon: null,
  sumarGreedyPoints: null,
  errorGreedyPoints: null,
  sumarEncuestaGreedyPoints: null,
  errorEncuestaPoints: null,
  tokenAFavorito: null,
  errorTokenAFavorito: null,
  eliminarTokenAFavorito: null,
  errorEliminarTokenAFavorito: null,
  estadisticaAFavorito: null,
  errorEstadisticaAFavorito: null,
  eliminarEstadisticaAFavorito: null,
  errorEliminarEstadisticaAFavorito: null,
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
    case 'SUMAR_GREEDY_POINTS':
      console.log('Sumado GreedyPoints');
      return {
        ...state,
        sumarGreedyPoints: 'Se sumo los greedypoints',
      };
    case 'ERROR_GREEDY_POINTS':
      console.log('Error al sumar greedyPoints');
      return {
        ...state,
        errorGreedyPoints: 'Ocurrió algún error al sumar los 20 greedypoints',
      };
    case 'ENCUESTA_GREEDY_POINTS':
      console.log('Sumado encuesta 20 GreedyPoints');
      return {
        ...state,
        sumarEncuestaGreedyPoints: 'Se sumo los greedypoints',
      };
    case 'ERROR_ENCUESTA':
      console.log('Error al sumar encuesta 20 greedyPoints');
      return {
        ...state,
        errorEncuestaPoints: 'Ocurrió algún error al sumar los 20 greedypoints',
      };
    case 'CAMBIAR_TOKENFAVORITO':
      console.log('agregaste token a favorito');
      return {
        ...state,
        tokenAFavorito: 'se agrego token a favorito',
      };
    case 'ERROR_TOKENFAVORITO':
      console.log('no agregaste token a favorito');
      return {
        ...state,
        errorTokenAFavorito: 'error al agregar token a favorito',
      };
    case 'ELIMINAR_TOKENFAVORITO':
      console.log('eliminaste token a favorito');
      return {
        ...state,
        eliminarTokenAFavorito: 'se elimino token a favorito',
      };
    case 'ERROR_ELIMINARTOKENFAVORITO':
      console.log('no eliminaste token a favorito');
      return {
        ...state,
        errorEliminarTokenAFavorito: 'error al eliminar token a favorito',
      };
    case 'CAMBIAR_ESTADISTICAFAVORITO':
      console.log('agregaste estadistica a favorito');
      return {
        ...state,
        estadisticaAFavorito: 'se agrego token a favorito',
      };
    case 'ERROR_ESTADISTICAFAVORITO':
      console.log('no agregaste estadistica a favorito');
      return {
        ...state,
        errorEstadisticaAFavorito: 'error al agregar estadistica a favorito',
      };
    case 'ELIMINAR_ESTADISTICAFAVORITO':
      console.log('eliminaste estadistica a favorito');
      return {
        ...state,
        eliminarEstadisticaAFavorito: 'se elimino estadistica a favorito',
      };
    case 'ERROR_ELIMINARESTADISTICAFAVORITO':
      console.log('no eliminaste estadistica a favorito');
      return {
        ...state,
        errorEliminarEstadisticaAFavorito:
          'error al eliminar estadistica a favorito',
      };
    default:
      return state;
  }
};

export default comercioReducer;
