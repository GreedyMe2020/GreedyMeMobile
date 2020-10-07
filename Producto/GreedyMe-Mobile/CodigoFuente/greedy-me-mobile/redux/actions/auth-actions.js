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
          return o.email === mail;
        });
        const id = usuarios[indiceACambiar].id;
        firestore.collection('olvidoContra').doc().set({
          email: email,
          id: id,
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

/*const firebase = getFirebase();
    firebase
      .auth()
      .sendPasswordResetEmail(email)*/

export const saveToken = (token) => {
  return {
    type: 'SET_TOKEN',
    token: token,
  };
};

export const clearToken = () => {
  return {
    type: 'CLEAR_TOKEN',
  };
};

/*export const setUser = (user) => {
  return {
    type: 'LOGGED_IN',
    user: user,
  };
};

export const clearUser = () => {
  return {
    type: 'SIGN_OUT',
  };
};*/
