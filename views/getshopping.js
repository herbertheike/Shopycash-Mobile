import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  FlatList,
} from "react-native";
//import {MapView, Marker} from 'react-native-maps';
import { useNavigation } from "@react-navigation/native";
import { Header } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as Location from "expo-location";

function GetShoppings(props) {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const url = "http://localhost:8080/administrativo/shopping";
  const carticon = (
    <Icon
      name="shopping-bag"
      size={25}
      color="#53aaa8"
      style={{ marginHorizontal: 10 }}
    />
  );
  const menuicon = (
    <Icon
      style={{ marginLeft: 10 }}
      onPress={() => props.navigation.toggleDrawer()}
      name="bars"
      color="#53aaa8"
      size={25}
    />
  );
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
  useEffect(async () => {
    await fetch("https://api-shopycash1.herokuapp.com/indexsh")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false), []);
  }, []);
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
  return (
    <View style={styles.container}>
      <Header
        statusBarProps={{ barStyle: "light-content" }}
        barStyle="light-content"
        leftComponent={menuicon}
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
              Shoppings
            </Text>
          ))
        }
        rightComponent={carticon}
        containerStyle={{
          backgroundColor: "#FFFFFF",
          justifyContent: "space-around",
        }}
      />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ width: "100%", padding: 2, alignItems: "center" }}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={data}
              keyExtractor={({ _id }, item) => _id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    width: "100%",
                    borderRadius: 5,
                    backgroundColor:
                      "#" +
                      (0x1000000 + Math.random() * 0xffffff)
                        .toString(16)
                        .substr(1, 6),
                    marginVertical: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                  }}
                  title="shopping"
                  color="#ffffff"
                  onPress={() =>
                    navigation.navigate("GetStoreByMall", {
                      params: {
                        id: item._id,
                        nome: item.nome,
                        latitude: item.latitude,
                        longitude: item.longitude,
                        end: item.endereco,
                      },
                    })
                  }
                >
                  <View>
                    <Text style={styles.lojastext}>{item.nome}</Text>
                    <Text style={styles.lojades}>{item.endereco}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
export default GetShoppings;
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
  lojades: {
    fontSize: 12,
    position: "relative",
    color: "#ffffff",
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
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  map: {
    width: "100%",
    height: 120,
    zIndex: 5,
    borderRadius: 5,
  },
});
