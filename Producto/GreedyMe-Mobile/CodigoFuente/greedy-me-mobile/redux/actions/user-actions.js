export const editarDatos = (datos) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const firestore = getFirestore();
    firestore
      .collection('usuarioConsumidor')
      .doc(datos.id)
      .update({
        nombre: datos.nombre,
        apellido: datos.apellido,
      })
      .then(() => {
        dispatch({ type: 'EDITAR_DATOS' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_DATOS', error });
      });
  };
};

export const cambiarContraseña = (datos) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    //codigo asincrono
    const firebase = getFirebase();
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var credentials = firebase.auth.EmailAuthProvider.credential(
          user.email,
          datos.password,
        );
        user
          .reauthenticateWithCredential(credentials)
          .then(() => {
            user.updatePassword(datos.passwordNueva);
          })
          .then(() => {
            dispatch({ type: 'CAMBIAR_CONTRASEÑA' });
          })
          .catch((error) => {
            dispatch({ type: 'ERROR_CONTRASEÑA', error });
          });
      }
    });
  };
};

export const editarProveedores = (datos, id) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const firestore = getFirestore();
    firestore
      .collection('usuarioConsumidor')
      .doc(id)
      .update({
        proveedoresAsociados: datos,
      })
      .then(() => {
        dispatch({ type: 'EDITAR_PROVEEDOR' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_PROVEEDOR', error });
      });
  };
};

export const editarNotificacionesFavoritas = (datos, id) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const firestore = getFirestore();
    firestore
      .collection('usuarioConsumidor')
      .doc(id)
      .update({
        notificacionesFavoritas: datos,
      })
      .then(() => {
        dispatch({ type: 'EDITAR_NOTIFICACIONES' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_NOTIFICACIONES', error });
      });
  };
};

export const editarNotificacionesUbicacion = (datos, id) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const firestore = getFirestore();
    firestore
      .collection('usuarioConsumidor')
      .doc(id)
      .update({
        notificacionesUbicacion: datos,
      })
      .then(() => {
        dispatch({ type: 'EDITAR_NOTIFICACIONES' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_NOTIFICACIONES', error });
      });
  };
};

export const editarNotificacionesTodas = (datos, id) => {
  return (dispatch, getState, { getFirestore }) => {
    //codigo asincrono
    const firestore = getFirestore();
    firestore
      .collection('usuarioConsumidor')
      .doc(id)
      .update({
        notificacionesTodas: datos,
      })
      .then(() => {
        dispatch({ type: 'EDITAR_NOTIFICACIONES' });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR_NOTIFICACIONES', error });
      });
  };
};
