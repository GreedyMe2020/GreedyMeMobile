import * as React from 'react';
import { Button } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';
import {
  signInFacebook,
  signInGoogle,
  setearLogeo,
} from '../../../redux/actions/auth-actions';
//import { StatusBar } from 'expo-status-bar';

function IniciarSesionConRedes(props) {
  //FUNCION DE LOGIN CON GOOGLE

  const signUpGoogle = async () => {
    props.setearLogeo('True');
    try {
      const result = await Google.logInAsync({
        androidClientId:
          '652418121698-s374jiri9k6f52ditbmatpmavs8nt2pr.apps.googleusercontent.com',
        iosClientId:
          '652418121698-idd1gmmbtp3bnuu8n65h6idp1oe7ncgd.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        onSignIn(result);
        return result.accessToken;
      } else {
        console.log('error');
        props.setearLogeo('False');
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  //VALIDACION DE USUARIO UNA VEZ REGISTRADO
  const onSignIn = (googleUser) => {
    // Check if we are already signed-in Firebase with the correct user.
    // Build Firebase credential with the Google ID token.
    var credential = firebase.auth.GoogleAuthProvider.credential(
      googleUser.idToken,
      googleUser.accessToken,
    );
    props.signInGoogle(credential);
    /*firebase
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
            })
            .then(function (snapshot) {});
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
      });*/
  };

  //FUNCION DE LOGIN CON FACEBOOK

  var credentialFacebook = { appId: '3359296714151798', appName: 'greedy-me' };

  const signUpFacebook = async () => {
    props.setearLogeo('True');
    try {
      await Facebook.initializeAsync(credentialFacebook);
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });

      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        props.signInFacebook(credential);
        /*firebase
          .auth()
          .signInWithCredential(credential)
          .then((result) => {
            console.log(result);
            if (result.additionalUserInfo.isNewUser) {
              const firestore = firebase.firestore();
              firestore
                .collection('usuarioConsumidor')
                .doc(result.user.uid)
                .set({
                  email: result.user.email,
                  nombre: result.user.displayName,
                  apellido: result.user.displayName,
                  notificacionesFavoritas: false,
                  notificacionesUbicacion: false,
                  notificacionesTodas: true,
                  proveedoresAsociados: [],
                });
            }
          });*/
        /*
            const firestore = firebase.firestore();
            firestore.collection('usuarioConsumidor').doc(resp.user.uid).set({
              email: data.email,
              nombre: data.name,
              //apellido: result.additionalUserInfo.profile.family_name,
              notificacionesFavoritas: false,
              notificacionesUbicacion: false,
              notificacionesTodas: true,
              proveedoresAsociados: [],
            });
          })
          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
          });
        /*const data = await response.json(); //TRAE LOS DATOS DE LA API: ID, NOMBRE Y EMAIL
        //setUser(data);
        firebase.database().collection('usuarioConsumidor').doc(data.id).set({
          email: data.email,
          nombre: data.name,
          last_logged_in: Date.now(),
        });*/
        //props.signInFacebook(data);
      } else {
        type === 'cancel';
        props.setearLogeo('False');
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <View style={styles.cont}>
      <Button
        icon={({ padding }) => (
          <Image
            source={require('../../multimedia/gmail.png')}
            style={{ width: 20, height: 20, marginEnd: 3, marginLeft: -3 }}
          />
        )}
        theme={{
          colors: { primary: '#e1e1e1' }, ///1E1B4D
        }}
        style={styles.btnRedesSociales1}
        mode="contained"
        title="Submit"
        onPress={signUpGoogle}
      >
        Iniciar sesión con Google
      </Button>
      <Button
        icon={({ padding }) => (
          <Image
            source={require('../../multimedia/facebook.png')}
            style={{ width: 20, height: 20, marginLeft: 7 }}
          />
        )}
        theme={{
          colors: { primary: '#e1e1e1' }, ///1E1B4D
        }}
        style={styles.btnRedesSociales}
        mode="contained"
        title="Submit"
        onPress={signUpFacebook}
      >
        Iniciar sesión con Facebook
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    justifyContent: 'space-between',
    flex: 0.7,
  },
  btnRedesSociales1: {
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 70,
  },
  btnRedesSociales: {
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 70,
  },
  iconRedes: {
    width: 20,
    height: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    //token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //signInWithCredential: (user) => dispatch(signInWithCredential(user)),
    signInFacebook: (user) => dispatch(signInFacebook(user)),
    signInGoogle: (user) => dispatch(signInGoogle(user)),
    setearLogeo: (flag) => dispatch(setearLogeo(flag)),
    //saveToken: (token) => dispatch(saveToken(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IniciarSesionConRedes);
