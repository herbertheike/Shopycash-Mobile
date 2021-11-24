import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList
} from "react-native";
import {
  Button
} from "react-native-paper";
import moment from "moment";
import { Header } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import firebase from "firebase";
import { MaterialIndicator } from "react-native-indicators";
import "moment/locale/pt-br";

export default class MeusPedidosRecibo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      cartresult: [],
      lojarray: [],
      datearray: [
        {
          month: "Anteriores",
          year: "",
          day: "",
        },
        {
          month: moment().format("MMMM"),
          year: moment().format("YYYY"),
          day: moment().format("D"),
        },
      ],
    };
  }

  componentDidMount = async () => {
    moment.locale("pt-br", null);
    const cartid = this.props.route.params.params.cartid;
    console.log("CARTID", cartid);

    await fetch("https://api-shopycash1.herokuapp.com/cart/" + cartid)
      .then((response) => response.json())
      .then((res) => this.setState({ cartresult: res }))
      .catch((error) => console.error(error))
      .finally(() => this.setState({ isLoading: false }), []);

    this.storeInfo();
    console.log();
  };

  storeInfo = async () => {
    const lojaid = this.state.cartresult[0].lojaid;
    await fetch("https://api-shopycash1.herokuapp.com/indexstoreby/" + lojaid)
      .then((response) => response.json())
      .then((res) => this.setState({ lojarray: res }))
      .catch((error) => console.error(error))
      .finally(() => this.setState({ isLoading: false }), []);

    console.log(this.state.lojarray);
  };

  render() {
    const backicon = (
      <Icon
        name="arrow-left"
        style={{ marginLeft: 10 }}
        onPress={() => this.props.navigation.goBack()}
        color="#5eaaa8"
        size={25}
      />
    );
    const lojarray = this.state.lojarray;
    const cartresult = this.state.cartresult;

    
    console.log(lojarray);
    return (
      <SafeAreaView style={styles.container}>
        <Header
          statusBarProps={{ barStyle: "light-content" }}
          barStyle="light-content"
          leftComponent={backicon}
          centerComponent={
            ({
              style: {
                color: "#25282B",
                fontWeight: "bold",
                fontSize: 20,
                fontFamily: "Roboto",
              },
            },
            (
              <Text
                style={{ fontWeight: "bold", color: "#53aaa8", fontSize: 15 }}
              >
                Recibo
              </Text>
            ))
          }
          containerStyle={{
            backgroundColor: "#ffffff",
            justifyContent: "space-around",
          }}
        />
        <ScrollView style={{ width: "100%" }}>
          {this.state.isLoading === true ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 300,
              }}
            >
              <View>
                <MaterialIndicator
                  style={{ position: "relative" }}
                  trackWidth={10}
                  color={"#5eaaa8"}
                  size={90}
                />
                <Text>Carregando...</Text>
              </View>
            </View>
          ) : (
            <View>
              {cartresult.map((item)=>{
                  var status = "";
                  var statusicon = "";
                  var statuscolor = "";
                  if (item.cartstatus === "await") {
                    status = "Pedido em Separação";
                    statusicon = "store";
                    statuscolor = "#7C83FD";
                  } else if (item.cartstatus === "onroute") {
                    status = "Pedido Enviado";
                    statusicon = "truck";
                    tatuscolor = "#7FFC93C";
                  } else if (item.cartstatus === "delivered") {
                    status = "Pedido Concluido";
                    statusicon = "check-circle";
                    statuscolor = "#00BD56";
                  } else {
                    status = "Pedido Cancelado";
                    statusicon = "ban";
                    statuscolor = "#DA0037";
                  }
                  return(
                    <View>
                        <View style={{backgroundColor:"rgb(248,162,61)", width:'100%', height:100, flexDirection: "row",alignItems: "flex-start", justifyContent:"space-around"}}>
                          <Text style={{fontSize:28, fontWeight: "bold", padding:40,paddingLeft:15}}>Shopy Cash</Text>
                          <View style={{flexDirection:"column", padding:40,paddingRight:30}}>
                          <Text style={{fontSize:12, fontWeight: "100", textAlign:"right"}}>Total: <Text style={{fontWeight: "bold"}}>R${item.total.toFixed(2)}</Text></Text>
                          <Text style={{fontSize:12, fontWeight: "100", textAlign:"right"}}>{moment(item.datacompra).format("DD [de] MMMM [de] YYYY")}</Text>
                          </View>
                          </View>
                        <View style={{backgroundColor:"rgb(248,162,61)", width:'100%', height:250, borderBottomRightRadius:100, alignItems: "flex-start", justifyContent:"flex-start"}}>
                          <Text style={{fontWeight: "600", fontSize:25, paddingLeft:15, paddingTop:15}}>Obrigado pelo Pedido,</Text>
                          <Text style={{fontWeight: "600", fontSize:25, paddingLeft:15}}>{item.dadoscliente.nome.split(" ", 1)}</Text>
                          <Text style={{fontWeight: "600", fontSize:12, paddingLeft:15, paddingTop:15}}>Aqui está o seu recibo da {item.loja}</Text>
                        </View>
                        <View style={{flexDirection: "row", justifyContent:'space-between' }}>
                        <View style={{backgroundColor:"rgb(248,162,61)", width:'30%', height:80, borderBottomRightRadius:1000}}></View>
                        <Image
                              style={{
                                marginTop:-135,
                                width:220,
                                height: 220,
                                zIndex:2,
                                marginRight:30
                              }}
                              source={require("../assets/flatilu.png")}
                            />
                        </View>
                              <View style={{flexDirection:"row", paddingLeft:15, paddingRight:30,alignItem:"center", justifyContent:"space-between", paddingTop:15}}>
                                <Text style={{fontSize:28, fontWeight: "bold", textAlign:"left"}}>Total</Text>
                                <Text style={{fontSize:28, fontWeight: "bold", textAlign:"left"}}>R${item.total.toFixed(2)}</Text>
                                </View>
                        <FlatList
                            style={{width: '100%', paddingVertical:15}}
                            data={item.produtos}
                            keyExtractor={({ id }) => id}
                            renderItem={({item, index})=>
                                {
                                  return(
                                <View style={{display: "flex", flexDirection:'row', alignItems:'center', margin:3, justifyContent:"space-between", paddingLeft:15}}>       
                                  <Text style={{fontSize:16,textAlign:'justify', backgroundColor:'#e5e5e5', padding: 10}}>{item.qty}</Text> 
                                  <Text numberOfLines={1} style={{width: "60%", fontWeight:'normal', fontSize:16,textAlign:'justify', paddingLeft:20}}>
                                    {item.produto}
                                  </Text>
                                  <Text  style={{textAlign:"right", fontWeight:'normal', fontSize:16, paddingRight:30}}>
                                    R${item.unitPrice.toFixed(2)}
                                  </Text>
                                </View>)}
                                }/>
                                <View style={{borderBottomWidth: 1,borderBottomColor: '#737373',width: 400}}/>
                                <View style={{paddingLeft:15, paddingRight:30, flexDirection:"column"}}>
                                  <View style={{ flexDirection:"row", paddingBottom:15, paddingTop:15, justifyContent:"space-between"}}>
                                    <Text style={{fontWeight: "bold"}}>Sub-Total</Text>
                                    <Text style={{textAlign:"right", fontWeight: "bold"}}>R${item.subTotal.toFixed(2)}</Text>
                                    </View>
                                  <View style={{ flexDirection:"row", paddingBottom:15, justifyContent:"space-between"}}>
                                    <Text>Frete</Text>
                                    <Text style={{textAlign:"right"}}>R${item.shippingprice.toFixed(2)}</Text>
                                    </View>
                                  <View style={{ flexDirection:"row", paddingBottom:15,justifyContent:"space-between"}}>
                                    <Text>Taxas e Impostos</Text>
                                    <Text style={{textAlign:"right"}}>R$0.00</Text>
                                    </View>
                                  <View style={{ flexDirection:"row", paddingBottom:15,justifyContent:"space-between"}}>
                                    <Text>Promoções e Descontos</Text>
                                    <Text style={{textAlign:"right"}}>R$0.00</Text>
                                    </View>
                                  <View style={{flexDirection:"row", paddingBottom:15,justifyContent:"space-between"}}>
                                    <Text>Cupom</Text>
                                    <Text style={{textAlign:"right"}}>R$0.00</Text>
                                    </View>
                                </View>
                          </View>
                  )
              })}
              </View>
          )}
        </ScrollView>
      </SafeAreaView>
    )
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  cashbackdesk: {
    fontSize: 60,
    padding: 15,
    fontWeight: "bold",
  },
  image: {
    width: 250,
    height: 100,
  },
  imageloja: {
    width: 60,
    height: 60,
  },
  ImageStyle: {
    padding: 25,

    margin: 10,
    height: 25,
    width: 25,
    resizeMode: "center",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0,
    borderColor: "#000",
    height: 60,
    borderRadius: 5,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  login: {
    backgroundColor: "#ffffff",
    width: "100%",
    borderRadius: 15,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: -350,
    marginTop: 100,
  },

  logintext: {
    fontWeight: "bold",
    fontSize: 18,
    position: "relative",
    width: 350,
  },
  logindesc: {
    width: 350,
    fontSize: 14,
    position: "relative",
    color: "#999999",
  },
  datetrans: {
    width: "100%",
    fontSize: 16,
    position: "relative",
    color: "#000000",
  },
  lojastext: {
    fontWeight: "100",
    fontSize: 12,
    color: "slategray",
  },
  saldotext: {
    fontWeight: "bold",
    fontSize: 80,
    textAlign: "center",
    color: "#000000",
  },
  money: {
    fontWeight: "bold",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 20,
    color: "green",
  },
  moneyminus: {
    fontWeight: "bold",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 20,
    color: "red",
  },
  botaotext: {
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  tab_bar_options: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 10,
  },
});
