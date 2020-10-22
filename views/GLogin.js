import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import * as firebase from "firebase";
import * as  AppAuth  from 'expo-app-auth';
import * as Constants from 'expo-constants';
import * as  GoogleSignIn  from 'expo-google-sign-in';
import GoogleSignInButton from './GoogleSignInButton';

const { OAuthRedirect, URLSchemes } = AppAuth;

const isInClient = Constants.appOwnership === 'expo';
if (isInClient) {
  GoogleSignIn.allowInClient();
}

const webClientId =
  '98141338607-n26pq4qoa860dijhbdvoh9hgcteo1if4.apps.googleusercontent.com';
  
const clientStandAloneID = Platform.select({
  android:
    '98141338607-v51deoh7rrspktp5pabcfduees498eba.apps.googleusercontent.com',
});

const clientId = isInClient
  ? webClientId
  : clientStandAloneID;



export default class App extends React.Component {
  state = { user: null };

  async componentDidMount() {
    try {
      await GoogleSignIn.initAsync({
        isOfflineEnabled: true,
        isPromptEnabled: true,
        webClientId,
      });
      this._syncUserWithStateAsync();
    } catch ({ message }) {
      alert('GoogleSignIn.initAsync(): ' + message);
    }
  }

  _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    console.log('_syncUserWithStateAsync', { user });
    this.setState({ user });
  };

  signOutAsync = async () => {
    try {
      await GoogleSignIn.signOutAsync();
      this.setState({ user: null });
    } catch ({ message }) {
      alert('signOutAsync: ' + message);
    }
  };

  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        this._syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

  _syncUserWithStateAsync = async () => {
    /*
      const user = await GoogleSignIn.signInSilentlyAsync();
      this.setState({ user });
    */

    const data = await GoogleSignIn.signInSilentlyAsync();
    console.log({ data });
    if (data) {
      const photoURL = await GoogleSignIn.getPhotoAsync(256);
      const user = await GoogleSignIn.getCurrentUserAsync();
      this.setState({
        user: {
          ...user.toJSON(),
          photoURL: photoURL || user.photoURL,
        },
      });
    } else {
      this.setState({ user: null });
    }
  };

  get buttonTitle() {
    return this.state.user ? 'Sign-Out of Google' : 'Sign-In with Google';
  }


   onSignIn  = googleUser =>{
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken);
        // Sign in with credential from the Google user.
        firebase
        .auth()
        .signInWithCredential(credential).then(function(){
          console.log('user sign in');
        })
        .catch(function(error) {
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
    }.bind(this));
  }

   isUserEqual =( googleUser, firebaseUser) =>{
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  
  render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <GoogleSignInButton onPress={this._toggleAuth}>
          {this.buttonTitle}
        </GoogleSignInButton>
      </View>
    );
  }


_toggleAuth = () => {
  console.log('Toggle', !!this.state.user);
  if (this.state.user) {
    this._signOutAsync();
  } else {
    this._signInAsync();
  }
};

_signOutAsync = async () => {
  try {
    // await GoogleSignIn.disconnectAsync();
    await GoogleSignIn.signOutAsync();
    console.log('Log out successful');
  } catch ({ message }) {
    console.error('Demo: Error: logout: ' + message);
  } finally {
    this.setState({ user: null });
  }
};

_signInAsync = async () => {
  try {
    await GoogleSignIn.askForPlayServicesAsync();
    const { type, user } = await GoogleSignIn.signInAsync();
    console.log({ type, user });
    if (type === 'success') {
      this.onSignIn(type);
      this._syncUserWithStateAsync();
    }
  } catch ({ message }) {
    console.error('login: Error:' + message);
  }
};
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  image: { width: 128, borderRadius: 64, aspectRatio: 1 },
  text: { color: 'black', fontSize: 16, fontWeight: '600' },
});