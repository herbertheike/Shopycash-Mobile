import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import "firebase/firestore";
import firebase from "firebase";
import * as Facebook from "expo-facebook";
import * as GoogleSignIn from "expo-google-sign-in";
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Login extends React.Component {
  state = { email: "", password: "", errorMessage: "", loading: false };
  onLoginSuccess() {
    this.props.navigation.navigate("CadMap");
  }
  onLoginFailure(errorMessage) {
    this.setState({ error: errorMessage, loading: false });
  }
  renderLoading() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size={"large"} />
        </View>
      );
    }
  }

  //Login Email e senha
  async signInWithEmail() {
    await firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
          user = firebase.auth().currentUser;
          if(!user){
            this.onLoginFailure.bind(this)("Usuario inexistente");
          }else{
          firebase
            .database()
            .ref("/user/" + user.uid)
            .update({
              lastLogIn: Date.now(),
            });

            this.onLoginSuccess()
        }
        
      }
      )
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == "auth/weak-password") {
          this.onLoginFailure.bind(this)("Senha Fraca!");
        } else {
          this.onLoginFailure.bind(this)(errorMessage);
        }
      });
  }

  //Login Facebook
  async signInWithFacebook() {
    try {
      await Facebook.initializeAsync("445672353479326");
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const facebookProfileData = await firebase
          .auth()
          .signInWithCredential(credential);
        if (facebookProfileData.additionalUserInfo.isNewUser) {
          await firebase
            .database()
            .ref("/user/" + facebookProfileData.user.uid)
            .set({
              loginType: "Facebook",
              email: facebookProfileData.user.email,
              photoURL: facebookProfileData.additionalUserInfo.profile.picture,
              nickName: facebookProfileData.additionalUserInfo.profile.first_name,
              displayName: facebookProfileData.user.displayName,
              firstName:
                facebookProfileData.additionalUserInfo.profile.first_name,
              lastname:
                facebookProfileData.additionalUserInfo.profile.last_name,
              createAt: Date.now(),
            });
        } else {
          firebase
            .database()
            .ref("/user/" + facebookProfileData.user.uid)
            .update({
              lastLogIn: Date.now(),
            });
        }
        this.onLoginSuccess();
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  //Login Google
  async signInWithGoogle() {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      const data = await GoogleSignIn.GoogleAuthentication.prototype.toJSON();
      if (type === "success") {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.GoogleAuthProvider.credential(
          user.auth.idToken,
          user.auth.accessToken
        );
        const googleProfileData = await firebase
          .auth()
          .signInWithCredential(credential);
        if (googleProfileData.additionalUserInfo.isNewUser) {
          await firebase
            .database()
            .ref("/user/" + googleProfileData.user.uid)
            .set({
              loginType: "Google",
              email: googleProfileData.user.email,
              photoURL: googleProfileData.additionalUserInfo.profile.picture,
              nickName: googleProfileData.additionalUserInfo.profile.given_name,
              displayName: googleProfileData.user.displayName,
              firstName:
                googleProfileData.additionalUserInfo.profile.given_name,
              lastName:
                googleProfileData.additionalUserInfo.profile.family_name,
              createAt: Date.now(),
            });
        } else {
          firebase
            .database()
            .ref("/user/" + googleProfileData.user.uid)
            .update({
              lastLogIn: Date.now(),
            });
        }
        this.onLoginSuccess();
      }
    } catch ({ message }) {
      alert("login: Error:" + message);
    }
  }
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView style={styles.container}>
            <Text style={{ fontSize: 32, fontWeight: "bold", color: "black" }}>
              ShopyCash
            </Text>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#B1B1B1"
                returnKeyType="next"
                keyboardType="email-address"
                textContentType="emailAddress"
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
              />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#B1B1B1"
                returnKeyType="done"
                textContentType="newPassword"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
              />
            </View>
            {this.renderLoading()}
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                color: "red",
                width: "80%",
              }}
            >
              {this.state.error}
            </Text>
            <TouchableOpacity
              style={{
                width: "50%",
                margin: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:'#5eaaa8',
                padding: 10,
                borderRadius:50
              }}
              onPress={() => this.signInWithEmail()}
            >
              <Text style={{color:'#ffffff'}}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: "86%", marginTop: 10 }}
              onPress={() => this.signInWithFacebook()}
            >
              <View style={styles.button}>
              <Icon name="facebook-f" size={18} color="#ffffff" />
                <Text
                  style={{
                    letterSpacing: 0.5,
                    fontSize: 16,
                    color: "#FFFFFF",
                  }}
                >
                  Entrar com o Facebook
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: "86%", marginTop: 10 }}
              onPress={() => this.signInWithGoogle()}
            >
              <View style={styles.googleButton}>
              <Icon name="google" size={18} color="#000000" />
                <Text
                  style={{
                    letterSpacing: 0.5,
                    fontSize: 16,
                    color: "#707070",
                  }}
                >
                  Entrar com o Google
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{ fontWeight: "200", fontSize: 17, textAlign: "center" }}
                onPress={() => {
                  this.props.navigation.navigate("Cadastro");
                }}
              >
                Não tem uma conta? Cadastre-se!
              </Text>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "50%",
  },
  form: {
    width: "86%",
    marginTop: 15,
  },
  logo: {
    marginTop: 20,
  },
  input: {
    fontSize: 20,
    borderColor: "#707070",
    borderBottomWidth: 1,
    paddingBottom: 1.5,
    marginTop: 25.5,
  },
  button: {
    backgroundColor: "#3A559F",
    height: 44,
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: "center",
    padding: 10,
    borderRadius: 22,
  },
  googleButton: {
    backgroundColor: "#FFFFFF",
    height: 44,
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: "center",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#707070",
  }
});
export default Login;
