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
      resultcheckout:'',
      produtos:[...this.props.route.params.params.produtos],
      cartid: this.props.route.params.params.cartid,
      subtotalPrice: this.props.route.params.params.subtotal,
      nome: this.props.route.params.params.nome,
      shippingtax: 0,
      logradouro: "",
      referencia: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
      shoppingid: "",
      lojaid: "",
      shippingmethod: "",
      shipping: "",
      totalPrice: 0,
      shippingarray: [
        { label: "Entrega expressa (até 4 horas)", value: 8.90},
        { label: "Entrega convencional (até 1 dia)", value: 5.90},
        { label: "Retirar na Loja", value: 0.001}]
      
    };
  }

  componentDidMount() {
    this.locale();
  }

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
    const nome = this.state.nome;
    const user = firebase.auth().currentUser;
    const cartid = this.state.cartid;
    const subtotal = this.state.subtotalPrice;
    const shippingmethod = this.state.shipping;
    const shippingtax = this.state.shippingtax;
    const logradouro = this.state.logradouro;
    const referencia = this.state.referencia
    const numero = this.state.numero
    const bairro = this.state.bairro
    const cidade = this.state.cidade
    const estado = this.state.estado
    const cep = this.state.cep
    const date = Date.now()
    const newDate = new Date(date);
    const prod = this.state.produtos
    console.log(prod)
    const vencimento = newDate.setDate(30).toLocaleString('pt-BR', { timeZone: 'GMT+3' , timeStyle: "short"})
    await AsyncStorage.getItem('lojaid')
    .then((lojaid)=>{
      this.setState({lojaid:lojaid})
      console.log(this.state.lojaid)
    })
    await AsyncStorage.getItem('shoppingid')
    .then((shoppingid)=>{
      this.setState({shoppingid:shoppingid})
      console.log(this.state.shoppingid)
    })
    
    try {
      await fetch(
        "https://api-shopycash1.herokuapp.com/checkout/" +
          user.uid +
          "/" +
          cartid,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartid: cartid,
            lojaid: this.state.lojaid,
            shoppingid: this.state.shoppingid,
            deliveryadress: [
              {
                logradouro: logradouro,
                referencia: referencia,
                numero: numero,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
                cep: cep,
              },
            ],
            produtos: [...prod],
            userId: user.uid,
            nome: nome,
            shippingmethod: shippingmethod,
            shippingprice: shippingtax, 
            subTotal: subtotal,
            taxes: 0,
            total: (subtotal + shippingtax).toFixed(2),
            datacompra: Date.now(),
            vencimento: vencimento,
          }),
        }
      )
        .then((response) => response.json())
        .then((res) => this.setState({ resultcheckout: res }))
        .catch((error) => console.error(error));
        
        console.log(this.state.resultcheckout);
        this.state.produtos.length = 0;
        prod.length = 0;

        if(this.state.resultcheckout.status === 'payment'){
          const result = this.state.resultcheckout
          const cartstatus = await AsyncStorage.setItem("cartstatus",'payment')
          console.log(result)
          this.props.navigation.navigate("Payment",{
            params:{
              resultcheckout:result.data._id,
              cartid:cartid,
              userId:user.uid,
            }});
        }

    } catch (error) {
      console.log(error);
    }
  };

  //Função  do gps
  locale = async () => {
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
    return console.log(address);
  };

  render() {
    console.log(this.state.shippingtax)
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
        >
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
                      R${this.state.subtotalPrice.toFixed(2)}
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
                      R${this.state.shippingtax.toFixed(2)}
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
