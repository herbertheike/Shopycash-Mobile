import React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  PermissionsAndroid
} from "react-native";
import {
  TextInput,
} from "react-native-paper";
import "firebase/firestore";
import firebase from "firebase";
import * as Facebook from "expo-facebook";
import * as GoogleSignIn from "expo-google-sign-in";
import Icon from "react-native-vector-icons/FontAwesome5";
//import PasswordInputText from 'react-native-hide-show-password-input';
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";


class Cadastro extends React.Component {
  state = {
    displayName: "",
    email: "",
    telefone: "",
    password: "",
    errorMessage: "",
    errorMsg: null,

    addressPostalCode: "",
    loading: false,
  };

  componentDidMount = async () =>{
    
    let status = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          this.setState({errorMsg:"Permission to access location was denied"});
        }
       let apikey = await Location.setApiKey("AIzaSyCI_8KYJblO2KFRY6vuwy3qa3rmLcnMhPQ");
    this.Locale();
   // this.onLoginSuccess = this.onLoginSuccess.bind(this);
 //   this.onLoginFailure = this.onLoginFailure.bind(this);
  }

  onLoginSuccess = ()=> {
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
  signInWithEmail = async()=> {
 
    await firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user)=> {
          user = firebase.auth().currentUser;
          if(!user){
            this.onLoginFailure.bind(this)(errorMessage);
          }else{
          firebase
            .database()
            .ref("/user/" + user.uid)
            .set({
              loginType: "Email/Senha",
              nickName:this.state.displayName,
              displayName:this.state.displayName,
              email: user.email,
              createAt: Date.now(),
            });
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
      this.onLoginSuccess();
      //this.props.navigation.navigate("CadMap");
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
      alert(`Erro ao logar com o facebook: ${message}`);
    }
  }

  //Login Google
  async signInWithGoogle() {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
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


  Locale = async () => {
    var location = null;
    var errorMsg = null;
    var address = null;
    var longitude = null;
    var latitude = null;
    var addressinfo = null;
        
        let nlocation = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
        location = (nlocation);
       //console.log("Location", location)
        let naddress = await Location.reverseGeocodeAsync({
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
          useGoogleMaps  :true});
        address = naddress;
  
    if (errorMsg) {
      longitude = this.state.errorMsg; 
      latitude = errorMsg;
      addressinfo = errorMsg;
    } else if (address) {
      longitude = JSON.stringify(location.coords.longitude);
      latitude = JSON.stringify(location.coords.latitude);
  
      address.find((ad) => {
      this.state.addressStreet = ad.street;
        this.state.addressNumber = ad.name;
        this.state.addressStreet = ad.street;
        this.state.addressStreet = ad.street;
        this.state.addressStreet = ad.street;
        this.state.addressStreet = ad.street;
        this.state.addressStreet = ad.street;
       // console.log(ad)
        
      });
    }
    //console.log("Address:\n", address)
  }

  render() {
    const temaInput = {
      colors: { text: "black", placeholder: "#5eaaa8", primary: "#5eaaa8" },
    };
    return (
          <KeyboardAvoidingView style={styles.container}>
            <Text style={{ fontSize: 28, fontWeight: "bold", color: "black" }}>
              ShopyCash
            </Text>
            <ScrollView style={styles.scrollcontainer}>
            <View style={styles.form}>
              <TextInput
              mode={"outlined"}
              underlineColor={"#5eaaa8"}
              selectionColor={"#5eaaa8"}
              theme={temaInput}
                style={styles.input}
                placeholder="Nome"
                placeholderTextColor="#B1B1B1"
                returnKeyType="next"
                textContentType="name"
                value={this.state.displayName}
                onChangeText={displayName => this.setState({ displayName:displayName})}
              />
              <TextInput
              mode={"outlined"}
              underlineColor={"#5eaaa8"}
              selectionColor={"#5eaaa8"}
              theme={temaInput}
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#B1B1B1"
                returnKeyType="next"
                keyboardType="email-address"
                textContentType="emailAddress"
                value={this.state.email}
                onChangeText={email => this.setState({ email:email })}
              />
              <TextInput
              mode={"outlined"}
              underlineColor={"#5eaaa8"}
              selectionColor={"#5eaaa8"}
              theme={temaInput}
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#B1B1B1"
                returnKeyType="done"
                textContentType="newPassword"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={password => this.setState({ password:password })}
              />
            </View>
            <View style={{alignItems: "center", justifyContent: "center"}}>
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
              <Text style={{color:'#ffffff'}}>Cadastrar</Text>
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
                    fontSize: 18,
                    color: "#FFFFFF",
                  }}
                >
                  Continuar com Facebook
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
                    fontSize: 18,
                    color: "#707070",
                  }}
                >
                 Continuar com Google
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{ fontWeight: "200", fontSize: 17, textAlign: "center" }}
                onPress={() => {
                  this.props.navigation.navigate("Login");
                }}
              >
                Já tem uma conta?
              </Text>
              </View>
            </View>
            </ScrollView>
          </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "15%",
  },
  scrollcontainer: {
    width: "100%",
    flexDirection: "column",
    
    padding: "5%",
    
  },
  form: {
    marginTop: 5,
    justifyContent:'center'
  },
  logo: {
    marginTop: 20,
  },
  input: {
    fontSize: 16,
    borderColor: "#707070",
    paddingBottom: 5,
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
  },
});

export default Cadastro;
