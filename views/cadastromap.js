import React from "react";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Dimensions, 
  ToastAndroid
} from "react-native";
import {
  Avatar,
  Caption,
  TextInput,
  Button,
  RadioButton,
} from "react-native-paper";
import firebase from "firebase";
import Icon from "react-native-vector-icons/FontAwesome5";
import MapView from 'react-native-maps';
//import TextInputMask from 'react-native-text-input-mask'
import { TextInputMask } from 'react-native-masked-text'
import AsyncStorage from "@react-native-async-storage/async-storage";

class CadMap extends React.Component {
  state = {
    cep:'',
    addressStreet: "",
    addressNumber: "",
    addressDistrict: "",
    addressCity: "",
    addressState: "",
    addressReference: ""

  };

  componentDidMount (){
  
  }

  viaCep = async () =>{
    var cep = this.state.cep;

      await fetch("https://viacep.com.br/ws/"+cep+"/json/")
        .then((res) => res.json())
        .then((result) => (this.setState({addressDistrict:result.bairro,
          addressStreet:result.logradouro,
          addressCity:result.localidade,
          addressState:result.uf
        })))
        .catch((error) => console.log(error))
        .finally(() => console.log("Consulta OK"));

       // this.setState({endereco:result})

        /*Alert.alert(
          "Esté é seu endereço?",
          this.state.lograd+", "+this.state.bairro+", "+ this.state.cidade+" - "+this.state.estado,
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );*/
  }

  addressDetails = async () => {
    const user = firebase.auth().currentUser;
    var confirmation = false;
    const showToast = () => {
      ToastAndroid.show("Revise seu endereço", ToastAndroid.LONG);
    }

    await Alert.alert(
      "Esté é seu endereço?",
      this.state.addressStreet+", "+this.state.addressNumber+", "+this.state.addressDistrict+", "+ this.state.addressCity+" - "+this.state.addressState,
      [
        {
          text: "Cancel",
          onPress: () => showToast(),
          style: "cancel"
        },
        { text: "OK",
        onPress: () => {try {
           firebase
          .database()
          .ref("/user/" + user.uid)
          .update({
            address:{
              street:this.state.addressStreet,
              number:this.state.addressNumber,
              district:this.state.addressDistrict,
              city:this.state.addressCity,
              state:this.state.addressState,
              postalcode:this.state.cep,
              reference:this.state.addressReference
            },
            updateAt: Date.now(),
          }),
          this.props.navigation.navigate("MainPage");
        } catch (error) {
          console.log(error)
        }} }
      ],
      { cancelable: false }
    );
       
  };

  render() {
    const temaInput = {
      colors: { text: "black", placeholder: "#5eaaa8", primary: "#5eaaa8" },
    };

    return (
        <KeyboardAvoidingView>
          <View>
          <View>
          <Text style={styles.label}>
            Olá, qual seu CEP?
          </Text>
          <View style={{alignItems: "center", justifyContent:'space-between'}}>
          <TextInputMask
            type={'zip-code'}
            value={this.state.cep}
            onChangeText={text => {
            this.setState({
              cep: text
             })
              }}
              style={styles.input}
            />
            <Button 
              style={{padding:5, margin:5}}
              mode={'contained'}
              contentStyle={{padding:5}}
              onPress={()=>this.viaCep()}>
                Pesquisar
              </Button>
              </View>
              </View>
              <View style={{widtth:'100%'}}>
              <TextInput
              mode={"outlined"}
              style={{padding:5, margin:5}}
              underlineColor={"#5eaaa8"}
              selectionColor={"#5eaaa8"}
              theme={temaInput}
                placeholder="Rua"
                value={this.state.addressStreet}
                onChangeText={addressStreet => this.setState({ addressStreet:addressStreet})}
              />
              <TextInput
              mode={"outlined"}
              style={{padding:5, margin:5}}
              underlineColor={"#5eaaa8"}
              selectionColor={"#5eaaa8"}
              theme={temaInput}
                placeholder="Numero"
                value={this.state.addressNumber}
                onChangeText={addressNumber => this.setState({ addressNumber:addressNumber })}
              />
              <TextInput
              mode={"outlined"}
              style={{padding:5, margin:5}}
              underlineColor={"#5eaaa8"}
              selectionColor={"#5eaaa8"}
              theme={temaInput}
                placeholder="Bairro"
                value={this.state.addressDistrict}
                onChangeText={addressDistrict => this.setState({ addressDistrict:addressDistrict })}
              />
              <TextInput
              mode={"outlined"}
              style={{padding:5, margin:5}}
              underlineColor={"#5eaaa8"}
              selectionColor={"#5eaaa8"}
              theme={temaInput}
                placeholder="Cidade"
                value={this.state.addressCity}
                onChangeText={addressCity => this.setState({ addressCity:addressCity})}
              />
              <TextInput
              mode={"outlined"}
              style={{padding:5, margin:5}}
              underlineColor={"#5eaaa8"}
              selectionColor={"#5eaaa8"}
              theme={temaInput}
                placeholder="Estado"
                value={this.state.addressState}
                onChangeText={addressState => this.setState({ addressState:addressState })}
              />
              <TextInput
              mode={"outlined"}
              style={{padding:5, margin:5}}
              underlineColor={"#5eaaa8"}
              selectionColor={"#5eaaa8"}
              theme={temaInput}
                placeholder="Ponto de referencia"
                value={this.state.addressReference}
                onChangeText={addressReference => this.setState({ addressReference:addressReference })}
              />
            </View>
            <Button 
              style={{padding:5, margin:5}}
              mode={'contained'}
              contentStyle={{padding:5}}
              onPress={()=>this.addressDetails()}>
                Confirmar endereço
              </Button>
            </View>
        </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#fff',
    alignItems: "center"
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  label:{
    fontSize:20,
    marginTop:50,
    textAlign:  "center",
    fontWeight: "bold",
    fontFamily: 'Roboto',
    letterSpacing: 2,
  }, 
  scrollcontainer: {
    width: "100%",
    flexDirection: "column",
    padding: "5%",
  },
  input: {
    width:'40%',
    height:60,
    backgroundColor: '#e0e0e0',
    fontSize: 18,
    textAlign: "center",
    borderColor: "#707070",
    padding: 5,
    marginHorizontal: 10,
    marginTop:50,
    letterSpacing: 3,
    borderBottomWidth: 2,
    borderBottomColor:'blue'
    },
    inputo: {
      textAlign: "center",
      padding: 5,
      },
  button: {
    backgroundColor: "#3A559F",
    height: 44,
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: "center",
    padding: 10,
    borderRadius: 22,
  },
});

export default CadMap;
