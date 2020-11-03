
import React, { Component } from 'react';
import {  StyleSheet, View, Image } from 'react-native';
import {BarIndicator,} from 'react-native-indicators';
import * as firebase from "firebase";


class LoadingScreen extends React.Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('MainPage');
        console.log(user.providerData.photoURL)
      } else {
        this.props.navigation.navigate('LoginSelect');
        console.log(user.photoURL)
        
      }
    });
  }
  render() {

    return (
      <View style={{ alignItems: 'center', justifyContent: "center", flex: 1, backgroundColor: "#EBAD00" }}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.image}
        />

        <BarIndicator style={{ position: "relative", marginTop: '-50%' }}
          count={5}
          color={'#000000'}
          size={60}
          animating={true} />

      </View>
    )
  }
}


const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
})

export default LoadingScreen;
