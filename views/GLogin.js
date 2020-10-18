import React from 'react';
import { Text,TouchableOpacity, StyleSheet, ScrollView, Button} from 'react-native';
import * as GoogleSignIn from 'expo-google-sign-in';
import { useNavigation } from '@react-navigation/native';



export default class GLogin extends React.Component {
  state = { user: null, isLoggedin:false, currentUser:null };
  

  componentDidMount() {
    this.initAsync();
  }

  initAsync = async () => {
    await GoogleSignIn.initAsync({
      // You may ommit the clientId when the firebase `googleServicesFile` is configured
      clientId: '<YOUR_IOS_CLIENT_ID>',
    });
    this._syncUserWithStateAsync();
  };

  _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    this.setState({ user, isLoggedin: true });
  };

  signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    this.setState({ user: null , isLoggedin: false});
  };

  getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    this.setState({ currentUser });
  };

  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      const {displayName, email, photoURL } = GoogleSignIn.getCurrentUser();
      const navigation = useNavigation();
      
      if (type === 'success') {
        this._syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('Login error:' + message);
    }
  };


  onPress = () => {
    if (this.state.user && this.state.isLoggedin == true) {
      this.signOutAsync();
      
      
    } else {
      this.signInAsync();
      
    }
  };
  f
  
  render() {
    return (
             <TouchableOpacity style={styles.section} onPress={this.onPress}>
            <Text >Entrar com o Google</Text>
            </TouchableOpacity>

            
            
    )        
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EBAD00',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 250,
      height: 100,
    },
    login: {
      backgroundColor: '#ffffff',
      width: '100%',
      borderRadius: 15,
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      marginBottom: -350,
      marginTop: 100
    },
    botao: {
      width: "100%",
      height:60,
      borderRadius: 15,
      backgroundColor: '#EBAD00',
      color: '#FFFFFF',
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10
    },
    botaofacebook: {
      width: "100%",
      height:60,
      borderRadius: 15,
      backgroundColor: '#3b589a',
      marginTop: 10,
      alignItems: 'center',
      padding: 20
    },
    botaogoogle: {
      width: "100%",
      height:60,
      borderRadius: 15,
      backgroundColor: '#508df8',
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10
    },
    botaosemlogin: {
      width: "100%",
      height:60,
      borderRadius: 15,
      backgroundColor: '#8bb8f9',
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10
    },
    logintext: {
      fontWeight: 'bold',
      fontSize: 18,
      position: 'relative',
      width: 350
    },
    logindesc: {
      width: 350,
      fontSize: 14,
      position: 'relative',
      color: '#999999'
    },
    botaotext: {
      fontWeight: 'bold',
      color: '#080833'
    },
    section: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderWidth: 0,
      borderColor: '#000',
      height: 60,
      borderRadius: 5,
      margin: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
  
      elevation: 5,
    }
  });