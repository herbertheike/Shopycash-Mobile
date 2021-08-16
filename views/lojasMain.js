import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Header, SearchBar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import { DrawerContentMenu } from "./DrawerContent";
import Categorias from "./getcategorias";
import MeusPedidos from "./meuspedidos";
import GetShoppings from "./getshopping";
import GetStoreByMall from "./getlojabyshop"
import PaymentScan from "./PaymentScan"
import InviteView from "./inviteview"
import TermsAndConditions from "./userterms"
import Profile from "./userProfile"
import Cart from "./cart"
import * as Location from "expo-location";
import firebase from "firebase";
const Drawer = createDrawerNavigator();
class HomeScreen extends React.Component{
  constructor(props) {
    super(props);
  }

    state = {
      search: '',
      isLoading:true,
      data:[],
      datal:[],
      seg:[],
      address:'',
      addressformat:''
     };
  
  componentDidMount= async ()=>{

    await fetch("https://api-shopycash1.herokuapp.com/segmento")
      .then((response) => response.json())
      .then((res) => this.setState({seg:res}))
      .catch((error) => console.error(error))
      .finally(() => this.setState({isLoading:false}));
   
    this.indexpropduct();
    this.indexstore();
    this.databaseaddr();
    
  }
  indexstore = async () =>{
    await fetch("https://api-shopycash1.herokuapp.com/indexstore")
      .then((response) => response.json())
      .then((res) => this.setState({datal:res}))
      .catch((error) => console.error(error))
  }

  indexpropduct = async () =>{
    await fetch("https://api-shopycash1.herokuapp.com/indexproduct/enable")
    .then((response) => response.json())
    .then((res) => this.setState({data:res}))
    .catch((error) => console.error(error))
  }

  updateSearch(search) {
    this.setState({search:search});
  }

  //refresh
  refresh(){
    const wait = (timeout) => {
      return new Promise((resolve) => {
        setTimeout(resolve, timeout);
      });
    };
  }

  databaseaddr = async () =>{
       firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const userId = firebase.auth().currentUser.uid;
           await firebase
            .database()
            .ref("/user/" + userId)
            .once(
              "value",
              function (snapshot) {
                  this.setState({address:snapshot.val().address})
                  this.setState({addressformat:this.state.address.street +", "+this.state.address.number+", "+this.state.address.district+", "+this.state.address.city+" - "+this.state.address.state})
                  console.log("Array\n",this.state.address)
                  console.log("Formatado\n",this.state.addressformat)
                }.bind(this)
            )
        } else {
          console.log("Error")
        }
    });
    console.log(this.state.address)
    }

    
 render () {

  const carticon = (
    <Icon
      name="shopping-bag"
      size={25}
      color="#5eaaa8"
      style={{ marginHorizontal: 10 }}
      onPress={() => this.props.navigation.navigate('Cart')}
    />
  );
  const menuicon = (
    <Icon
      style={{ marginLeft: 10 }}
      onPress={() => this.props.navigation.toggleDrawer}
      name="bars"
      color="#5eaaa8"
      size={25}
    />
  );

  const pinIcon = (
    <Icon
      style={{ marginLeft: 10 }}
      name="map-marker-alt"
      color="#5eaaa8"
      size={18}
    />
  );
  
  const staricon = <Icon name="star" size={12} />;


  const refreshing = false;

  
  const onRefresh = (() => {
      refreshing = true;
  
      wait(2000).then(() => refreshing = false);
    }, []);
    const filtered = this.state.datal.filter((item) => {
      return item.nomefantasia.match(this.state.search) || item.shopping.match(this.state.search) || item.segmento[0].match(this.state.search);
    });
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header
        statusBarProps={{ barStyle: "light-content" }}
        barStyle="light-content"
        leftComponent={menuicon}
        centerComponent={{
          style: {
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: 20,
            fontFamily: "Roboto",
          },
        }
      }
        rightComponent={carticon}
        containerStyle={{
          backgroundColor: "#ffffff",
          justifyContent: "space-around",
        }}
      />
        <Text style={{ color: "#a3d2ca", fontSize: 12, textAlign: "center" }}>
          {pinIcon} - {this.state.addressformat}
          </Text>
      <View>
        <SearchBar
          lightTheme={true}
          containerStyle={{backgroundColor: "#ffffff", paddingVertical: 10, borderBottomWidth: 0, borderTopWidth: 0}}
          inputContainerStyle={{backgroundColor: "#ffffff"}}
          inputStyle={{color: "#a3d2ca", fontWeight: "200"}}
          placeholder="Busque por loja ou Shopping"
          onChangeText={() =>this.updateSearch()}
          value={this.state.search}
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      > 
        <View style={{ height: 'auto', padding: 10 }}>
          <Text style={{ fontWeight: "bold", color: "#5eaaa8", padding: 10 }}>
            Principais Ofertas!
          </Text>
          <FlatList
            horizontal
            data={this.state.data}
            keyExtractor={({ id }, item) => id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  width: 300,
                  borderWidth: 0.1,
                  borderRadius: 10,
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  marginHorizontal: 10,
                  alignItems: "center",
                  padding: 7.5,
                }}
                title="Login"
                color="#ffffff"
                onPress={() =>
                  this.props.navigation.navigate("Proddetail", {
                    params: {
                      idloja: item.loja_id,
                      idprod: item._id,
                      nome: item.nome,
                      desc: item.desc,
                      preco: item.preco,
                      loja: item.loja,
                      shopping: item.shopping,
                      categoria: item.categoria,
                      ativo: item.ativo,
                      imagem: item.imagem,
                      imagem2: item.imagem2,
                    },
                  })
                }
              >
                <Image
                  style={{ width: "98%", height: 150,borderRadius: 10, resizeMode: "cover"}}
                  source={{uri:item.imagem}}
                />
                <Text style={styles.ofertastext} numberOfLines={1}>{item.nome}</Text>
                <Text style={styles.lojades}>R${item.preco}</Text>
                <Text style={styles.lojades}> Disponivel em: {item.loja} - {item.shopping}</Text>
                <Text style={{color: "#ffffff", fontWeight: "100", fontSize: 10, backgroundColor: "#34CC95", padding: 2}}>
                  Cashback disponivel: 1%
                  </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{ height: "auto", padding: 10 }}>
          <Text style={{ fontWeight: "bold", color: "#5eaaa8", padding: 10 }}>
            Categorias
          </Text>
          {this.state.isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              horizontal
              data={this.state.seg}
              keyExtractor={({ id }, item) => id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 7,
                    backgroundColor: item.color,
                    color: "#FFFFFF",
                    marginHorizontal: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 7.5,
                  }}
                  title="Login"
                  color="#ffffff"
                  onPress={() => this.setState({search:item.nome})}
                >
                  <Text style={styles.botaotext}>{item.nome}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
        <View style={{ margin: 10 }}>
          <Text
            style={{
              fontWeight: "bold",
              color: "#5eaaa8",
              padding: 8,
              textAlign: "justify",
            }}
          >
            Lojas
          </Text>
          {this.state.isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={filtered}
              keyExtractor={({ id }, idloja) => id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    marginVertical: 5,
                    borderRadius: 5,
                    padding: 10,
                  }}
                  title="Login"
                  color="#ffffff"
                  onPress={() =>
                    this.props.navigation.navigate("LojaDetail", {
                      params: { id: item._id, logo: item.Logo, shoppingid: item.shopping_id },
                    })
                  }
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      style={{ width: 70, height: 70 , marginRight: 5, borderWidth: 0.1,borderColor:'#263646',  }}
                      source={{ uri: item.Logo }}
                    />
                    <View style={{ flexDirection: "column" }}>
                      <Text style={styles.lojastext}>
                        {item.nomefantasia} - {item.shopping}
                      </Text>
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={styles.starloja}>
                          {staricon} - 4,93 - {item.segmento[0]+' '}
                        </Text>
                        <Text style={styles.lojades}>{item.responsavel}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
}

export default function lojasMain() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContentMenu {...props} />}
    >
      <Drawer.Screen name="home" component={HomeScreen} />
      <Drawer.Screen name="Categorias" component={Categorias} />
      <Drawer.Screen name="MeusPedidos" component={MeusPedidos} />
      <Drawer.Screen name="Shoppings" component={GetShoppings} />
      <Drawer.Screen name="StorebyMall" component={GetStoreByMall}/>
      <Drawer.Screen name="PaymentScan" component={PaymentScan}/>
      <Drawer.Screen name="InviteView" component={InviteView}/>
      <Drawer.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Drawer.Screen name="Cart" component={Cart}/>
      <Drawer.Screen name="Profile" component={Profile}/>
    </Drawer.Navigator>
  );
}


//Estilo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: "95%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    resizeMode:'contain',
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
  lojades: {
    width: "100%",
    fontSize: 14,
    position: "relative",
    color: "#b9b9b9",
  },
  lojastext: {
    fontWeight: "bold",
    color: "#000000",
  },
  ofertastext: {
    fontWeight: "300",
    fontSize:15,
    color: "#000000",
  },
  starloja: {
    fontWeight: "bold",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 10,
    color: "#ED9950",
  },
  botaotext: {
    fontWeight: "100",
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 12
  },
});