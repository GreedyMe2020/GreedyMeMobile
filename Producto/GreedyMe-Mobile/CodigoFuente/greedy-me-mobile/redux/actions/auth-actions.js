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
          });
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

export const forgotPass = (usuario) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .sendPasswordResetEmail(usuario.email)
      .then(() => {
        dispatch({ type: 'CONTRASEÑA_REESTABLECIDA' });
      })
      .catch((error) => {
        dispatch({ type: 'EMAIL_INVALIDO', error });
      });
  };
};
