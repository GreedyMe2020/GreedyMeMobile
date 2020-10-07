import * as React from 'react';
import { Button } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import {
  signInGoogle,
  signInFacebook,
  saveToken,
  setUser,
} from '../../../redux/actions/auth-actions';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

//import { StatusBar } from 'expo-status-bar';

function IniciarSesionConRedes(props) {
  //FUNCION DE LOGIN CON GOOGLE

  const signUpGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          '652418121698-s374jiri9k6f52ditbmatpmavs8nt2pr.apps.googleusercontent.com',
        iosClientId:
          '652418121698-idd1gmmbtp3bnuu8n65h6idp1oe7ncgd.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      //ACA YA SE REGISTRA
      if (result.type === 'success') {
        var credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken,
          result.accessToken,
        );
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((resp) => {
            console.log('sadas');
            /*const firestore = firebase.firestore();
            firestore.collection('usuarioConsumidor').doc(resp.user.uid).set({
              email: result.user.email,
              nombre: result.additionalUserInfo.profile.given_name,
              apellido: result.additionalUserInfo.profile.family_name,
              notificacionesFavoritas: false,
              notificacionesUbicacion: false,
              notificacionesTodas: true,
              proveedoresAsociados: [],
            });*/
          })
          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
        return result;
      } else {
        console.log('error');
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  //VALIDACION DE USUARIO UNA VEZ REGISTRADO
  /*const onSignIn = (googleUser) => {
    var unsubscribe = firebase
      .auth()
      .onAuthStateChanged(function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.id_token,
            googleUser.accessToken,
          );
          console.log(googleUser);
          //props.saveToken(credential.accessToken);
          // Sign in with credential from the Google user.
          //props.signInGoogle(credential);
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(() => {
              console.log('user signed in');})
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
          }
              /*if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .collection('usuarioConsumidor') //ESTO AGREGUÉ YO PERO NO SE SI ESTÁ BIEN.
                  .doc(result.user.uid)
                  .set({
                    email: result.user.email,
                    nombre: result.additionalUserInfo.profile.given_name,
                    apellido: result.additionalUserInfo.profile.family_name,
                    last_logged_in: Date.now(),
                  })
                  .then((snapshot) => {
                    //console.log() no hace nada aca.
                  });
              } else {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .update({
                    last_logged_in: Date.now(),
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
      });
  };
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
  };*/

  //FUNCION DE LOGIN CON FACEBOOK

  var credentialFacebook = { appId: '3359296714151798', appName: 'greedy-me' };

  const signUpFacebook = async () => {
    try {
      await Facebook.initializeAsync(credentialFacebook);
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        /*const response = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`, //SOLICITA A LA API EL ID, NOMBRE Y MAIL
        );*/
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        //const data = await response.json();
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((resp) => {
            console.log('asdsa');
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
            });*/
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
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  if (props.auth.uid) {
    props.navigation.navigate('Main');
  }

  return (
    <View>
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
        style={styles.btnRedesSociales}
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
  btnRedesSociales: {
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
    //signInFacebook: (user) => dispatch(signInFacebook(user)),
    //signInGoogle: (user) => dispatch(signInGoogle(user)),
    //saveToken: (token) => dispatch(saveToken(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IniciarSesionConRedes);
