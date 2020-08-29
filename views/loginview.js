import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,ScrollView, Button, KeyboardAvoidingView } from 'react-native';
import LoginPhone from './loginphone'

export default function Login(props)
{
    return(
    <KeyboardAvoidingView style={styles.container}>
      <Image 
      source={require('../assets/logo.png')}
      style={styles.image}
      />
          <View style={styles.login}>
          <Text style={styles.logintext}>Olá, é bom conhecê-lo!</Text>
          <Text style={styles.logindesc}>Tentamos encontar uma maneira de adicionar mais opções e deixar o processo mais dinâmico</Text>
                <TouchableOpacity style={styles.botao}
                    title="Login"
                    color='#ffffff'
                    onPress={() => props.navigation.navigate('LoginPhone')}
                >
                    <Text style={styles.botaotext}>Conectar com número de telefone</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaofacebook}
                    title="Login"
                    color='#ffffff'
                >
                    <Text style={styles.botaotext}>Conectar com Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaogoogle}
                    title="Login"
                    color='#ffffff'
                >
                    <Text style={styles.botaotext}>Conectar com Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaosemlogin}
                    title="Login"
                    color='#ffffff'
                >
                    <Text style={styles.botaotext}>Entrar sem cadastro</Text>
                </TouchableOpacity>
          </View>
    </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EBAD00',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image:{
      width: 250,
      height: 100,
    },
    login:{
        backgroundColor: '#ffffff',
        width: '100%',
        borderRadius: 15,
        position:'relative',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginBottom: -350,
        marginTop:100
    },
    botao:{
      width:350,
      height: 50,
      borderRadius: 15,
      backgroundColor: '#EBAD00',
      color: '#FFFFFF',
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10
    },
    botaofacebook:{
      width:350,
      height: 50,
      borderRadius: 15,
      backgroundColor: '#3b589a',
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10
    },
    botaogoogle:{
      width:350,
      height: 50,
      borderRadius: 15,
      backgroundColor: '#508df8',
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10
    },
    botaosemlogin:{
      width:350,
      height: 50,
      borderRadius: 15,
      backgroundColor: '#8bb8f9',
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10
    },
    logintext:{
      fontWeight: 'bold',
      fontSize: 18,
      position: 'relative',
     width: 350
    },
    logindesc:{
      width:350,
      fontSize: 14,
      position: 'relative',
      color: '#999999'
    },
    botaotext:{
        fontWeight: 'bold',
        color: '#FFFFFF'
    }
  });
  