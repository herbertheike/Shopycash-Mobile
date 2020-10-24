
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text,View, Image,TextInput, Button, TouchableHighlight} from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import * as firebase from "firebase";
import Animated from 'react-native-reanimated';


class LoadingScreen extends React.Component{
  constructor(props){
    super(props);
  };

  componentDidMount() {
    this.checkIfLoggedin();
    
  }
  
  checkIfLoggedin = () =>{
    firebase.auth().onAuthStateChanged(
      function (user){
      if (user)
      {
        
        this.props.navigation.navigate('Home');
      }else{
        this.props.navigation.navigate('MainPage');
      }
    }.bind(this)
    );
  }
        render() {
          
          return (
              <View style={{alignItems: 'center', justifyContent:"center", flex: 1, backgroundColor: "#EBAD00" }}>
                <Image
                source={require('../assets/logo.png')}
                style={styles.image}
              />
                
                
                <BarIndicator  style={{position:"relative", marginTop:'-49%', marginLeft:'1%'}}
                count={5}
                color='#40B29D'
                size={60}
                animating={true}/>
                <BarIndicator  style={{position:"relative", marginTop:'-50%'}}
                count={5}
                color={'#000000'}
                size={60}
                animating={true}/>
                
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
