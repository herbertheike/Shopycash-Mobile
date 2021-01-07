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
import Icon from "react-native-vector-icons/FontAwesome";
import { DrawerContentMenu } from "./DrawerContent";
import Categorias from "./getcategorias";
import Extrato from "./extrato";
import * as Location from "expo-location";

const Drawer = createDrawerNavigator();
const ColorCode = [
  "#E5454C",
  "#5653d4",
  "#08a791",
  "#faa33f",
  "#b6644f",
  "#fb3061",
  "#E5454C",
  "#5653d4",
  "#08a791",
  "#faa33f",
  "#b6644f",
  "#fb3061",
  "#E5454C",
  "#5653d4",
  "#08a791",
  "#faa33f",
  "#b6644f",
  "#fb3061",
  "#E5454C",
  "#5653d4",
  "#08a791",
  "#faa33f",
  "#b6644f",
  "#fb3061",
  "#E5454C",
  "#5653d4",
  "#08a791",
  "#faa33f",
];
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
  const carticon = (
    <Icon
      name="shopping-cart"
      size={30}
      color="#25282B"
      style={{ marginHorizontal: 10 }}
    />
  );
  const menuicon = (
    <Icon
      style={{ marginLeft: 10 }}
      onPress={() => props.navigation.toggleDrawer()}
      name="bars"
      color="#25282B"
      size={30}
    />
  );
  const [datal, setDatal] = useState([]);
  const navigation = useNavigation();
  const staricon = <Icon name="star" size={12} />;

   useEffect(async () => {
    await fetch("https://api-shopycash1.herokuapp.com/segmento")
      .then((response) => response.json())
      .then((res) => setData(res))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  console.log(JSON.stringify(data), "segmentos");
  useEffect(async () => {
    await fetch("https://api-shopycash1.herokuapp.com/lojas")
      .then((response) => response.json())
      .then((json) => setDatal(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  const filtered = datal.filter((item) => {
    console.log(item.segmento, "SEGMENTOS FILTERED")
    return item.nomefantasia.match(search) || item.shopping.match(search);
  });
  return (
    <KeyboardAvoidingView style={styles.container}>
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
        }}
        rightComponent={carticon}
        containerStyle={{
          backgroundColor: "#E8E8E8",
          justifyContent: "space-around",
        }}
      />
      <View>
        <Locale />
        <SearchBar
          lightTheme={true}
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
        <View style={{ height: 280, padding: 10 }}>
          <Text style={{ fontWeight: "bold", color: "black", padding: 10 }}>
            Ofertas
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
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  marginHorizontal: 10,
                  alignItems: "center",
                  padding: 7.5,
                }}
                title="Login"
                color="#ffffff"
                onPress={() => alert(item._id)}
              >
                <Image
                  style={{ width: "98%", height: 150, borderRadius: 15 }}
                  source={require('../assets/interiorshopping.jpg')}
                />
                <Text>{item.nome}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{ height: "auto" }}>
          <Text style={{ fontWeight: "bold", color: "black", padding: 10 }}>
            Categorias
          </Text>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              horizontal
              data={data}
              keyExtractor={({ id }, item) => id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 7,
                    backgroundColor: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6),
                    color: "#FFFFFF",
                    marginHorizontal: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 7.5,
                  }}
                  title="Login"
                  color="#ffffff"
                  onPress={() => setSearch(item.nome[0])}
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
              color: "black",
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
                    backgroundColor: "#ffffff",
                    padding: 10,
                  }}
                  title="Login"
                  color="#ffffff"
                  onPress={() =>
                    navigation.navigate("LojaDetail", {
                      params: { id: item._id, logo: item.Logo },
                    })
                  }
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      style={{ width: 60, height: 60, marginRight: 5 }}
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
                          {staricon} - 4,93 - {item.segmento+' '}{" "}
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
      name="map-marker"
      color="#25282B"
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
    console.log(address);
  }

  return (
    <View style={{ alignItems: "center", padding: 10 }}>
      <Text style={{ color: "#839b97", fontSize: 15, textAlign: "center" }}>
        {pinIcon} {addressinfo}
      </Text>
    </View>
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
    </Drawer.Navigator>
  );
}
//Estilo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#e8e8e8",
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