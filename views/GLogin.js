import React from 'react';
import { Text,TouchableOpacity, StyleSheet } from 'react-native';
import * as GoogleSignIn from 'expo-google-sign-in';

export default class GLogin extends React.Component {
  state = { user: null };

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
    this.setState({ user });
  };

  signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    this.setState({ user: null });
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

  onPress = () => {
    if (this.state.user) {
      this.signOutAsync();
    } else {
      this.signInAsync();
    }
  };

  render() {
    return  <TouchableOpacity style={styles.botaogoogle} onPress={this.onPress}>
            <Text >Entrar com o Google</Text>
            </TouchableOpacity>
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
      color: '#FFFFFF'
    }
  });