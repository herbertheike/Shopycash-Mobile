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
          backgroundColor: "#ffffff",
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
          <Text style={{textAlign:'center', padding: 10, fontSize:25}}>
              Termos e condições de uso
          </Text>
          <ScrollView style={{padding: 10}}>
          <Text style={{textAlign:'justify'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vestibulum sagittis mi, in bibendum nunc posuere non. Nunc pellentesque augue vel dui fringilla luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae mi nibh. Vestibulum sed quam ultricies, auctor felis id, hendrerit orci. Maecenas eu nibh eu felis convallis congue in ut mauris. Nunc efficitur justo lorem, id semper tellus dignissim pellentesque. Duis tincidunt sollicitudin lectus ut convallis. Nunc sodales pulvinar ante id sodales. Nulla laoreet vulputate odio, eleifend blandit mauris vulputate in. Aenean commodo massa neque, ut tincidunt quam maximus ut. Aliquam nec libero et tortor finibus luctus et ac lorem. Morbi sit amet leo nec mauris commodo condimentum sed quis mauris.
            
            Aliquam sapien justo, lacinia eu bibendum et, placerat eget mi. Integer vel quam eu lorem consequat mollis. Morbi eget nunc efficitur, luctus nisi a, ullamcorper felis. Aenean in erat nisl. Nulla quis vehicula tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc tincidunt arcu lorem, sit amet cursus massa commodo ac. Fusce a tellus sit amet nisl tristique sagittis ac nec metus. Vestibulum dapibus, turpis et molestie pretium, ante enim consectetur neque, in tincidunt diam velit et nibh. Donec pretium, lacus eu porttitor fermentum, enim massa dapibus ipsum, a vulputate ex eros eget turpis. Nulla quis imperdiet lorem, in tristique nisl. Morbi vehicula, elit vel dapibus venenatis, eros felis ullamcorper velit, ut gravida dolor ante vitae nulla. Ut sagittis metus semper feugiat feugiat. Fusce sodales sem ipsum, a placerat odio viverra quis. Ut nisi ante, dictum sed elit in, placerat consectetur lacus.
          </Text>
          </ScrollView>
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
