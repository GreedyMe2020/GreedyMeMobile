import _ from 'lodash';
export const signUp = (nuevoUsuario) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        nuevoUsuario.email,
        nuevoUsuario.contraseña,
      )
      .then((resp) => {
        return firestore
          .collection('usuarioConsumidor')
          .doc(resp.user.uid)
          .set({
            email: nuevoUsuario.email,
            nombre: nuevoUsuario.nombre,
            apellido: nuevoUsuario.apellido,
            notificacionesFavoritas: false,
            notificacionesUbicacion: false,
            notificacionesTodas: true,
            proveedoresAsociados: [],
            favorito: [],
            greedyPoints: 0,
            pushToken: null,
          });
      })
      .then(() => {
        firebase.auth().currentUser.sendEmailVerification();
      })
      .then(() => {
        dispatch({ type: 'USUARIO_CREADO' });
      })
      .catch((error) => {
        dispatch({ type: 'FALLO_CREACION', error });
      });
  };
};

export const signIn = (usuario) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(usuario.email, usuario.contraseña)
      .then(() => {
        dispatch({ type: 'INICIO_CORRECTO' });
      })
      .catch((error) => {
        dispatch({ type: 'INICIO_FALLIDO', error });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: 'SESION_CERRADA' });
      });
  };
};

export const signInGoogle = (credential) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        if (result.additionalUserInfo.isNewUser) {
          const firestore = firebase.firestore();
          firestore
            .collection('usuarioConsumidor')
            .doc(result.user.uid)
            .set({
              email: result.user.email,
              nombre: result.additionalUserInfo.profile.given_name,
              apellido: result.additionalUserInfo.profile.family_name,
              notificacionesFavoritas: false,
              notificacionesUbicacion: false,
              notificacionesTodas: true,
              proveedoresAsociados: [],
              favorito: [],
              greedyPoints: 0,
              pushToken: null,
            })
            .then(() => {
              dispatch({ type: 'USUARIO_CREADO' });
            })
            .catch((error) => {
              dispatch({ type: 'FALLO_CREACION', error });
            });
        } else {
          dispatch({ type: 'INICIO_CORRECTO' });
        }
      })
      .catch((error) => {
        dispatch({ type: 'INICIO_FALLIDO', error });
        // ...
      });
  };
};

export const signInFacebook = (credential) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        if (result.additionalUserInfo.isNewUser) {
          const firestore = firebase.firestore();
          firestore
            .collection('usuarioConsumidor')
            .doc(result.user.uid)
            .set({
              email: result.user.email,
              nombre: result.user.displayName,
              apellido: '',
              notificacionesFavoritas: false,
              notificacionesUbicacion: false,
              notificacionesTodas: true,
              proveedoresAsociados: [],
              favorito: [],
              greedyPoints: 0,
              pushToken: null,
            })
            .then(() => {
              dispatch({ type: 'USUARIO_CREADO' });
            })
            .catch((error) => {
              dispatch({ type: 'FALLO_CREACION', error });
            });
        } else {
          dispatch({ type: 'INICIO_CORRECTO' });
        }
      })
      .catch((error) => {
        dispatch({ type: 'INICIO_FALLIDO', error });
      });
  };
};

export const forgotPass = (email) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const mail = email;
    const usuarios = [];
    firestore
      .collection('usuarioConsumidor')
      .get()
      .then((snapShots) => {
        snapShots.forEach((doc) => {
          const data = doc.data();
          usuarios.push({
            ...data,
            id: doc.id,
          });
        });
      })
      .then(() => {
        const indiceACambiar = _.findIndex(usuarios, function (o) {
          return o.email.toLowerCase() === mail.toLowerCase();
        });
        const id = usuarios[indiceACambiar].id;
        firestore.collection('olvidoContra').doc().set({
          email: email,
          identificacion: id,
        });
      })
      .then(() => {
        dispatch({ type: 'CONTRASEÑA_REESTABLECIDA' });
      })
      .catch((error) => {
        dispatch({ type: 'EMAIL_INVALIDO', error });
      });
  };
};

export const setearLogeo = (flag) => {
  return (dispatch, getState, { getFirestore }) => {
    if (flag === 'True') {
      dispatch({ type: 'SETEAR_LOGEO_TRUE' });
    } else {
      dispatch({ type: 'SETEAR_LOGEO_FALSE' });
    }
  };
};

export const setearDesLogeo = (flag) => {
  return (dispatch, getState, { getFirestore }) => {
    if (flag === 'True') {
      dispatch({ type: 'SETEAR_DESLOGEO_TRUE' });
    } else {
      dispatch({ type: 'SETEAR_DESLOGEO_FALSE' });
    }
  };
};

export const resetearValores = () => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: 'RESETEAR_VALORES' });
  };
};

export const resetearValoresCreacionUsuario = () => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: 'RESETEAR_VALORES_CREACION_USUARIO' });
  };
};

export const resetearValoresInicioSesion = () => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: 'RESETEAR_VALORES_INICIO_SESION' });
  };
};

export const setearValidacionMail = () => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: 'INICIO_FALLIDO' });
  };
};

export const setNuevoUsuario = (flag) => {
  return (dispatch, getState, { getFirestore }) => {
    if (flag === 'True') {
      dispatch({ type: 'NUEVO_USUARIO_TRUE' });
    } else {
      dispatch({ type: 'NUEVO_USUARIO_FALSE' });
    }
  };
};
