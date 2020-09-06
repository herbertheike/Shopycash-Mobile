import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Button, KeyboardAvoidingView, SafeAreaView, FlatList } from 'react-native';
import { createDrawerNavigator, DrawerActions, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import loginview from './loginview'
import Getshopping from './getShopping'
import { NavigationContainer } from '@react-navigation/native';
import {Icon, Header} from 'react-native-elements'
import { TextInput } from 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();
const url = 'http://localhost:8080/administrativo/shopping'
const  ColorCode = ['rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')',
'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')',
'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')',
'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')',
'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')',
'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')',
'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'];

function HomeScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const iconnama = ["arrow-forward","arrow-upward","art-track","aspect-ratio","assessment","assignment","assignment-ind","assignment-late","assignment-return","assignment-returned","assignment-turned-in","assistant","assistant-photo","attach-file","attach-money","attachment","audiotrack","autorenew","av-timer","backspace","backup","battery-alert","battery-charging-full","battery-full","battery-std","battery-unknown","beach-access","beenhere","block","bluetooth","bluetooth-audio","bluetooth-connected","bluetooth-disabled","bluetooth-searching","blur-circular","blur-linear","blur-off","blur-on"]
  
    useEffect(() => {
      fetch('http://192.168.0.103:8080/administrativo/segmento/')
        .then((response) => response.json())
        .then((json) => setData(json.Segmentos))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);
    
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Header statusBarProps={{ barStyle: 'light-content' }} barStyle= 'light-content' leftComponent={<Icon style={{ marginLeft: 20 }} onPress={() => navigation.toggleDrawer()} name="menu" color="#25282B" size={30}/>}
                centerComponent={{ text: 'Shopycash', style: { color: '#25282B', fontWeight: 'bold', fontSize:20, fontFamily:"Roboto" }}}
                containerStyle={{ backgroundColor: '#EBAD00', justifyContent: 'space-around' }}/>
            <View  style={styles.section}>
              <Icon style={ styles.ImageStyle} onPress={() => navigation.toggleDrawer()} name="search" color="#25282B" size={30}/>
                <TextInput style={{flex:1}} placeholder='Busque produtos ou Loja'name={'search'}></TextInput>     
            </View>
            <ScrollView horizontal={true}showsHorizontalScrollIndicator={true} scrollEventThrottle={500} decelerationRate={'normal'} pagingEnabled={true} >
            <View>
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
          horizontal={true}
          style={{width:"100%"}}
            data={data}
            keyExtractor={({ id }, idseg) => id}
            renderItem={({ item }) => (
              
              <TouchableOpacity style={{width: 100,
                height: 120,
                borderRadius: 7,
                backgroundColor: ColorCode[item.idseg],
                color: '#FFFFFF',
                margin: 10,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10}} title="Login" color='#ffffff' onPress={() => alert(item.idseg)}>
                        <Icon name={iconnama[item.idseg]} color="#FFFFFF" size={60}/>
                        <Text  style={styles.botaotext}>{item.nome}</Text>
                      </TouchableOpacity>
            )}
          />
        )}
      </View>
                    </ScrollView>         
      </KeyboardAvoidingView>
    );
  }


export default function lojasMain() {
    return (
        <Drawer.Navigator>
          <Drawer.Screen name="home" component={HomeScreen} />
          <Drawer.Screen name="Shopping" component={Getshopping} />
        </Drawer.Navigator>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e8e8e8',
      alignItems: 'center',
      justifyContent: 'flex-start',
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