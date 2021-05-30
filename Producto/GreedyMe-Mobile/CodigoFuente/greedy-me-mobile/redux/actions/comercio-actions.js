import _ from 'lodash';
import secondaryApp from '../../firebase/config-secondary';

export const agregarComercioFavorito = (idUsuario, idComercio) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const favs = getState().firebase.profile.favorito;
    favs.push(idComercio);
    const firestore = getFirestore();
    firestore
      .collection('usuarioConsumidor')
      .doc(idUsuario)
      .update({
        favorito: favs,
      })
      .then(() => {
        dispatch({ type: 'CAMBIAR_FAVORITO' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_FAVORITOS', error });
      });
  };
};

export const eliminarComercioFavorito = (idUsuario, idComercio) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const favs = getState().firebase.profile.favorito;
    const indice = _.findIndex(favs, function (o) {
      return o === idComercio;
    });
    favs.splice(indice, 1);
    const firestore = getFirestore();
    firestore
      .collection('usuarioConsumidor')
      .doc(idUsuario)
      .update({
        favorito: favs,
      })
      .then(() => {
        dispatch({ type: 'ELIMINAR_FAVORITO' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_ELIMINAR_FAVORITOS', error });
      });
  };
};

export const guardarCupon = (idUsuario, datos, comercio, sucursal, id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('usuarioConsumidor')
      .doc(idUsuario)
      .collection('cupones')
      .doc()
      .set({
        idBeneficio: datos.id,
        tipoPromo: datos.tipoPromo,
        valuePromo: datos.valuePromo,
        otraPromo: datos.otraPromo,
        tipoProveedor: datos.tipoProveedor,
        valueProveedor: datos.valueProveedor,
        otroProveedor: datos.otroProveedor,
        desdeVigencia: datos.desdeVigencia,
        hastaVigencia: datos.hastaVigencia,
        descripcion: datos.descripcion,
        photoURL: datos.photoURL,
        diaAplicacion: datos.diaAplicacion,
        medioPago: datos.medioPago,
        nombreComercio: comercio,
        sucursal: sucursal,
        idComercio: id,
      })
      .then(() => {
        dispatch({ type: 'GUARDAR_CUPON' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_CUPON', error });
      });
  };
};

export const eliminarCupon = (idUsuario, id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('usuarioConsumidor')
      .doc(idUsuario)
      .collection('cupones')
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: 'ELIMINAR_CUPON' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_ELIMINAR_CUPON', error });
      });
  };
};

export const validaCupon = (idUsuario, idCupon, idValidacion) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('usuarioConsumidor')
      .doc(idUsuario)
      .collection('cupones')
      .doc(idCupon)
      .delete();
    const bd = secondaryApp.firestore();
    bd.collection('codigoCupon')
      .doc(idValidacion)
      .update({
        validado: true,
      })
      .then(() => {
        dispatch({ type: 'VALIDAR_CUPON' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_VALIDAR_CUPON', error });
      });
  };
};

export const sumarGreedyPoints = (
  idUsuarioConsumidor,
  idUsuarioComercio,
  rating,
) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const increment = firestore.FieldValue.increment(1);
    const increment2 = firestore.FieldValue.increment(10);
    const increment3 = firestore.FieldValue.increment(rating);
    firestore
      .collection('usuarioConsumidor')
      .doc(idUsuarioConsumidor)
      .update({ greedyPoints: increment2 });
    firestore
      .collection('usuarioComercio')
      .doc(idUsuarioComercio)
      .update({ contadorPreguntas: increment, sumadorPreguntas: increment3 });
    const bd = secondaryApp.firestore();
    bd.collection('usuarioComercio')
      .doc(idUsuarioComercio)
      .update({ contadorPreguntas: increment, sumadorPreguntas: increment3 })
      .then(() => {
        dispatch({ type: 'SUMAR_GREEDY_POINTS' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_GREEDY_POINTS', error });
      });
  };
};

export const sumarGreedyPointsEncuesta = (
  idUsuarioConsumidor,
  idUsuarioComercio,
  value,
  value1,
  value2,
  text,
  nombre,
  apellido,
) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const increment2 = firestore.FieldValue.increment(20);
    firestore
      .collection('usuarioConsumidor')
      .doc(idUsuarioConsumidor)
      .update({ greedyPoints: increment2 });
    firestore
      .collection('usuarioComercio')
      .doc(idUsuarioComercio)
      .collection('reseñas')
      .doc()
      .set({
        utilizoBeneficio: value,
        coincideLoEsperado: value1,
        atencionVendedor: value2,
        comentario: text,
        fecha: Date(),
      });
    const bd = secondaryApp.firestore();
    bd.collection('usuarioComercio')
      .doc(idUsuarioComercio)
      .collection('reseñas')
      .doc()
      .set({
        utilizoBeneficio: value,
        coincideLoEsperado: value1,
        atencionVendedor: value2,
        comentario: text,
        fecha: Date(),
      })
      .then(() => {
        dispatch({ type: 'ENCUESTA_GREEDY_POINTS' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_ENCUESTA', error });
      });
  };
};

export const agregarTokenAComercio = (idComercio, pushToken) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const firestore = getFirestore();
    firestore
      .collection('usuarioComercio')
      .doc(idComercio)
      .get()
      .then((doc) => {
        let todosTokens = doc.data().tokensFavoritos;
        todosTokens.push(pushToken);
        return todosTokens;
      })
      .then((todosTokens) => {
        firestore.collection('usuarioComercio').doc(idComercio).update({
          tokensFavoritos: todosTokens,
        });
        const bd = secondaryApp.firestore();
        bd.collection('usuarioComercio')
          .doc(idComercio)
          .update({
            tokensFavoritos: todosTokens,
          })
          .then(() => {
            dispatch({ type: 'CAMBIAR_TOKENFAVORITO' });
          })
          .catch((error) => {
            dispatch({ type: 'ERROR_TOKENFAVORITO', error });
          });
      });
  };
};

export const eliminarTokenAComercio = (idComercio, pushToken) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const firestore = getFirestore();
    firestore
      .collection('usuarioComercio')
      .doc(idComercio)
      .get()
      .then((doc) => {
        let todosTokens = doc.data().tokensFavoritos;
        const indice = _.findIndex(todosTokens, function (o) {
          return o === pushToken;
        });
        todosTokens.splice(indice, 1);
        return todosTokens;
      })
      .then((todosTokens) => {
        firestore.collection('usuarioComercio').doc(idComercio).update({
          tokensFavoritos: todosTokens,
        });
        const bd = secondaryApp.firestore();
        bd.collection('usuarioComercio')
          .doc(idComercio)
          .update({
            tokensFavoritos: todosTokens,
          })
          .then(() => {
            dispatch({ type: 'ELIMINAR_TOKENFAVORITO' });
          })
          .catch((error) => {
            dispatch({ type: 'ERROR_ELIMINARTOKENFAVORITO', error });
          });
      });
  };
};

export const agregarEstadisticaFavorito = (idComercio, idConsumidor) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const firestore = getFirestore();
    firestore
      .collection('usuarioComercio')
      .doc(idComercio)
      .get()
      .then((doc) => {
        let todosEstadisticaFavorito = doc.data().estadisticasFavoritos;
        todosEstadisticaFavorito.push({
          idConsumidor: idConsumidor,
          fecha: Date(),
        });
        return todosEstadisticaFavorito;
      })
      .then((todosEstadisticaFavorito) => {
        firestore.collection('usuarioComercio').doc(idComercio).update({
          estadisticasFavoritos: todosEstadisticaFavorito,
        });
        const bd = secondaryApp.firestore();
        bd.collection('usuarioComercio')
          .doc(idComercio)
          .update({
            estadisticasFavoritos: todosEstadisticaFavorito,
          })
          .then(() => {
            dispatch({ type: 'CAMBIAR_ESTADISTICAFAVORITO' });
          })
          .catch((error) => {
            dispatch({ type: 'ERROR_ESTADISTICAFAVORITO', error });
          });
      });
  };
};

export const eliminarEstadisticaFavorito = (idComercio, idConsumidor) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const firestore = getFirestore();
    firestore
      .collection('usuarioComercio')
      .doc(idComercio)
      .get()
      .then((doc) => {
        let todosEstadisticaFavorito = doc.data().estadisticasFavoritos;
        const indice = _.findIndex(todosEstadisticaFavorito, function (o) {
          return o.idConsumidor === idConsumidor;
        });
        todosEstadisticaFavorito.splice(indice, 1);
        return todosEstadisticaFavorito;
      })
      .then((todosEstadisticaFavorito) => {
        firestore.collection('usuarioComercio').doc(idComercio).update({
          estadisticasFavoritos: todosEstadisticaFavorito,
        });
        const bd = secondaryApp.firestore();
        bd.collection('usuarioComercio')
          .doc(idComercio)
          .update({
            estadisticasFavoritos: todosEstadisticaFavorito,
          })
          .then(() => {
            dispatch({ type: 'ELIMINAR_ESTADISTICAFAVORITO' });
          })
          .catch((error) => {
            dispatch({ type: 'ERROR_ELIMINARESTADISTICAFAVORITO', error });
          });
      });
  };
};
