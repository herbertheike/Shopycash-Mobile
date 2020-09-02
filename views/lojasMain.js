import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Button, KeyboardAvoidingView } from 'react-native';
import { createDrawerNavigator, DrawerActions, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import loginview from './loginview'
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-elements'

function HomeScreen({ navigation }) {
  const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator initialRouteName="Feed" drawerType='slide' draerOptions={{headerShown:true, headerLeft: () =>(
        <Icon style={{ marginLeft: 20 }} onPress={() => navigation.openDrawer()} name="menu" color="#e80000" size={30}/>)}}>
        <Drawer.Screen name="Feed" component={HomeScreen} />
        <Drawer.Screen name="Login" component={loginview} />
      </Drawer.Navigator>
      
    )
  }



export default function lojasMain({navigation}) {
    return (
        <HomeScreen />
    );
  }