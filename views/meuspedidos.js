import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList
} from "react-native";
import moment from 'moment'
import { Header } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from "firebase";
import { MaterialIndicator  } from "react-native-indicators"; 

class MeusPedidos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      compraresult : [],
      
    }
  }

  componentDidMount= async () => {
    const user = firebase.auth().currentUser;
    const userid = user.uid
    console.log(userid)
      
    await fetch("https://api-shopycash1.herokuapp.com/cart/user/"+userid)
      .then((response) => response.json())
      .then((res) => this.setState({compraresult:res}))
      .catch((error) => console.error(error))
      .finally(() => this.setState({isLoading:false}),[]);

      console.log(this.state.compraresult)
    
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
          Extrato
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
          <FlatList
            data={data}
            keyExtractor={({ id }, item) => id}
            renderItem={({ item }) => {
              let bgcolor = 'white';
              if (item.cartstatus === 'await') {
                bgcolor = '#B3E7FF'
              }
              if (item.cartstatus === 'onroute') {
                bgcolor = '#9EFA79'
              }
              if (item.cartstatus === 'delivered') {
                bgcolor = '#CAD1DE'
              }
              
              return(
              <TouchableOpacity
                style={{
                  borderRadius: 7,
                  color: "black",
                  backgroundColor: bgcolor,
                  marginHorizontal: 10,
                  marginVertical: 10,
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  padding: 5,
                }}
                title="Login"
                color= "black"
                onPress={() => alert(item.cartstatus)}
              >
                <View style={{
                  borderRadius: 7,
                  color: "black",
                  marginHorizontal: 10,
                  marginVertical: 10,
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  padding: 5,
                }}>
                <Text style={styles.botaotext}>Compra nº: {item._id}</Text>
                <Text style={styles.botaotext}>Loja: {item.loja} - {item.shopping}</Text>
                <Text style={styles.botaotext}>Valor: {item.total}</Text>
                <Text style={styles.botaotext}>Forma de pagamento: {item.paymentmethod}</Text>
                <Text style={styles.botaotext}>Data da compra: {moment(item.datacompra).format("D/MM/YYYY [às] H:m:s")}</Text>
                </View>
              </TouchableOpacity>
              )}}
          />
        }
      </View>
        </ScrollView>
        
      </SafeAreaView>
    );
  }
}

class Saldo extends React.Component {
  componentDidMount() {}

  render() {
    const menuicon = (
      <Icon
        style={{ marginLeft: 10 }}
        onPress={() => this.props.navigation.toggleDrawer()}
        name="bars"
        color="#5eaaa8"
        size={25}
      />
    );
    const date = new Date;
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
          },
          <Text style={{ fontWeight: "bold", color: "#53aaa8", fontSize:15}}>
          Saldo
        </Text>}
          containerStyle={{
            backgroundColor: "#ffffff",
            justifyContent: "space-around",
          }}
        />
        <ScrollView>
          <TouchableOpacity
            style={{
              marginVertical: 5,
              borderRadius: 5,
              backgroundColor: "#ffffff",
              alignItems: "center",
              padding: 10,
            }}
            title="Login"
            color="#ffffff"
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.lojastext}>
                  Seu Saldo atual é de:
                </Text>
                <Text style={styles.saldotext}>
                   R$30,00
                </Text>
                <Text style={styles.lojastext}>
                  O vencimento mais proximo é de R$13,00 em Dezembro de 2021
                </Text>
                </View>
              </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default function MyTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator tabBarOptions={{
          activeTintColor: '#5eaaa8',
          inactiveTintColor: 'gray',
          labelStyle: styles.tab_bar_options
        }}>
        <Tab.Screen name="Pedidos" component={MeusPedidos} />
        <Tab.Screen name="Historico" component={Saldo} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

//export default Extrato;

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
