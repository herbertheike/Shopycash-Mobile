import React, { useEffect, useState } from 'react';
import {  StyleSheet, Text, View, Image} from 'react-native';
import { Header } from 'react-native-elements'
import { TextInput } from 'react-native-gesture-handler';
import firebase from "firebase";
import Icon from 'react-native-vector-icons/FontAwesome';

const carticon = <Icon name='shopping-cart' size={30} color="#25282B" style={{ marginHorizontal: 10 }} />
const menuicon = <Icon style={{ marginLeft: 10 }} onPress={() => props.navigation.toggleDrawer()} name="bars" color="#25282B" size={30} />


export default class UserProfile extends React.Component {
  state = { name: 'sem nome', email: '', photoUrl: 'https://i.pinimg.com/originals/d2/b1/04/d2b104da6040b88dfba0c3bc28cea8a5.jpg' }
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const userId = firebase.auth().currentUser.uid;

     firebase.database().ref('/user/' + userId).once('value', function(snapshot) {
       if(snapshot.val().loginType === 'Facebook' || snapshot.val().loginType === 'Google'){
        this.setState({name: snapshot.val().displayName});
        this.setState({photoUrl: snapshot.val().photoUrl})
        this.setState({email: snapshot.val().email})
       }else{
      this.setState({email: snapshot.val().email})
       }
     }.bind(this))
  }


  render() {
    const configicon = <Icon name='cog' size={30} color="#25282B" style={{ marginHorizontal: 10 }} />
const menuicon = <Icon style={{ marginLeft: 10 }} onPress={() => this.props.navigation.toggleDrawer()} name="bars" color="#25282B" size={30} />
    return (
      
      <View style={styles.container}>
            <Header statusBarProps={{ barStyle: 'light-content' }} barStyle='light-content' leftComponent={menuicon}
        centerComponent={{ style: { color: '#25282B', fontWeight: 'bold', fontSize: 20, fontFamily: "Roboto" } }}
        rightComponent={configicon}
        containerStyle={{ backgroundColor: '#E8E8E8', justifyContent: 'space-around' }} />
        <View style={{padding: 15}}>
          <Image style={{ width: 200, height: 200, marginRight: 5, borderRadius:600/2 }} source={{uri:this.state.photoUrl}}/>
          <Text>{this.state.name}</Text>
          <Text>{this.state.email}</Text>
        </View>
      </View>

    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  cashbackdesk: {
    fontSize: 60,
    padding: 15,
    fontWeight: 'bold',

  },
  image: {
    width: 250,
    height: 100,
  },
  ImageStyle: {
    padding: 25,
    margin: 10,
    height: 25,
    width: 25,
    resizeMode: 'center',
    alignItems: 'center',
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
  cat01: {
    width: "90%",
    height: 100,
    borderRadius: 7,
    backgroundColor: '#E5434A',
    color: '#FFFFFF',
    margin: 10,
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