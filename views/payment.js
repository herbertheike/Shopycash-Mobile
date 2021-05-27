import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert
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
      troco: null,
      needchange: null,
      result:'',
      cart:'',
      cpf:'',
      resultpayment:'',
      _id:'',
      deliveryresult:''
    }
  }

  componentDidMount = async() =>{

    await AsyncStorage.getItem('cartid')
    .then((_id)=>{
      this.setState({_id:_id})
     // console.log(this.state._id)
    })
      
    await fetch("https://api-shopycash1.herokuapp.com/cart/"+this.state._id)
      .then((response) => response.json())
      .then((res) => this.setState({cart:res[0].produtos, result:res}))
      .catch((error) => console.error(error));
      console.log(this.state.result)
  }

  delivery = async (item) => {
    const result = item;
    
    const troco = this.state.troco;
    const _id = this.state._id;
    const payload = JSON.stringify({
      cpf:this.state.cpf,
      paymentmethod:this.state.paymentmethod,
      change:troco === null ? 0 : troco,
    })

    await fetch(
      "https://api-shopycash1.herokuapp.com/payment/"+_id ,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: payload,
      }
    )
      .then((response) => response.json())
      .then((res) => this.setState({ resultpayment: res }))
      .catch((error) => console.error(error));

      console.log(this.state.resultpayment);
      if(this.state.resultpayment.status === 'await'){
        const cartstatus = await AsyncStorage.clear();
        console.log('ok')
        Alert.alert("ShopyCash Payment","Congrats")
        this.props.navigation.navigate("MeusPedidos");
      }
      

  }

  render() {
    const paymentmethod = this.state.paymentmethod;
    const needchange = this.state.needchange;
    const result = this.state.result;
    const cart = this.state.cart;
    var colortext = '#2e5553'
    var disabledbt = true;
    const temaInput = {
      colors: { text: "black", placeholder: "#5eaaa8", primary: "#5eaaa8", background:'white' },
    };
    if(paymentmethod === 'Dinheiro' || paymentmethod === 'Cartão'){
      disabledbt = false;
      colortext = 'white'
    }
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

          }}
        >
                    <View style={{padding:10 , alignItems: "center", justifyContent: "center", width:'100%'}}>
                    
                    <Text style={{fontFamily:'', textAlign: "center", fontSize:24, color:"#faa500", fontWeight:'bold'}}>
                      Pagamento na entrega
                    </Text>
                    <Text style={{ textAlign: "center", fontSize:17}}>
                      A shopycash disponibiliza o pagamento na entrega e cada loja possui seus proprios meios de pagamento.
                    </Text>
              </View>
            
          
          <View style={{
                    width: "100%",
                    display:'flex',
                    justifyContent: 'center',
                    padding: 10,

                  }}>           
            <Text style={{ fontWeight:'bold', fontSize:12, color:"#faa500"}}>Sumario de compra</Text>
            <FlatList
            style={{ margin: 5, width: '100%'}}
            data={cart}
            keyExtractor={({ id }) => id}
            renderItem={({item, index})=>
                {
                  return(
                <View style={{display: "flex", flexDirection:'row', padding:5, alignItems:'center', justifyContent:"center"}}>
                  <Text numberOfLines={1} style={{width:'85%', fontWeight:'normal', fontSize:16,textAlign:'justify'}}>
                     {item.produto}
                  </Text>
                  <Text> - x{item.qty}</Text> 
                  </View>)}
                }/>

                  
          </View>      
          <View style={{
                    width: "100%",
                    height:'auto',
                    display:'flex',
                    padding: 10,
                    justifyContent: 'center'
                  }}>
              <DropDownPicker
                  items={[
                    { label: "Dinheiro", value: "Dinheiro", icon: () =><Icon name="money-bill" size={30} color="#009900" style={{paddingRight: 10}}/>},
                    { label: "Cartão", value: "Cartão", icon: () =><Icon name="credit-card" size={30} color="#880000" style={{paddingRight: 10}}/>},
                  ]}
                  defaultValue={
                    paymentmethod
                  }
                  placeholder="Selecione a forma de pagamento"
                  containerStyle={{
                    width: "100%",
                    height:60,
                  }}
                  dropDownStyle={{ backgroundColor: "#fafafa",height:'auto'}}
                  style={{
                    width: "100%",
                    fontSize: 16,
                    backgroundColor: "#fafafa",
                    borderColor: "#5eaaa8",
                    textAlign:'center'
                  }}
                  itemStyle={{
                    justifyContent: 'flex-start',alignItems:'center'
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
            <Text style={{padding:10}}> 
              {paymentmethod === null ? "Não foi selecionado a forma de pagamento": "Pagamento Selecionado:"+paymentmethod}
            </Text>
            <Text style={{padding:10}}>
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
                  placeholder="Precisa de troco?"
                  containerStyle={{
                    width: "100%",
                    height:80,
                    padding: 10
                  }}
                  dropDownStyle={{ backgroundColor: "#fafafa",height:'auto'}}
                  style={{
                    width: "100%",
                    fontSize: 16,
                    backgroundColor: "#fafafa",
                    borderColor: "#5eaaa8",
                    textAlign:'center'
                  }}
                  itemStyle={{
                    justifyContent: 'flex-start',alignItems:'center'
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
                  style={{padding:10}}
                  underlineColor={"#5eaaa8"}
                  selectionColor={"#5eaaa8"}
                  label={"Troco para?"}
                  theme={temaInput}
                  value={this.state.troco}
                  onChangeText={(text)=>this.setState({troco:text})}
                  />
                </View>
                :
                <View>
                  <Text style={{padding: 10}}>Sem troco.</Text>
                  </View>
                }
          </View>
          : <View>
            {/**cartão */}
            <Text style={{padding:10}}>
            {paymentmethod === null ? "Não foi selecionado a forma de pagamento": "Pagamento Selecionado:"+paymentmethod}
              </Text>
              {paymentmethod === 'Cartão' ?
              <View>
                <Text style={{ fontWeight: "bold", color: "#53aaa8", fontSize:15, padding: 10}}>Esta loja aceita os seguintes cartões: </Text>
                {/**Flatlist */}
                <TouchableOpacity style={{padding:10, justifyContent: 'flex-start',alignItems:'center', display:'flex', flex:1, flexDirection: "row"}}>
                  <Icon name="cc-visa" size={30} color="#393e46"  style={{paddingRight: 10}}/>
                  <Text style={{padding:3, alignItems:'center'}}>
                   Visa
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:10, justifyContent: 'flex-start',alignItems:'center', display:'flex', flex:1, flexDirection: "row"}}>
                  <Icon name="cc-mastercard" size={30} color="#393e46" style={{paddingRight: 10}}/>
                  <Text style={{padding:3, alignItems:'center'}}>
                   MasterCard
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:10, justifyContent: 'flex-start',alignItems:'center', display:'flex', flex:1, flexDirection: "row"}}>
                  <Icon name="cc-jcb" size={30} color="#393e46" style={{paddingRight: 10}}/>
                  <Text style={{padding:3, alignItems:'center'}}>
                   JCB
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:10, justifyContent: 'flex-start',alignItems:'center', display:'flex', flex:1, flexDirection: "row"}}>
                  <Icon name="cc-amex" size={30} color="#393e46" style={{paddingRight: 10}}/>
                  <Text style={{padding:3, alignItems:'center'}}>
                   American Express
                  </Text>
                </TouchableOpacity>

              </View>
              :
              <View></View>
              }
          </View>}
              <View style={{padding:10}}>
                
                  <TextInput mode={"outlined"}
                  underlineColor={"#5eaaa8"}
                  selectionColor={"#5eaaa8"}
                  label={"CPF"}
                  value={this.state.cpf}
                  theme={temaInput}
                  onChangeText={(text)=>this.setState({cpf: text })}
                  />
                  </View>
                  <FlatList
                  style={{ margin: 5}}
                  data={result}
                  keyExtractor={({ id }) => id}
                  renderItem={({item})=>
                      {
                        console.log('this', item)
                  return(
                
                    <View style={{borderColor:"#5eaaa8", borderWidth:1, borderRadius:5, padding: 10, margin: 5, justifyContent:"space-between", flexDirection:'column'}}>
                      <View style={{ flexDirection: "row", justifyContent:'space-between' }}>
                    <Text style={{ fontWeight:'100', fontSize:20, padding:5, textAlign: 'left' }}>
                      SubTotal:  
                    </Text>
                    <Text style={{ fontWeight:'bold', fontSize:20, padding:5, textAlign: 'left' }}>R${item.subTotal.toFixed(2).replace('.', ',')}</Text> 
                    </View>
                    <View style={{ flexDirection: "row", justifyContent:'space-between' }}>
                    <Text style={{ fontWeight:'100', fontSize:20, padding:5, textAlign: 'left' }}>
                      Taxa de entrega:
                    </Text>
                    <Text style={{ fontWeight:'bold', fontSize:20, padding:5, textAlign: 'left' }}>R${item.shippingprice.toFixed(2).replace('.', ',')}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent:'space-between' }}>
                    <Text style={{ fontWeight:'100', fontSize:20, padding:5, textAlign: 'left' }} >
                      Total:
                    </Text>
                    <Text style={{ fontWeight:'bold', fontSize:20, padding:5, textAlign: 'left' }}>R${item.total.toFixed(2).replace('.', ',')}</Text>
                    </View>
                </View>
                )}
                }/>                 
          <View>
              <Button 
              disabled={disabledbt}
              style={{padding:10}}
              contentStyle={{backgroundColor:'#53aaa8', padding:10}}
              labelStyle={{color:colortext,fontSize: 24}}
              mode="text"
              onPress={() =>this.delivery(result)}>
                Fazer pedido
              </Button>
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