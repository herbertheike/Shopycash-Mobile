
import React, { Component } from 'react';
import { AppRegistry,StyleSheet, Text,View, Image,TextInput, Button, TouchableHighlight} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer'
import LoginSelect from './views/loginview'
import LoginPhone from './views/loginphone'
import NextPhone from './views/nextphone'
import LojasMain from './views/lojasMain'
import Categorias from './views/getcategorias'
import LojaDetail from './views/lojadetail'
import GetRegistro from './views/getregistro'
import LoadingScreen from './views/loadingScreen'
import Cadastro from './views/Cadastro'
import Login from './views/Login'
import Proddetail from './views/proddetail'
import Extrato from './views/extrato'
import { Icon } from 'react-native-elements'
import * as firebase from "firebase";




const firebaseConfig = {
  apiKey: "AIzaSyCI_8KYJblO2KFRY6vuwy3qa3rmLcnMhPQ",
  authDomain: "shopycash-19409.firebaseapp.com",
  databaseURL: "https://shopycash-19409.firebaseio.com",
  projectId: "shopycash-19409",
  storageBucket: "shopycash-19409.appspot.com",
  appId: "1:98141338607:android:d26ae530b6bf906cb9d41a",
};

//Navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const MainStack = createStackNavigator();

firebase.initializeApp(firebaseConfig);




class App  extends React.Component{
state = { user: {} };
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({user: user});
      }
    })
  }
  
        render() {
          return (
            <NavigationContainer>
              <MainStack.Navigator initialRouteName="Loading Screen">
                <MainStack.Screen name="LoadingScreen" component={LoadingScreen} options ={{headerShown:false}} />
                <MainStack.Screen name="LoginSelect" component={LoginSelect} options ={{headerShown:false}}/>
                <MainStack.Screen name="TelefoneLogin" component={TelefoneLogin} options ={{headerShown:false}}/>
                <MainStack.Screen name="MainPage" component={MainPage} options ={{headerShown:false}}/>
                <MainStack.Screen name="GetCategorias" component={GetCategorias} options ={{headerShown:false}}/>
                <MainStack.Screen name="LojaDetail" component={LojaDetail} options ={{headerShown:false}}/>
                <MainStack.Screen name="Registro" component={GetRegistro} options ={{headerShown:false}}/>
                <MainStack.Screen name="Cadastro" component={Cadastro} options ={{headerShown:false}}/>
                <MainStack.Screen name="Login" component={Login} options ={{headerShown:false}}/>
                <MainStack.Screen name="Proddetail" component={Proddetail} options ={{headerShown:false}}/>
                <MainStack.Screen name="Extrato" component={Extrato} options ={{headerShown:false}}/>
              </MainStack.Navigator>
            </NavigationContainer>
          )
        }
      }

function Select() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginSelect" component={LoginSelect} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}
function TelefoneLogin(){
  return (
  <Stack.Navigator>
      <Stack.Screen name="LoginPhone" component={LoginPhone} options={{headerShown:false}}/>
        <Stack.Screen name="NextPhone" component={NextPhone} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}
function GetCategorias(){
  <Stack.Navigator>
      <Stack.Screen name="Categorias" component={Categorias} options={{headerShown:false}}/>
  </Stack.Navigator>
}

function MainPage({navigation}){
  return (
    <Drawer.Navigator >
      <Drawer.Screen name="LojasMain" 
      component={LojasMain}
      initialRouteName="feed"
      drawerType='slide' 
      options={{headerShown:true, 
      headerLeft: () =>(
          <Icon style={{ marginLeft: 20 }}
          onPress={() => navigation.openDrawer()}
          name="menu"
          color="#e80000" size={30}/>)}}
       />
    </Drawer.Navigator>
  )
}

export default App;


