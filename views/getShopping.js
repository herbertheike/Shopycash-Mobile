import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Button, KeyboardAvoidingView, SafeAreaView, FlatList } from 'react-native';
import { createDrawerNavigator, DrawerActions, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import loginview from './loginview'
import { NavigationContainer } from '@react-navigation/native';
import {Icon, Header} from 'react-native-elements'
import { TextInput } from 'react-native-gesture-handler';

export default function Getshopping({navigation}) {
    const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
    useEffect(() => {
      fetch('http://192.168.0.107:8080/administrativo/shopping')
        .then((response) => response.json())
        .then((json) => setData(json.Shoppings))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);
    return (
        
      <View style={styles.container}>
          <Header statusBarProps={{ barStyle: 'light-content' }} barStyle= 'light-content' leftComponent={<Icon style={{ marginLeft: 20 }} onPress={() => navigation.toggleDrawer()} name="menu" color="#25282B" size={30}/>}
                centerComponent={{ text: 'Shopycash', style: { color: '#25282B', fontWeight: 'bold', fontSize:20, fontFamily:"Roboto" }}}
                containerStyle={{ backgroundColor: '#EBAD00', justifyContent: 'space-around' }}/>
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
          style={{width:"100%"}}
            data={data}
            keyExtractor={({ id }, idshopping) => id}
            renderItem={({ item }) => (
              
              <TouchableOpacity style={styles.cat01} title="Login" color='#ffffff' onPress={() => alert(item.idshopping)}>
                        <Icon name="search" color="#FFFFFF" size={60}/>
                        <Text  style={styles.botaotext}>Nome: {item.nome}</Text>
                      </TouchableOpacity>
            )}
          />
        )}
      </View>
      
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e8e8e8',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cashbackdesk:{
      fontSize:60,
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