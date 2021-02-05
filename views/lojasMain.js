import React, { useEffect, useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { Header, SearchBar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import { DrawerContentMenu } from "./DrawerContent";
import Categorias from "./getcategorias";
import Extrato from "./extrato";
import GetShoppings from "./getshopping";
import GetStoreByMall from "./getlojabyshop"
import PaymentScan from "./PaymentScan"
import InviteView from "./inviteview"
import TermsAndConditions from "./userterms"
import Profile from "./userProfile"
import Cart from "./cart"
import * as Location from "expo-location";


const Drawer = createDrawerNavigator();
//função principal
function HomeScreen(props) {
  const [search, setSearch] = useState();

  function updateSearch(search) {
    setSearch(search);
  }
  //refresh
  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [seg, setSeg] = useState([]);
  const carticon = (
    <Icon
      name="shopping-bag"
      size={25}
      color="#5eaaa8"
      style={{ marginHorizontal: 10 }}
      onPress={() => props.navigation.navigate('Cart')}
    />
  );
  const menuicon = (
    <Icon
      style={{ marginLeft: 10 }}
      onPress={() => props.navigation.toggleDrawer()}
      name="bars"
      color="#5eaaa8"
      size={25}
    />
  );
  const [datal, setDatal] = useState([]);
  const navigation = useNavigation();
  const staricon = <Icon name="star" size={12} />;

  useEffect(async () => {
    await fetch("https://api-shopycash1.herokuapp.com/segmento")
      .then((response) => response.json())
      .then((res) => setSeg(res))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false),[]);
  }, []);
   useEffect(async () => {
    await fetch("https://api-shopycash1.herokuapp.com/indexproduct/enable")
      .then((response) => response.json())
      .then((res) => setData(res))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false),[]);
  }, []);
  useEffect(async () => {
    await fetch("https://api-shopycash1.herokuapp.com/indexstore")
      .then((response) => response.json())
      .then((json) => setDatal(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  const filtered = datal.filter((item) => {
    return item.nomefantasia.match(search) || item.shopping.match(search) || item.segmento[0].match(search);
  });
  console.log(datal)
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
      <Locale />
      <View>
        <SearchBar
          lightTheme={true}
          containerStyle={{backgroundColor: "#ffffff", paddingVertical: 10, borderBottomWidth: 0, borderTopWidth: 0}}
          inputContainerStyle={{backgroundColor: "#ffffff"}}
          inputStyle={{color: "#a3d2ca", fontWeight: "200"}}
          placeholder="Busque por loja ou Shopping"
          onChangeText={updateSearch}
          value={search}
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
            data={data}
            keyExtractor={({ id }, item) => id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  width: 300,
                  borderRadius: 15,
                  borderWidth: 0.1,
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  marginHorizontal: 10,
                  alignItems: "center",
                  padding: 7.5,
                }}
                title="Login"
                color="#ffffff"
                onPress={() =>
                  navigation.navigate("Proddetail", {
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
                  style={{ width: "98%", height: 150, borderRadius: 15, resizeMode: "cover"}}
                  source={{uri:item.imagem}}
                />
                <Text style={styles.ofertastext} numberOfLines={1}>{item.nome}</Text>
                <Text style={styles.lojades}>R${item.preco}</Text>
                <Text style={styles.lojades}> Disponivel em: {item.loja} - {item.shopping}</Text>
                <Text style={{color: "#ffffff", fontWeight: "100", fontSize: 10, backgroundColor: "#34CC95", borderRadius: 15, padding: 2}}>
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
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              horizontal
              data={seg}
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
                  onPress={() => setSearch(item.nome)}
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
          {isLoading ? (
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
                    navigation.navigate("LojaDetail", {
                      params: { id: item._id, logo: item.Logo, shoppingid: item.shopping_id },
                    })
                  }
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      style={{ width: 70, height: 70 , marginRight: 5, borderRadius:50, borderWidth: 0.1,borderColor:'#263646',  }}
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
//Função  do gps
function Locale() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  const pinIcon = (
    <Icon
      style={{ marginLeft: 10 }}
      name="map-marker-alt"
      color="#5eaaa8"
      size={18}
    />
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      let address = await Location.reverseGeocodeAsync({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });
      setAddress(address);
    })();
  }, []);

  let longitude = "Waiting..";
  let latitude = "Waiting..";
  let addressinfo = "Waiting..";
  if (errorMsg) {
    longitude = errorMsg; 
    latitude = errorMsg;
    addressinfo = errorMsg;
  } else if (address) {
    longitude = JSON.stringify(location.coords.longitude);

    address.find((ad) => {
      region = ad.region;
      street = ad.street;
      number = ad.name;
      addressinfo = street + " - " + number + " - " + region;
    });
  }

  return (
      <Text style={{ color: "#a3d2ca", fontSize: 12, textAlign: "center" }}>
        {pinIcon} - {addressinfo}
      </Text>
  );
}

//Drawer 
export default function lojasMain() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContentMenu {...props} />}
    >
      <Drawer.Screen name="home" component={HomeScreen} />
      <Drawer.Screen name="Categorias" component={Categorias} />
      <Drawer.Screen name="Extrato" component={Extrato} />
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