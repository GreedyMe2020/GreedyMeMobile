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

export const signInWithCredential = (usuario) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithCredential(usuario.credential)
      .then(() => {
        dispatch({ type: 'INICIO_CORRECTO' });
      })
      .catch((error) => {
        dispatch({ type: 'INICIO_FALLIDO', error });
      });
  };
};

/*export const onSignIn = (googleUser) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const isUserEqual = (googleUser, firebaseUser) => {
      if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
          if (
            providerData[i].providerId ===
              firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()
          ) {
            // We don't need to reauth the Firebase connection.
            return true;
          }
        }
      }
      return false;
    };
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.getAuthResponse().id_token,
            googleUser.getAuthResponse().accessToken,
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function (result) {
              console.log('User signed in');
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    locale: result.additionalUserInfo.profile.locale,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    creatd_at: Date.now(),
                  })
                  .then(() => {
                    dispatch({ type: 'USUARIO_CREADO' });
                  })
                  .catch((error) => {
                    dispatch({ type: 'FALLO_CREACION', error });
                  });
              } else {
                firebase
                  .auth()
                  .ref('/users/' + result.user.uid)
                  .update({
                    last_logged_in: Date.now(),
                  })
                  .then(() => {
                    dispatch({ type: 'USUARIO_REGISTRADO' });
                  })
                  .catch((error) => {
                    dispatch({ type: 'FALLO_INICIO_SESION', error });
                  });
              }
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log('User already signed-in Firebase.');
        }
      }.bind(this),
    );
  };
};*/
