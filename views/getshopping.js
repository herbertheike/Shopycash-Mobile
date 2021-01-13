import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  FlatList
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Header } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

function GetShoppings(props) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const url = "http://localhost:8080/administrativo/shopping";
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
    await fetch("https://api-shopycash1.herokuapp.com/shopping")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false),[]);
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
    <ScrollView style={styles.container}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    >

      <View style={{ width: "100%", padding: 2, alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", color: "black", padding: 10 }}>
          Shoppings
        </Text>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ _id }, item) => _id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  width:'95%',
                  borderRadius: 5,
                  backgroundColor: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6),
                  color: "#FFFFFF",
                  marginVertical: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                }}
                title="shopping"
                color="#ffffff"
                onPress={() => alert(item.shopping.nome)}
              >
                  <View>
                    <Text style={styles.botaotext}>{item.shopping.nome}</Text>
                    <Text styles={styles.botaotext}>{item.shopping.endereco}</Text>
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
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
