import React from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
  Alert,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Header } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { TouchableNativeFeedbackBase } from "react-native";
import firebase from "firebase";

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectAll: false,
      cartItemsIsLoading: false,
      cartItems: [],
      loja: null,
      lojaid: null,
      shopping: null,
      shoppingid: null,
      totalPrice: 0,
      refreshing: false,
      delivery: "",
      jsonarray: [],
      jsonarray2: [],
    };
  }

  componentDidMount = async () => {
    const nome = await AsyncStorage.getItem("nome");
    const user = firebase.auth().currentUser;

    await AsyncStorage.getItem("cartstatus").then((cartstatus) => {
      if (cartstatus === "checkout") {
        this.props.navigation.navigate("Checkout");
      }
    });

    await AsyncStorage.getItem("loja").then((loja) => {
      this.setState({ loja: loja });
      console.log(this.state.loja);
    });
    await AsyncStorage.getItem("lojaid").then((lojaid) => {
      this.setState({ lojaid: lojaid });
      console.log(this.state.lojaid);
    });
    await AsyncStorage.getItem("shopping").then((shopping) => {
      this.setState({ shopping: shopping });
      console.log(this.state.shopping);
    });
    await AsyncStorage.getItem("shoppingid").then((shoppingid) => {
      this.setState({ shoppingid: shoppingid });
      console.log(this.state.shoppingid);
    });

    await AsyncStorage.getItem("cart")
      .then((cart) => {
        if (cart !== null) {
          // We have data!!
          const cartgoods = JSON.parse(cart);
          console.log(cartgoods.length);
          this.setState({ cartItems: cartgoods });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  selectHandler = (index, value) => {
    const newItems = [...this.state.cartItems]; // clone the array
    newItems[index]["checked"] = value == 1 ? 0 : 1; // set the new value
    this.setState({ cartItems: newItems }); // set new state
  };

  selectHandlerAll = (value) => {
    const newItems = [...this.state.cartItems]; // clone the array
    newItems.map((item, index) => {
      newItems[index]["checked"] = value == true ? 0 : 1; // set the new value
    });
    this.setState({
      cartItems: newItems,
      selectAll: value == true ? false : true,
    }); // set new state
  };

  deleteHandler = (index) => {
    Alert.alert(
      "Tem certeza que deseja retirar esse item do carrinho?",
      "",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Deletar",
          onPress: async () => {
            //let updatedCart = this.state.cartItems; /* Clone it first */
            this.state.cartItems.splice(index, 1);
            /* Remove item from the cloned cart state */
            await AsyncStorage.setItem(
              "cart",
              JSON.stringify(this.state.cartItems)
            );
            this.onRefresh();
          },
        },
      ],
      { cancelable: false }
    );
  };

  quantityHandler = (action, index) => {
    const newItems = [...this.state.cartItems]; // clone the array

    let currentQty = newItems[index]["qty"];

    if (action == "more") {
      newItems[index]["qty"] = currentQty + 1;
    } else if (action == "less") {
      newItems[index]["qty"] = currentQty > 1 ? currentQty - 1 : 1;
    }

    this.setState({ cartItems: newItems }); // set new state
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

  wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };
  onRefresh = async () => {
    this.setState({ refreshing: true });
    AsyncStorage.getItem("cart")
      .then((cart) => {
        //console.log(cart)
        if (cart !== null) {
          // We have data!!
          const cartgoods = JSON.parse(cart);
          this.setState({ cartItems: cartgoods });
        }
      })
      .catch((err) => {
        alert(err);
      });
    this.wait(2000).then(() => this.setState({ refreshing: false }));
  };

  repopulate = async () => {
    const newItems = [...this.state.cartItems];
    // console.log(newItems)
    const jsonarray = this.state.jsonarray;
    const jsonarray2 = this.state.jsonarray2;
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
          })
        );
        //console.log(obj)
        const obj2 = JSON.parse(
          JSON.stringify({
            produto: newItems[i].produto,
            produtoid: newItems[i].produtoid,
            qty: newItems[i].qty,
          })
        );
        if (i <= newItems.length) {
          jsonarray.push(obj);
          jsonarray2.push(obj2);
        }
        //console.log(jsonarray)
      } catch (error) {
        console.log("THIS ERROR" + error);
      }
    }
  };
  checkOut = async () => {
    firebase.auth().onAuthStateChanged((user) => {
    if(user){
    const setnome = AsyncStorage.getItem("nome").then((nome) => {
      this.setState({ nome: JSON.parse(nome) });
    });
    const loja = this.state.loja;
    const lojaid = this.state.lojaid;
    const shopping = this.state.shopping;
    const shoppingid = this.state.shoppingid;
    const userId = firebase.auth().currentUser.uid;
    const email = firebase.auth().currentUser.email;
    const nome = this.state.nome;
    console.log(nome);

    const payload = JSON.stringify({
      loja: loja,
      lojaid: lojaid,
      shopping: shopping,
      shoppingid: shoppingid,
      produtos: [...this.state.cartItems],
      dadoscliente: {
        userid: userId,
        nome: nome,
        email: email,
      },
      cartstatus: "checkout",
      datacompra: Date.now(),
      subTotal: this.subtotalPrice(),
    });
    console.log("Payload",payload)
    try {
      this.repopulate();
     fetch("https://api-shopycash1.herokuapp.com/cart/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: payload,
      })
        .then((response) => response.json())
        .then((res) => this.setState({ delivery: res }))
        .catch((error) => console.error(error))
        .finally(() => console.log("delivery ok"), []);
    } catch (error) {
      console.log(error);
    }
    this.state.jsonarray.length = 0;
    console.log("checkout: \n" + JSON.stringify(this.state.delivery));
    if (this.state.delivery.status === "OK") {
      const cartstatus =  AsyncStorage.setItem("cartstatus", "checkout");
      const cartid =  AsyncStorage.setItem(
        "cartid",
        this.state.delivery.InsertID
      );
      console.log("909090");
      this.props.navigation.navigate("Checkout");
    } else {
      Alert.alert(
        "Shopycash Payment",
        "Infelizmente houve um problema com seu carrinho.\nVerique os produtos e tente novamente."
      );
    }
    }else{
      Alert.alert(
        "Aviso",
        "Para continuar realize o login\nOu Cadastre-se!",
        [
          {
            text: "Cancelar",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Logar agora", onPress: () => this.props.navigation.navigate("Cadastro") }
        ]
      );
    }
  });
  };

  render() {
    const styles = StyleSheet.create({
      centerElement: { justifyContent: "center", alignItems: "center" },
    });

    const { cartItems, cartItemsIsLoading, selectAll } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
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
                Carrinho de compras
              </Text>
            ))
          }
          containerStyle={{
            backgroundColor: "#ffffff",
            justifyContent: "space-around",
          }}
        />

        {cartItemsIsLoading ? (
          <View style={[styles.centerElement, { height: 300 }]}>
            <ActivityIndicator size="large" color="#ef5739" />
          </View>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
          >
            {cartItems &&
              cartItems.map((item, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#fff",
                    marginBottom: 2,
                    height: 120,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      flexGrow: 1,
                      flexShrink: 1,
                      alignSelf: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        /*this.props.navigation.navigate('ProductDetails', {productDetails: item})*/
                      }}
                      style={{ padding: 10 }}
                    >
                      <Image
                        source={{ uri: item.imagem }}
                        style={[
                          styles.centerElement,
                          { height: 90, width: 90, backgroundColor: "#eeeeee" },
                        ]}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        flexGrow: 1,
                        flexShrink: 1,
                        alignSelf: "center",
                      }}
                    >
                      <Text numberOfLines={1} style={{ fontSize: 16 }}>
                        {item.produto}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{ color: "#8f8f8f", fontSize: 12 }}
                      >
                        {item.categoria ? "Categoria: " + item.categoria : ""}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: "#333333",
                          marginBottom: 10,
                          fontSize: 15,
                        }}
                      >
                        Preço: R${item.qty * item.unitPrice}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            borderColor: "#cccccc",
                            paddingHorizontal: 1,
                            paddingTop: 2,
                            color: "#bbbbbb",
                            fontSize: 13,
                          }}
                        >
                          Quantidade: {item.qty}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.centerElement, { width: 60 }]}>
                    <TouchableOpacity
                      style={[styles.centerElement, { width: 32, height: 32 }]}
                      onPress={() => this.deleteHandler(i)}
                    >
                      <Icon name="trash-alt" size={30} color="#ee4d2d" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </ScrollView>
        )}

        <View
          style={{
            backgroundColor: "#fff",
            borderTopWidth: 2,
            borderColor: "#f6f6f6",
            paddingVertical: 5,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.centerElement, { width: 60 }]}>
              <View style={[styles.centerElement, { width: 32, height: 32 }]}>
                <Icon name="ticket-alt" size={25} color="#f0ac12" />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                flexGrow: 1,
                flexShrink: 1,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Cupom</Text>
              <View style={{ paddingRight: 18 }}>
                <TextInput
                  style={{
                    paddingHorizontal: 10,
                    backgroundColor: "#f0f0f0",
                    height: 30,
                    borderRadius: 4,
                  }}
                  placeholder="Digite codigo do cupom"
                  value={""}
                  onChangeText={(searchKeyword) => {}}
                />
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "row",
                flexGrow: 1,
                flexShrink: 1,
                justifyContent: "flex-end",
                alignItems: "center",
                paddingTop: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingRight: 20,
                  alignItems: "flex-end",
                }}
              >
                <Text
                  style={{ color: "#8f8f8f", fontSize: 15, fontWeight: "bold" }}
                >
                  SubTotal:{" "}
                </Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  R${this.subtotalPrice().toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              height: 42,
              paddingRight: 20,
              alignItems: "center",
              justifyContent: "flex-end",
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
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
