import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Button, KeyboardAvoidingView, SafeAreaView, FlatList } from 'react-native';
import { createDrawerNavigator, DrawerActions, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Icon, Header } from 'react-native-elements'
import { TextInput } from 'react-native-gesture-handler';
import Getshopping from './getShopping'
import { Dropdown } from 'react-native-material-dropdown-v2';



const Drawer = createDrawerNavigator();
const url = 'http://localhost:8080/administrativo/shopping'
const ColorCode = ['#E5454C', '#5653d4', '#08a791','#faa33f', '#b6644f', '#fb3061', '#E5454C', '#5653d4', '#08a791','#faa33f', '#b6644f', '#fb3061',
                  '#E5454C', '#5653d4', '#08a791','#faa33f', '#b6644f', '#fb3061', '#E5454C', '#5653d4', '#08a791','#faa33f', '#b6644f', '#fb3061', 
                  '#E5454C', '#5653d4', '#08a791','#faa33f'];

function HomeScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  //const iconnama = ["arrow-forward", "arrow-upward", "art-track", "aspect-ratio", "assessment", "assignment", "assignment-ind", "assignment-late", "assignment-return", "assignment-returned", "assignment-turned-in", "assistant", "assistant-photo", "attach-file", "attach-money", "attachment", "audiotrack", "autorenew", "av-timer", "backspace", "backup", "battery-alert", "battery-charging-full", "battery-full", "battery-std", "battery-unknown", "beach-access", "beenhere", "block", "bluetooth", "bluetooth-audio", "bluetooth-connected", "bluetooth-disabled", "bluetooth-searching", "blur-circular", "blur-linear", "blur-off", "blur-on"]

  useEffect(() => {
    fetch('http://192.168.0.103:8080/administrativo/segmento/')
      .then((response) => response.json())
      .then((json) => setData(json.Segmentos))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <Header statusBarProps={{ barStyle: 'light-content' }} barStyle='light-content' leftComponent={<Icon style={{ marginLeft: 20 }} onPress={() => navigation.toggleDrawer()} name="menu" color="#25282B" size={30} />}
        centerComponent={{ text: 'Shopycash', style: { color: '#25282B', fontWeight: 'bold', fontSize: 20, fontFamily: "Roboto" } }}
        containerStyle={{ backgroundColor: '#EBAD00', justifyContent: 'space-around' }} />
      <View style={styles.section}>
        <Icon style={styles.ImageStyle} onPress={() => navigation.toggleDrawer()} name="search" color="#25282B" size={30} />
        <TextInput style={{ flex: 1 }} placeholder='Busque produtos ou Loja' name={'search'}></TextInput>
      </View>

      <ScrollView showsHorizontalScrollIndicator={true} scrollEventThrottle={500} decelerationRate={'normal'}>
        <View>
          {isLoading ? <ActivityIndicator /> : (
            <FlatList
              horizontal={true}
              data={data}
              keyExtractor={({ id }, idseg) => id}
              renderItem={({ item }) => (

                <TouchableOpacity style={{
                  width: 100,
                  borderRadius: 7,
                  backgroundColor: ColorCode[item.idseg-1],
                  color: '#FFFFFF',
                  marginHorizontal: 5,
                  alignItems: 'center',
                  padding: 10
                }} title="Login" color='#ffffff' onPress={() => alert(item.idseg)}>
                  <Text style={styles.botaotext}>{item.nome}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
        <View >
      <Lojas />
      </View>
      </ScrollView>
      
      
    </View>
  );
}

function Lojas() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData, newData, newsetData] = useState([]);
  useEffect(() => {
    fetch('http://192.168.0.103:8080/shopping/lojas')
      .then((response) => response.json())
      .then((json) => setData(json.lojas))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <View>
    {isLoading ? <ActivityIndicator /> : (
      <FlatList
        horizontal={true}
        data={data}
        keyExtractor={({ id }, idLoja) => id}
        renderItem={({ item }) => (

          <TouchableOpacity style={{
            flex: 1,
            width:'100%',
            borderRadius: 7,
            backgroundColor: '#ffffff',
            alignItems: 'center',
            padding: 10,
          }} title="Login" color='#ffffff' onPress={() => alert(item.nomeloja)}>
            <Text style={styles.lojastext}>{item.nomeloja} - {item.shopping}</Text>
            <Text style={styles.lojades}>{item.desc}</Text>
          </TouchableOpacity>
        )}
      />
    )}
  </View>
  )
};



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
    flexDirection:'column',
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
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
  lojades: {
    width: '100%',
    fontSize: 14,
    position: 'relative',
    color: '#b9b9b9'
  },
  lojastext:{
    color:'#000000'
  },
  botaotext: {
    fontWeight: 'bold',
    color: '#FFFFFF'
  }
});