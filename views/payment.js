import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Header } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase";
import {
  Avatar,
  Caption,
  TextInput,
  Button,
  RadioButton,
} from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import * as Location from "expo-location";
export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentmethod: null,
      needchange: null
      
    }
  }

  componentDidMount() {
  }

  render() {
    const paymentmethod = this.state.paymentmethod;
    const needchange = this.state.needchange;
    const temaInput = {
      colors: { text: "black", placeholder: "#5eaaa8", primary: "#5eaaa8" },
    };
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Header
          statusBarProps={{ barStyle: "light-content" }}
          barStyle="light-content"
          centerComponent={
            ({
              style: {
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: 20,
                fontFamily: "Roboto",
              },
            },
            (
              <Text
                style={{ fontWeight: "bold", color: "#53aaa8", fontSize: 13 }}
              >
                Checkout - Pagamento
              </Text>
            ))
          }
          containerStyle={{
            backgroundColor: "#ffffff",
            justifyContent: "space-around",
          }}
        />
        <ScrollView
          style={{
            backgroundColor: "#ffffff",
            flexDirection: 'column',
            paddingHorizontal: 10,
          }}
        >
          <View style={{
                    width: "100%",
                    display:'flex',
                    justifyContent: 'center',
                    padding: 10,

                  }}>
            <Text style={{ fontWeight:'100', fontSize:12}}>Sumario de compra</Text>
            {/*flatlist*/}
            <Text style={{ fontWeight:'100', fontSize:18}}>
              Item 1 - x1
            </Text>
            <Text style={{ fontWeight:'100', fontSize:18}}>
              Item 2 - x1
            </Text>
            <Text style={{ fontWeight:'100', fontSize:18}} >
              Item 3 - x1
            </Text>
            <Text style={{ fontWeight:'100', fontSize:12}}>
              Enviado por: Loja - Shopping
            </Text>
          </View>
          <View style={{padding: 10, alignItems: "center", justifyContent: "center"}}>
                    
                    <Text style={{ textAlign: "center", fontSize:22}}>
                      Pagamento na entrega
                    </Text>
                    <Text style={{ textAlign: "center", fontSize:17}}>
                      A shopycash disponibiliza o pagamento na entrega e cada loja possui seus proprios meios de pagamento.
                    </Text>
              </View>
                  
          <View style={{
                    width: "100%",
                    height:100,
                    display:'flex',
                    padding: 10,
                    justifyContent: 'center'
                  }}>
              <DropDownPicker
                  items={[
                    { label: "Dinheiro", value: "Dinheiro", icon: () =><Icon name="money-bill" size={30} color="#009900" style={{paddingRight: 10}}/>},
                    { label: "Cartão", value: "Cartão", icon: () =><Icon name="credit-card" size={30} color="#880000"/>},
                  ]}
                  defaultValue={
                    paymentmethod
                  }
                  placeholder="Selecione a forma de pagamento"
                  containerStyle={{
                    width: "100%",
                    height:60,
                  }}
                  dropDownStyle={{ backgroundColor: "#fafafa",height:'auto' }}
                  style={{
                    width: "100%",
                    fontSize: 16,
                    backgroundColor: "#fafafa",
                    borderColor: "#5eaaa8",
                  }}
                  itemStyle={{
                    justifyContent: "flex-start"
                  }}
                  onChangeItem={(item) =>
                    this.setState({
                      paymentmethod: item.value,
                    })
                  }
                />
          </View>
          {paymentmethod === "Dinheiro"
          ? <View>
            <Text style={{ fontWeight:'100', fontSize:12}}> 
              {paymentmethod === null ? "Selecione uma forma de pagamento": "Pagamento Selecionado:"+paymentmethod}
            </Text>
            <Text>
              Precisa de troco?
            </Text>
            <DropDownPicker
                  items={[
                    { label: "Sim", value: true},
                    { label: "Não", value: false},
                  ]}
                  defaultValue={
                    needchange
                  }
                  label={"CPF"}
                  placeholder="Precisa de troco?"
                  containerStyle={{
                    width: "100%",
                    height:60,
                  }}
                  dropDownStyle={{ backgroundColor: "#fafafa",height:'auto' }}
                  style={{
                    width: "100%",
                    fontSize: 16,
                    backgroundColor: "#fafafa",
                    borderColor: "#5eaaa8",
                  }}
                  itemStyle={{
                    justifyContent: "flex-start"
                  }}
                  onChangeItem={(item) =>
                    this.setState({
                      needchange: item.value,
                    })
                  }
                />
                {needchange === true
                ? <View>
                  <TextInput mode={"outlined"}
                  underlineColor={"#5eaaa8"}
                  selectionColor={"#5eaaa8"}
                  label={"Troco para?"}
                  theme={temaInput}
                  />
                </View>
                :
                <View>
                  </View>
                }
          </View>
          : <View>
            <Text style={{padding:10}}t>
            {paymentmethod === null ? "Selecione uma forma de pagamento": "Pagamento Selecionado:"+paymentmethod}
              </Text>
              
            
          </View>}
              <View style={{padding:10}}>
                  <TextInput mode={"outlined"}
                  underlineColor={"#5eaaa8"}
                  selectionColor={"#5eaaa8"}
                  label={"CPF"}
                  theme={temaInput}
                  />
                  </View>
            <View style={{borderColor:"#5eaaa8", borderWidth:1, borderRadius:10, padding:10}}>
            {/*flatlist*/}
            <Text style={{ fontWeight:'100', fontSize:18, padding:10}}>
              SubTotal:
            </Text>
            <Text style={{ fontWeight:'100', fontSize:18, padding:10}}>
              Taxa de entrega:
            </Text>
            <Text style={{ fontWeight:'100', fontSize:18, padding:10}} >
              Total:
            </Text>
          </View>
          <View>
            <Button></Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
//Estilo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  centerElement: { justifyContent: "center", alignItems: "center" },
});