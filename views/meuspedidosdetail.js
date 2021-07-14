import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
  Button
} from "react-native";
import moment from 'moment'
import { Header } from "react-native-elements";
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
        <View>
        <View>
          <Text>Lojas onde pediu</Text>
              <ScrollView horizontal>
                {data.map((item)=>{
                    return(
                      <View style={{padding:10, width:100, height: 100,  backgroundColor: "#5eaaa8", margin: 3, alignItems: "center", justifyContent:'center'}}>
                      <Text>{item.loja}</Text>
                      <Text>{item.total}</Text>
                      </View>
                    )
                })}
              </ScrollView>
        </View>
        <View>
          <Text>Ultima compra.</Text>

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
