import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const fbicon = <Icon name='facebook-f' size={30} color="#25282B" />

export default function Login(props) {
  return (
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
          onPress={() => props.navigation.navigate('TelefoneLogin', {screen: 'LoginPhone'})}>
          <Text style={styles.botaotext}>Conectar com número de telefone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaosemlogin}
          title="Login"
          color='#ffffff'>
          <Text style={styles.botaotext} onPress={() => props.navigation.navigate('MainPage')}>Entrar sem cadastro</Text>
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
  image: {
    width: 250,
    height: 100,
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
  botao: {
    width: "100%",
    height:60,
    borderRadius: 15,
    backgroundColor: '#EBAD00',
    color: '#FFFFFF',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  botaofacebook: {
    width: "100%",
    height:60,
    borderRadius: 15,
    backgroundColor: '#3b589a',
    marginTop: 10,
    alignItems: 'center',
    padding: 20
  },
  botaogoogle: {
    width: "100%",
    height:60,
    borderRadius: 15,
    backgroundColor: '#508df8',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  botaosemlogin: {
    width: "100%",
    height:60,
    borderRadius: 15,
    backgroundColor: '#8bb8f9',
    marginTop: 10,
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
