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
import { Avatar, Title, Caption, TextInput, Button } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartid: this.props.route.params.params.cartid,
      subtotalPrice: this.props.route.params.params.subtotal,
      end: this.props.route.params.params.endereco,
      nome: this.props.route.params.params.nome,
      shippingtax: 0,
      shippingmethod: "",
      totalPrice: 0,
      deliveryopt: [
        {
          label: "Delivery Center",
          value: 5.99,
        },
        {
          label: "Retirar na Loja",
          value: 0,
        },
      ],
    };
  }

  componentDidMount() {}

  selectHandler = (index, value) => {
    const newDelivery = [...this.state.deliveryopt]; // clone the array
    newDelivery[index]["checked"] = value == 1 ? 0 : 1; // set the new value
    this.setState({ shippingtax: newDelivery[index].price }); // set new state
  };

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

  repopulate = async () => {
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
  };

  checkOut = async (item) => {
    const nome = this.state.nome;
    const endereco = await AsyncStorage.getItem("endereco");
    const user = firebase.auth().currentUser;
    const cartid = this.state.cartid;
    const subtotal = this.state.subtotalPrice;
    const shippingmethod = this.state.shippingmethod;
    const shippingtax = this.state.shippingtax;
    try {
      this.repopulate();
      //console.log(this.state.jsonarray)
      await fetch(
        "https://api-shopycash1.herokuapp.com/cart/" + user.uid + "/" + cartid,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartid: cartid,
            adress: endereco,
            tipodeenvio: shippingmethod,
            frete: shippingtax,
            userId: user.uid,
            nome: nome,
            subtotal: subtotal,
            impostos: 0,
            total: subtotal + shippingtax,
            datadacompra: Date.now(),
            vencimento: new Date.now(30),
          }),
        }
      )
        .then((response) => response.json())
        .then((res) => this.setState({ checkout: res }))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false), []);
    } catch (error) {
      console.log(error);
    }
    this.state.jsonarray.length = 0;
  };

  render() {
    const styles = StyleSheet.create({
      centerElement: { justifyContent: "center", alignItems: "center" },
    });
    const newDelivery = this.state.newDelivery;
    console.log(this.props.route.params.params);
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          flexDirection: "column",
          paddingHorizontal: 10,
        }}
      >
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
                Checkout
              </Text>
            ))
          }
          containerStyle={{
            backgroundColor: "#ffffff",
            justifyContent: "space-around",
          }}
        />
        <View style={{ justifyContent:"space-around"}}>
        <View>
            <Title>Compra Nº:</Title>
          <Text >{this.state.cartid}</Text>
          </View>
          <View style={{ justifyContent: "space-around" }}>
            <Title>Comprador:</Title>
            <TextInput underlineColor={"#5eaaa8"} selectionColor={"#5eaaa8"}
            style={{fontSize: 12, height:40, backgroundColor:"#fafafa"}}
            value={this.state.nome}
            onChangeText={text=> this.setState({ nome:text })}
            />
          </View>

          <View>
            <Title>Endereço:</Title>
            <TextInput underlineColor={"#5eaaa8"} selectionColor={"#5eaaa8"}
            style={{fontSize: 12, height:40, backgroundColor:"#fafafa"}}>{this.props.route.params.params.end}</TextInput>
          </View>
          <Title>Forma de entrega: {this.state.shippingmethod}</Title>
              <DropDownPicker
                items={[
                  { label: "Delivery Center", value: 5.99 },
                  { label: "Retirar na Loja", value: 0 },
                ]}
                defaultValue={0}
                placeholder="Selecione um item"
                containerStyle={{ height: 40}}
                dropDownStyle={{ backgroundColor: "#ffffff" }}
                style={{ backgroundColor: "#ffffff"}}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                onChangeItem={(item) =>
                  this.setState({
                    shippingtax: item.value,
                    shippingmethod: item.label,
                  })
                }
              />
          <View
            style={{
              backgroundColor: "#fff",
              borderColor: "#5eaaa8",
              borderRadius: 5,
              marginTop: 10,
              borderWidth:0.5
            }}
          >
            <View style={{ flexDirection: "row"}}>
              <View
                style={{
                  flexDirection: "row",
                  flexGrow: 1,
                  flexShrink: 1,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  paddingTop: 10,
                  paddingLeft: 20
                }}
              >
                <View
                  style={{
                    paddingRight: 20,
                    alignItems: "flex-start",
                  }}
                >
                  <Title
                    style={{
                      color: "#8f8f8f",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Produtos:{" "}
                  </Title>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      paddingLeft: 20,
                    }}
                  >
                    R${this.state.subtotalPrice.toFixed(2)}
                  </Text>

                  <Title
                    style={{
                      color: "#8f8f8f",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Frete:{" "}
                  </Title>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      paddingLeft: 20,
                    }}
                  >
                    R${this.state.shippingtax.toFixed(2)}
                  </Text>

                  <Title
                    style={{
                      color: "#8f8f8f",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Total:{" "}
                  </Title>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      paddingLeft: 20,
                    }}
                  >
                    R$
                    {(
                      this.state.subtotalPrice + this.state.shippingtax
                    ).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                height: 42,
                paddingLeft: 20,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={[
                  styles.centerElement,
                  {
                    backgroundColor: "#0faf9a",
                    width: 100,
                    height: 25,
                    borderRadius: 5,
                  },
                ]}
                onPress={() => this.checkOut(cartItems)}
              >
                <Text
                  style={{ color: "#ffffff", fontSize: 12, fontWeight: "bold" }}
                >
                  Pagamento
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
/*
//checked event
<View style={[styles.centerElement, {width: 60}]}>
									<TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => this.selectHandler(i, item.checked)}>
										<Icon name={item.checked == 1 ? "check-square" : "square"} size={25} color={item.checked == 1 ? "#0faf9a" : "#aaaaaa"} />
									</TouchableOpacity>
								</View>
								
								*/
