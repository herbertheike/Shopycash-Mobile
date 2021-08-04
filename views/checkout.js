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
import {TextInput} from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import * as Location from "expo-location";
import { MaterialIndicator  } from "react-native-indicators";
export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderdata:'',
      cartid: '',
      subtotalPrice: 0,
      nome: '',
      cpf: '',
      email: '',
      telefone: '',
      shippingtax: 0,
      shipping:'',
      logradouro: "",
      referencia: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
      address:"",
      shoppingid: "",
      lojaid: "",
      shippingmethod: "",
      totalPrice: 0,
      isLoaded: false,
      shippingarray: [
        { label: "Entrega expressa (até 4 horas)", value: 8.90},
        { label: "Entrega convencional (até 1 dia)", value: 5.90},
        { label: "Retirar na Loja", value: 0.001}]
      
    };
  }

  componentDidMount = async () =>{
  //this.databaseaddr;
   // this.locale();
    await AsyncStorage.getItem('cartid')
    .then((cartid)=>{
      this.setState({cartid:cartid})
      //console.log(this.state.cartid)
    })
    await AsyncStorage.getItem('nome')
    .then((nome)=>{
      this.setState({nome:nome})
      //console.log(this.state.cartid)
    })
    await fetch("https://api-shopycash1.herokuapp.com/cart/"+this.state.cartid)
          .then((res) => res.json())
          .then((result) => this.setState({ orderdata:result, subtotalPrice: result[0].subTotal, logradouro:result[0].address.street}))
          .catch((error) => console.log(error))
          .finally(() => this.setState({isLoaded: true}),[]);
        
          console.log('ORDER DATA', this.state.orderdata[0].dadoscliente.email)
          this.setState({email:this.state.orderdata[0].dadoscliente.email})
          this.setState({userid:this.state.orderdata[0].dadoscliente.userid})
          this.setState({logradouro:this.orderdata[0].address.street,
            numero:this.orderdata[0].address.number,
            bairro:this.orderdata[0].address.district,
            cidade:this.orderdata[0].address.city,
            estado:this.orderdata[0].address.state,
            referencia:this.orderdata[0].address.reference,
            cep:this.orderdata[0].address.postalCode })
          console.log("SUB TOTAL ONLY",this.state.logradouro)

          

  }

  /*databaseaddr = async () =>{
    const address = this.state.address;
    await firebase.auth().onAuthStateChanged((user) => {
     if (user) {
       const userId = firebase.auth().currentUser.uid;
        firebase
         .database()
         .ref("/user/" + userId)
         .once(
           "value",
           function (snapshot) {
               this.setState({address:snapshot.val().address})
               this.setState({logradouro:address.street,
                numero:address.number,
                bairro:address.district,
                cidade:address.city,
                estado:address.state,
                referencia:address.reference,
                cep:address.postalCode })
             }.bind(this)
         )
         
     } else {
       console.log("Error")
     }
 });
 console.log(this.state.address)
 }*/

  subtotalPrice = () => {
    const { cartItems } = this.state;
    if (cartItems) {
      return cartItems.reduce(
        (sum, item) =>
          sum + (item.checked == 1 ? item.qty * item.unitPrice : 0),
        0
      );
    }
    return 0;
  };

  /*repopulate = async () => {
    const newItems = [...this.state.cartItems];
    //console.log(newItems)
    const jsonarray = this.state.jsonarray;
    for (var i = 0; i < newItems.length; i++) {
      try {
        const obj = JSON.parse(
          JSON.stringify({
            produtoid: newItems[i].produtoid,
            produto: newItems[i].produto,
            categoria: newItems[i].categoria,
            unitPrice: newItems[i].unitPrice,
            qty: newItems[i].qty,
            image: newItems[i].imagem,
            loja: newItems[i].loja,
            lojaid: newItems[i].lojaid,
            shopping: newItems[i].shopping,
            shoppingid: newItems[i].shoppingid,
            modifiedAt: Date.now(),
          })
        );
        if (i <= newItems.length) {
          jsonarray.push(obj);
        }
        //console.log(jsonarray)
      } catch (error) {
        console.log("THIS ERROR" + error);
      }
    }
  };*/

  payment = async () => {
    const payload = JSON.stringify({
      deliveryadress: 
        {
          logradouro: this.state.logradouro,
          referencia: this.state.referencia,
          numero: this.state.numero,
          bairro: this.state.bairro,
          cidade: this.state.cidade,
          estado: this.state.estado,
          cep: this.state.cep,
        },
        shippingmethod: this.state.shipping,
        shippingprice: this.state.shippingtax,
        total: (this.state.subtotalPrice+this.state.shippingtax).toFixed(2),
        cartstatus:'payment'
    }) 
    const _id = this.state.cartid;
    console.log("coisa",payload)
    try {
      await fetch(
        "https://api-shopycash1.herokuapp.com/delivery/" +
          _id,                                            
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
        .then((res) => this.setState({ orderdata: res }))
        .catch((error) => console.error(error));

        //console.log(this.state.orderdata)
        if(this.state.orderdata.status === 'payment'){
          const cartstatus = await AsyncStorage.setItem("cartstatus",'payment')
          console.log('ok')
          this.props.navigation.navigate("Payment");
        }

    } catch (error) {
      console.log(error);
    }
  };

  //Função  do gps
/* locale = async () => {
    var location = null;
    var errorMsg = null;
    let address = [];
    var pinIcon = (
      <Icon
        style={{ marginLeft: 10 }}
        name="map-marker-alt"
        color="#5eaaa8"
        size={18}
      />
    );

    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        errorMsg = "Permission to access location was denied";
      }
      let nlocation = await Location.getCurrentPositionAsync({});
      location = nlocation;
      let naddress = await Location.reverseGeocodeAsync({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });
      address = naddress;
    } catch (error) {
      console.log(error);
    }

    let longitude = "Waiting..";
    let latitude = "Waiting..";
    let addressinfo = "Waiting..";
    if (errorMsg) {
      longitude = errorMsg;
      latitude = errorMsg;
      addressinfo = errorMsg;
    } else if (address) {
      longitude = JSON.stringify(location.coords.longitude);

      this.setState({
        logradouro: address[0].street,
        numero: address[0].name,
        bairro: "",
        cidade: address[0].city == null ? "" : address[0].city,
        estado: address[0].region,
        cep: address[0].postalCode,
      });
    }
    return //console.log(address);
  };*/

  render() {
   // console.log(this.state.shippingtax)
    const newDelivery = this.state.newDelivery;
    const zero = 0.001;
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
                Checkout - Entrega
                {this.state.logradouro}
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
            flexDirection: "column",
            paddingHorizontal: 10,
          }}
        >{this.state.isLoaded === false ? 
          <View style={{ justifyContent: "center", alignItems: "center", paddingTop:300}}>
            <View>
          <MaterialIndicator
          style={{position:'relative'}}
          trackWidth={10}
          color={"#5eaaa8"}
          size={90}
        />
        <Text>Carregando...</Text>
        </View>
        </View> :
          <View style={{ justifyContent: "space-around" }}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  color: "#a1a1a1",
                  direction: "ltr",
                  padding: 5,
                }}
              >
                Compra Nº:
              </Text>
              <Text style={{ fontSize: 18, padding: 5 }}>
                {this.state.cartid}
              </Text>
            </View>
            <View style={{ justifyContent: "space-around" }}>
              <Text
                style={{
                  fontSize: 12,
                  color: "#a1a1a1",
                  direction: "ltr",
                  padding: 5,
                }}
              >
                Comprador:
              </Text>
              <TextInput
                mode={"outlined"}
                underlineColor={"#5eaaa8"}
                selectionColor={"#5eaaa8"}
                style={{
                  fontSize: 18,
                  backgroundColor: "#fafafa",
                  paddingHorizontal: 5,
                }}
                value={this.state.nome}
                theme={temaInput}
                onChangeText={(text) => this.setState({ nome: text })}
              />
            </View>

            <View>
              <Text
                style={{
                  fontSize: 12,
                  color: "#a1a1a1",
                  direction: "ltr",
                  padding: 5,
                }}
              >
                Endereço de entrega
              </Text>
              <TextInput
                mode={"outlined"}
                underlineColor={"#5eaaa8"}
                selectionColor={"#5eaaa8"}
                label={"Logradouro"}
                value={this.state.logradouro}
                theme={temaInput}
                style={{
                  fontSize: 16,
                  backgroundColor: "#fafafa",
                  paddingHorizontal: 5,
                  width: "100%",
                }}
                onChangeText={(text) => this.setState({ logradouro: text })}
              />
              <View
                style={{ justifyContent: "space-around", flexDirection: "row" }}
              >
                <TextInput
                  mode={"outlined"}
                  underlineColor={"#5eaaa8"}
                  selectionColor={"#5eaaa8"}
                  label={"Ponto de referencia"}
                  value={this.state.referencia}
                  theme={temaInput}
                  style={{
                    fontSize: 16,
                    backgroundColor: "#fafafa",
                    paddingHorizontal: 5,
                    width: "70%",
                  }}
                  onChangeText={(text) => this.setState({ referencia: text })}
                />
                <TextInput
                  mode={"outlined"}
                  underlineColor={"#5eaaa8"}
                  selectionColor={"#5eaaa8"}
                  label={"Numero"}
                  theme={temaInput}
                  value={this.state.numero}
                  style={{
                    fontSize: 16,
                    backgroundColor: "#fafafa",
                    paddingRight: 5,
                    width: "30%",
                  }}
                  onChangeText={(text) => this.setState({ numero: text })}
                />
              </View>
              <View
                style={{ justifyContent: "space-around", flexDirection: "row" }}
              >
                <TextInput
                  mode={"outlined"}
                  underlineColor={"#5eaaa8"}
                  selectionColor={"#5eaaa8"}
                  label={"Bairro"}
                  theme={temaInput}
                  value={this.state.bairro}
                  style={{
                    fontSize: 16,
                    backgroundColor: "#fafafa",
                    paddingHorizontal: 5,
                    width: "60%",
                  }}
                  onChangeText={(text) => this.setState({ bairro: text })}
                />
                <TextInput
                  mode={"outlined"}
                  underlineColor={"#5eaaa8"}
                  selectionColor={"#5eaaa8"}
                  label={"CEP"}
                  theme={temaInput}
                  value={this.state.cep}
                  style={{
                    fontSize: 16,
                    backgroundColor: "#fafafa",
                    paddingRight: 5,
                    width: "40%",
                  }}
                  onChangeText={(text) => this.setState({ cep: text })}
                />
              </View>
              <View
                style={{ justifyContent: "space-around", flexDirection: "row" }}
              >
                <TextInput
                  mode={"outlined"}
                  underlineColor={"#5eaaa8"}
                  selectionColor={"#5eaaa8"}
                  label={"Cidade"}
                  theme={temaInput}
                  value={this.state.cidade}
                  style={{
                    fontSize: 16,
                    backgroundColor: "#fafafa",
                    paddingHorizontal: 5,
                    width: "70%",
                  }}
                  onChangeText={(text) => this.setState({ cidade: text })}
                />
                <DropDownPicker
                  items={[
                    { label: "AC", value: "Acre"},
                    { label: "AL", value: "Alagoas"},
                    { label: "AP", value: "Amapá"},
                    { label: "AM", value: "Amazonas"},
                    { label: "BA", value: "Bahia"},
                    { label: "CE", value: "Ceará"},
                    { label: "DF", value: "Distrito Federal"},
                    { label: "ES", value: "Espírito Santo"},
                    { label: "GO", value: "Goiás"},
                    { label: "MA", value: "Maranhão"},
                    { label: "MT", value: "Mato Grosso"},
                    { label: "MS", value: "Mato Grosso do Sul"},
                    { label: "MG", value: "Minas Gerais"},
                    { label: "PA", value: "Pará" },
                    { label: "PB", value: "Paraíba" },
                    { label: "PR", value: "Paraná" },
                    { label: "PE", value: "Pernambuco" },
                    { label: "PI", value: "Piauí" },
                    { label: "RJ", value: "Rio de Janeiro" },
                    { label: "RN", value: "Rio Grande do Norte" },
                    { label: "RS", value: "Rio Grande do Sul" },
                    { label: "RO", value: "Rondônia" },
                    { label: "RR", value: "Roraima" },
                    { label: "SC", value: "Santa Catarina" },
                    { label: "SP", value: "São Paulo" },
                    { label: "SE", value: "Sergipe" },
                    { label: "TO", value: "Tocantins" },
                  ]}
                  defaultValue={
                    this.state.estado === "" ? "Acre" : this.state.estado
                  }
                  placeholder="Selecione um item"
                  containerStyle={{
                    width: "30%",
                    paddingTop: 6,
                    paddingRight: 5,
                  }}
                  dropDownStyle={{ backgroundColor: "#fafafa" }}
                  style={{
                    fontSize: 16,
                    backgroundColor: "#fafafa",
                    borderColor: "#5eaaa8",
                  }}
                  itemStyle={{
                    justifyContent: "flex-start",
                  }}
                  onChangeItem={(item) =>
                    this.setState({
                      estado: item.value,
                    })
                  }
                />
              </View>
            </View>
            <Text
              style={{
                fontSize: 12,
                color: "#a1a1a1",
                paddingTop: 5,
                paddingHorizontal: 5,
              }}
            >
              Forma de entrega:
            </Text>
            
            <DropDownPicker
                  items={this.state.shippingarray}
                  defaultValue={
                    this.state.shippingmethod
                  }
                  placeholder="Selecione um item"
                  containerStyle={{ 
                    width: "100%",
                    height:60,
                    paddingTop: 6,
                    paddingHorizontal: 5,
                  }}
                  dropDownStyle={{ backgroundColor: "#fafafa" }}
                  style={{
                    fontSize: 16,
                    backgroundColor: "#fafafa",
                    borderColor: "#5eaaa8",
                  }}
                  itemStyle={{
                    justifyContent: "flex-start",
                  }}
                  onChangeItem={item => {
                    this.setState({shippingtax:item.value, shipping:item.label})
                  }
                  }
                />

            <View
              style={{
                backgroundColor: "#fff",
                borderColor: "#5eaaa8",
                borderRadius: 5,
                marginTop: 10,
                borderWidth: 0.5,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "flex-start",
                    paddingTop: 10,
                    paddingLeft: 20,
                  }}
                >
                  <View
                    style={{
                      paddingRight: 20,
                      alignItems: "flex-start",
                    }}
                  >
                    <Text
                      style={{
                        color: "#8f8f8f",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      Produtos:{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        paddingLeft: 20,
                      }}
                    >
                      R${this.state.subtotalPrice}
                    </Text>
                    <Text
                      style={{
                        color: "#8f8f8f",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      Frete:{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        paddingLeft: 20,
                      }}
                    >
                      R${this.state.shippingtax}
                    </Text>

                    <Text
                      style={{
                        color: "#8f8f8f",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      Total:{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        paddingLeft: 20,
                      }}
                    >
                      R$
                      {(
                        this.state.subtotalPrice + this.state.shippingtax).toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: 42,
                  paddingLeft: 20,
                  paddingBottom: 20,
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.centerElement,
                    {
                      backgroundColor: "#0faf9a",
                      width: 150,
                      height: 35,
                      padding: 10,
                      borderRadius: 5,
                    },
                  ]}
                  onPress={() => this.payment()}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Pagamento
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
  }
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

/*
//checked event
<View style={[styles.centerElement, {width: 60}]}>
									<TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => this.selectHandler(i, item.checked)}>
										<Icon name={item.checked == 1 ? "check-square" : "square"} size={25} color={item.checked == 1 ? "#0faf9a" : "#aaaaaa"} />
									</TouchableOpacity>
								</View>
								
								*/
