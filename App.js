
import React, { Component } from 'react';
import { AppRegistry,StyleSheet, Text,View, Image,TextInput, Button, TouchableHighlight} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer'
import Login from './views/loginview'
import LoginPhone from './views/loginphone'
import NextPhone from './views/nextphone'
import LojasMain from './views/lojasMain'
import GetShopping from './views/getShopping'
import LojaDetail from './views/lojadetail'
import GetRegistro from './views/getregistro'
import LoadingScreen from './views/loadingScreen'
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
  
        render() {
          return (
            <NavigationContainer>
              <MainStack.Navigator initialRouteName="Loading Screenn">
                <MainStack.Screen name="LoadingScreen" component={LoadingScreen} options ={{headerShown:false}} />
                <MainStack.Screen name="Home" component={HomeScreen} options ={{headerShown:false}}/>
                <MainStack.Screen name="TelefoneLogin" component={TelefoneLogin} options ={{headerShown:false}}/>
                <MainStack.Screen name="MainPage" component={MainPage} options ={{headerShown:false}}/>
                <MainStack.Screen name="Shopping" component={Shopping} options ={{headerShown:false}}/>
                <MainStack.Screen name="LojaDetail" component={LojaDetail} options ={{headerShown:false}}/>
                <MainStack.Screen name="Registro" component={GetRegistro} options ={{headerShown:false}}/>
              </MainStack.Navigator>
            </NavigationContainer>
          )
        }
      }

function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={Login} options={{headerShown:false}}/>
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
function Shopping(){
  <Stack.Navigator>
      <Stack.Screen name="shopping" component={GetShopping} options={{headerShown:false}}/>
  </Stack.Navigator>
}

function MainPage({navigation}){
  return (
    <Drawer.Navigator >
      <Drawer.Screen name="LojasMain" component={LojasMain} initialRouteName="feed" drawerType='slide' options={{headerShown:true, headerLeft: () =>(
      <Icon style={{ marginLeft: 20 }} onPress={() => navigation.openDrawer()} name="menu" color="#e80000" size={30}/>)}}/>
    </Drawer.Navigator>
  )
}

export default App;
