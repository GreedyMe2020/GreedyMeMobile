import * as React from 'react';
import { Button } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { signIn } from '../../../redux/actions/auth-actions';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';
//import { StatusBar } from 'expo-status-bar';

var credential = { appId: '3359296714151798', appName: 'greedy-me' };

function IniciarSesionConRedes(props) {
  const [user, setUser] = React.useState(null);
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

      if (result.type === 'success') {
        this.onSignIn(result);
        setUser(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };
  //VALIDACION DE USUARIO UNA VEZ REGISTRADO
  const onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
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
                  .then(function (snapshot) {
                    //console.log()
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
      }.bind(this),
    );
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
  };

  //FUNCION DE LOGIN CON FACEBOOK
  const signUpFacebook = async () => {
    try {
      await Facebook.initializeAsync(credential);
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`,
        );
        const credentialFireBase = firebase.auth.FacebookAuthProvider.credential(
          token,
        );
        firebase
          .auth()
          .signInWithCredential(credentialFireBase)
          .catch((error) => {
            console.log(error);
          });
        // console.log((await response.json()).name);
        const data = await response.json();
        setUser(data);
      } else {
        type === 'cancel';
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch(signIn(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IniciarSesionConRedes);
