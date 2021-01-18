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
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Header } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Location from "expo-location";

function GetShoppings(props) {
  const shopid = props.route.params.params.id;
  const shopname = props.route.params.params.nome;
  const latitude = props.route.params.params.latitude;
  const longitude = props.route.params.params.longitude;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const url = "http://localhost:8080/administrativo/shopping";
  const carticon = (
    <Icon
      name="shopping-cart"
      size={25}
      color="#5eaaa8"
      style={{ marginHorizontal: 10 }}
    />
  );
  const backicon = (
    <Icon
      name="arrow-left"
      style={{ marginLeft: 10 }}
      onPress={() => props.navigation.goBack()}
      color="#5eaaa8"
      size={25}
    />
  );
  const staricon = <Icon name="star" size={12} />;
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
    await fetch(
      "https://api-shopycash1.herokuapp.com/indexby/shopping/" + shopid
    )
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

  console.log(latitude);
  return (
    <View style={styles.container}>
      <Header
        statusBarProps={{ barStyle: "light-content" }}
        barStyle="light-content"
        leftComponent={backicon}
        centerComponent={
          ({
            style: {
              color: "#5eaaa8",
              fontWeight: "bold",
              fontSize: 15,
              fontFamily: "Roboto",
            },
          },
          (
            <Text
              style={{ fontWeight: "bold", color: "#53aaa8", fontSize: 13 }}
            >
              Lojas - {shopname}
            </Text>
          ))
        }
        rightComponent={carticon}
        containerStyle={{
          backgroundColor: "#ffffff",
          justifyContent: "space-around",
        }}
      />
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.005,
          }}
        >
          <MapView.Marker
            coordinate={{ latitude: latitude, longitude: longitude }}
            title={shopname}
            description={props.route.params.params.end}
          />
        </MapView>
      </View>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
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
                    params: { id: item._id, logo: item.Logo },
                  })
                }
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    style={{
                      width: 70,
                      height: 70,
                      marginRight: 5,
                      borderRadius: 50,
                      borderWidth: 0.1,
                      borderColor: "#263646",
                    }}
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
                        {staricon} - 4,93 - {item.segmento[0] + " "}
                      </Text>
                      <Text style={styles.lojades}>{item.responsavel}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
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
  map: {
    width: "95%",
    height: 150,
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
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
