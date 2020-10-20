import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView,TouchableOpacity,Button } from 'react-native';
import FBLogin from './FBLogin'
import GLogin from './GLogin'



export default function registro({navigation}) {
   
    return (
      <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.logintext}>Selecione o tipo de login</Text>
          <View>
              <Text style={styles.logintext}>Facebook</Text>
                  <FBLogin />
              <Text style={styles.logintext}>Google</Text>
                  <GLogin />

                  
          </View>
          <TouchableOpacity style={styles.botaotext}
          title="Login"
          color='#ffffff'>
          <Button title={'Avançar'}
          onPress={() => navigation.navigate('MainPage')}/>
        </TouchableOpacity>
  </KeyboardAvoidingView>
      
      
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