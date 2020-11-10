import _ from 'lodash';
/*export const agregarComercioFavorito = (comercio, id) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const firestore = getFirestore();
    firestore
      .collection('usuarioConsumidor')
      .doc(id)
      .collection('favoritos')
      .doc(comercio.id)
      .set({
        web: comercio.web,
        sucursal: comercio.sucursal,
        nombreComercio: comercio.nombreComercio,
        photoURL: comercio.photoURL,
        rubro: comercio.rubro,
        telefono: comercio.telefono,
        instagram: comercio.instagram,
        facebook: comercio.facebook,
        direccion: comercio.direccion,
        favorito: 1,
      })
      .then(() => {
        dispatch({ type: 'COMERCIO_FAVORITO_AGREGADO' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_FAVORITOS', error });
      });
  };
};

export const sacarComercioFavorito = (comercio, id) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const firestore = getFirestore();
    firestore
      .collection('usuarioConsumidor')
      .doc(id)
      .collection('favoritos')
      .doc(comercio.id)
      .delete()
      .then(() => {
        dispatch({ type: 'COMERCIO_FAVORITO_ELIMINADO' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_FAVORITOS', error });
      });
  };
};*/

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

export const setearFavorito = () => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: 'SETEAR_FAVORITO' });
  };
};
