import React,{ useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import * as firebase from "firebase";

export default class Login extends React.Component{
  state = {modalVisible : false}

  constructor(props){
    super(props);
  };

  componentDidMount() {
    this.checkIfLoggedin();
    
  }

  setModalVisible(){
    
    this.setState({modalVisible: true});
  }
  
  checkIfLoggedin = () =>{
    
    firebase.auth().onAuthStateChanged(user =>  
    {
      if (user)
      {
        this.props.navigation.navigate('MainPage');
      }else{
        this.props.navigation.navigate('login');
      }
    }
    );
  }

render(){ 
  const {modalVisible} = this.state;
  const telefoneicon = <Icon name='mobile' size={30} color="#ffffff" />
  const nologinicon = <Icon name='eye' size={30} color="#ffffff" />
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.image}
      />

      <TouchableOpacity
        style={styles.openButton}
        onPress={() => {
          this.setState({modalVisible: true});
        }}
      >
        <Text style={styles.textStyle}>Cadastrar</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible} 
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.logintext}>Olá, é bom conhecê-lo!</Text>
              <Text style={styles.logindesc}>Tentamos encontar uma maneira de adicionar mais opções e deixar o processo mais dinâmico</Text>
                <TouchableOpacity style={styles.botao} title="LoginTelefone" color='#ffffff'
                onPress={() => this.props.navigation.navigate('TelefoneLogin',{screen: 'LoginPhone'},
                setTimeout(() => this.setState({modalVisible: false})), 1)}>
                  {telefoneicon}<Text style={styles.botaotext} >Conectar com número de telefone</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaosemlogin} title="NoLogin" color='#ffffff'
                onPress={() => this.props.navigation.navigate('MainPage',
                setTimeout(() =>  this.setState({modalVisible: false})),1)}>
                  {nologinicon}<Text style={styles.botaotext} >Entrar sem cadastro</Text>
                </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBAD00',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignContent: 'flex-start'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F19422",
    borderRadius: 5,
    height:60,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 15,
    padding: 20, 
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  login: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: 'auto',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  botao: {
    backgroundColor: '#EBAD00',
    width: 350,
    height:70,
    borderRadius: 20,
    color: '#FFFFFF',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  botaosemlogin: {
    backgroundColor: '#8bb8f9',
    width: 350,
    height:70,
    borderRadius: 20,
    color: '#FFFFFF',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
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
    fontWeight:  'bold', 
    fontSize: 16,
    color: '#FFFFFF'
  }
});
