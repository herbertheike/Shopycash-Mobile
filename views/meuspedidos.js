import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  SafeAreaView,
  BackHandler,
  FlatList,
  ToastAndroid,
  Button
} from "react-native";
import moment from 'moment'
import { Header, AirbnbRating } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from "firebase";
import { MaterialIndicator  } from "react-native-indicators"; 
import 'moment/locale/pt-br';

export default class MeusPedidos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      compraresult:[],
      lojasarray:[],
      datearray:[{
        month: 'Anteriores',
        year: '',
        day:''
        },
        {
          month: moment().format("MMMM"),
          year: moment().format("YYYY"),
          day: moment().format("D")
        }
      ]
      
    }
  }

  componentDidMount= async () => {
    moment.locale('pt-br', null);
    const user = firebase.auth().currentUser;
    const userid = user.uid
    console.log(userid)
      
    await fetch("https://api-shopycash1.herokuapp.com/cart/user/"+userid)
      .then((response) => response.json())
      .then((res) => this.setState({compraresult:res}))
      .catch((error) => console.error(error))
      .finally(() => this.setState({isLoading:false}),[]);
      
  }



  render() {
    const data = this.state.compraresult;
    
    const menuicon = (
      <Icon
        style={{ marginLeft: 10 }}
        onPress={() => this.props.navigation.toggleDrawer()}
        name="bars"
        color="#5eaaa8"
        size={25}
      />
    );
    const extractcolor = ["#rgba(94,170,168, 0.25)", "rgba(234,67,53,0.25)"]
    return (
      
      <SafeAreaView style={styles.container}>
        
        <Header
          statusBarProps={{ barStyle: "light-content" }}
          barStyle="light-content"
          leftComponent={menuicon}
          centerComponent={{
            style: {
              color: "#25282B",
              fontWeight: "bold",
              fontSize: 20,
              fontFamily: "Roboto",
            },
          },<Text style={{ fontWeight: "bold", color: "#53aaa8", fontSize:15}}>
          Meus Pedidos
        </Text>}
          containerStyle={{
            backgroundColor: "#ffffff",
            justifyContent: "space-around",
          }}
        />

        <ScrollView>
        <View style={{ width: "100%", padding: 2, alignItems: "center" }}>
        {this.state.isLoading === true ? <View style={{ justifyContent: "center", alignItems: "center", paddingTop:300}}>
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
        <View>
        <View>
          <Text style={{fontSize:18,textAlign:'justify'}}>Historico</Text>
              <ScrollView>
                {data.map((item)=>{
                  var status = '';
                  var statusicon = '';
                  var statuscolor = '';
                  if(item.cartstatus === "await"){
                    status = 'Em Separação'
                    statusicon = 'store'
                    statuscolor = "#7C83FD"
                  }else if(item.cartstatus === 'onroute'){
                    status = "Enviado"
                    statusicon = 'truck'
                    tatuscolor = "#7FFC93C"
                  }else if(item.cartstatus === 'delivered'){
                    status = 'Entregue'
                    statusicon = 'check-circle'
                    statuscolor = "#00BD56"
                  }else{
                    status = 'Cancelado'
                    statusicon = 'ban'
                    statuscolor = "#DA0037"
                  }
                    return(
                      
                      <View style={{ flexDirection:"column",padding:5, width:'100%'}}>
                        <Text style={{ fontWeight: "bold", color: "#616161", fontSize:12, padding: 10}}>
                          {moment(item.datacompra).format("dddd, DD [de] MMMM [de] YYYY").toUpperCase()}
                          </Text>
                         
                          <View style={{backgroundColor: "#ffffff", borderRadius:10,shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 0,
                          },
                          shadowOpacity: 1,
                          shadowRadius: 0,
                          elevation:4}}>
                             <Pressable
                      onPress={() => {
                        this.props.navigation.navigate("MeusPedidosDetail", {params:{cartid:item._id}})
                      }}
                      style={({ pressed }) => [
                        {
                          backgroundColor: pressed
                            ? 'rgba(94, 170, 168,0.2)'
                            : 'white',borderRadius:10
                        },
                       { borderBottomLeftRadius:10, borderBottomRightRadius:10}

                      ]}
                      >
                        <View style={{ flexDirection:"row", width:'100%',
                              justifyContent:'space-between', alignItems:'flex-start', padding: 15}}>
                              <View style={{flexDirection:"column", width:'100%'}}>
                                <Text style={{fontSize:18, fontWeight: "bold"}}>{item.loja} - {item.shopping}</Text>
                                <Text style={{ fontWeight: "100",fontSize:10, paddingTop:10}}>
                                  <Icon name={statusicon} size={10} color={statuscolor}  style={{paddingRight: 10}}/> - 
                                Pedido Nº:{item._id} - {status}</Text>
                              </View>
                        </View>
                        <View>
                        <Text style={{fontSize:10,textAlign:'justify', paddingLeft:15}}>Produtos</Text>
                          <FlatList
                            style={{ margin: 5, width: '100%'}}
                            data={item.produtos}
                            keyExtractor={({ id }) => id}
                            renderItem={({item, index})=>
                                {
                                  return(
                                <View style={{display: "flex", flexDirection:'row', paddingLeft:5, alignItems:'center', justifyContent:"center"}}>       
                                  <Text style={{fontSize:10,textAlign:'justify'}}>{item.qty}x - </Text> 
                                  <Text numberOfLines={1} style={{width:'85%', fontWeight:'normal', fontSize:10,textAlign:'justify'}}>
                                    {item.produto}
                                  </Text>
                                </View>)}
                                }/>
                              </View>
                              <View style={{flexDirection:"row",width:'100%', padding: 15, justifyContent:'space-between'}}>
                                  <Text>Avaliação</Text>
                                  <AirbnbRating showRating={false} size={16} />
                              </View>

                            </Pressable>
                          </View>
                          
                      </View>
                      
                    )
                })}
              </ScrollView>
        </View>

        </View>
        }
      </View>
        </ScrollView>
        
      </SafeAreaView>
    );
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
    fontSize:12,
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
    fontSize:20,
    fontWeight: "bold",
    paddingVertical: 10
  }
});
