import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
} from "react-native";
import { Header } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import ParallaxScrollView from "react-native-parallax-scroll-view";
const AnimatedCustomScrollView = Animated.createAnimatedComponent();

export default function Getloja(props) {
  const lojaparam = props.route.params.params.id;
  const bgimg = props.route.params.params.logo;
  const carticon = (
    <Icon
      name="shopping-bag"
      size={25}
      color="#5eaaa8"
      style={{ marginHorizontal: 10 }}
      onPress={() => props.navigation.navigate('Cart')}
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
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const staricon = <Icon name="star" size={12} />;

  useEffect(() => {
    fetch("https://api-shopycash1.herokuapp.com/indexstoreby/" + lojaparam)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  //console.log(props.route.params.params);
  return (
    <ParallaxScrollView
      backgroundColor="#FFFFFF"
      contentBackgroundColor="#FFFFFF"
      backgroundScrollSpeed={7}
      parallaxHeaderHeight={250}
      renderStickyHeader={() => (
        <Header
          statusBarProps={{ barStyle: "light-content" }}
          barStyle="light-content"
          leftComponent={backicon}
          centerComponent={{
            text: data.nomefantasia + " - " + data.shopping,
            style: {
              color: "#5eaaa8",
              fontWeight: "300",
              fontSize: 15,
            },
          }}
          rightComponent={carticon}
          containerStyle={{
            backgroundColor: "#FFFFFF",
            justifyContent: "space-around",
          }}
        />
      )}
      stickyHeaderHeight={100}
      fadeOutForeground={true}
      indicatorStyle={"white"}
      renderBackground={() => (
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 100,
          }}
        >
          <Image
            style={{ width: "100%", height: 500, resizeMode: "cover",opacity:15 }}
            blurRadius={1}
            source={{ uri: data.capa }}
          />
        </View>
      )}
      renderForeground={() => (
        <View style={{ marginTop: 60 }}>
          <View
            style={{ alignItems: "center", padding: 20, paddingVertical: 30 }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 10,
                borderWidth: 0.1,
                borderColor: "#565656",
                backgroundColor: "#ffffff",
                height: 300,
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                width: "auto",
                padding: 30,
                paddingVertical: 50,
              }}
              title="Login"
              color="#ffffff"
              onPress={() => alert(data.nomefantasia)}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <Text style={styles.lojastext}>
                  {data.nomefantasia} - {data.shopping}
                </Text>
                <Text style={styles.lojades}>{data.segmentos + ""}</Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "space-around",
                  alignContent: "center",
                  flex: 2,
                }}
              >
                <Text style={styles.cashbacknumber}>1%</Text>
                <Text style={styles.cashbackdesk}>de Volta</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    >
      <View>
        <ProdCat />
      </View>
    </ParallaxScrollView>
  );
}

function ProdCat() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const shid = route.params.params.shoppingid;

  useEffect(() => {
    fetch(
      "https://api-shopycash1.herokuapp.com/indexcategory/" +
        route.params.params.id
    )
      .then((response) => response.json())
      .then((json) => setData2(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch(
      "https://api-shopycash1.herokuapp.com/indexproductby/" +
        route.params.params.id
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  console.log(shid)
  return (
    <View>
      <Text
                style={{
                  fontWeight: "bold",
                  color: "#53aaa8",
                  padding: 10,
                  fontSize: 15,
                }}
              >
               Mais vendidos!
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
                      shoppingid: route.params.params.shoppingid,
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
      <FlatList
        style={{ margin: 5 }}
        data={data2}
        refreshing={false}
        keyExtractor={({ key }, id) => key}
        renderItem={({ item }) => {
          const datacadnome = item.nome;
          const datacadid = item._id;
          return (
            <View style={styles.container}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#53aaa8",
                  padding: 10,
                  fontSize: 15,
                }}
                key={item._id}
              >
                {item.nome}
              </Text>
              <View>
                <FlatList
                  style={{ margin: 5 }}
                  data={data}
                  refreshing={true}
                  extraData={datacadnome}
                  keyExtractor={({ key }, id) => key}
                  renderItem={({ item }) => {
                    if (datacadid == item.categoriaid) {
                      return (
                        <TouchableOpacity
                          style={{
                            borderRadius: 5,
                            borderWidth: 0.1,
                            borderColor: "#565656",
                            backgroundColor: "#ffffff",
                            padding: 10,
                            marginTop: 5,
                            width: "100%",
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
                                shoppingid: route.params.params.shoppingid,
                              },
                            })
                          }
                        >
                          <View
                            style={{ flex: 1, flexDirection: "row-reverse" }}
                          >
                            <Image
                              style={{
                                width: 80,
                                height: 80,
                                padding: 50,
                                marginLeft: 10,
                                borderRadius: 500,
                                borderWidth: 0.3,
                                Width: 0.1,
                                borderColor: "#a3d2ca",
                              }}
                              source={{ uri: item.imagem }}
                            />
                            <View
                              style={{
                                flexDirection: "column",
                                flex: 1,
                                justifyContent: "space-around",
                              }}
                            >
                              <Text style={styles.prodtext}>{item.nome}</Text>

                              <Text style={styles.proddesc} numberOfLines={2}>
                                {item.desc}
                              </Text>
                              <Text style={styles.prodpreco}>
                                R${item.preco}
                              </Text>
                              <Text
                                style={{
                                  color: "#ffffff",
                                  fontWeight: "100",
                                  fontSize: 10,
                                  textAlign:"center",
                                  backgroundColor: "#34CC95",
                                  borderRadius: 15,
                                  padding: 2,
                                }}
                                
                              >
                                Cashback aproximado disponivel: R${(item.preco*0.01).toFixed(2)}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    }
                  }}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-start",
  },
  mapStyle: {
    width: "100%",
    height: 150,
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
    fontSize: 10,
    position: "relative",
    color: "#b9b9b9",
  },
  lojastext: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
  },
  prodpreco: {
    width: "100%",
    fontSize: 18,
    position: "relative",
    color: "#000000",
  },
  proddesc: {
    width: "100%",
    fontSize: 10,
    position: "relative",
    color: "#b9b9b9",
  },
  prodtext: {
    fontSize: 15,
    fontWeight: "800",
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
  cashbacknumber: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#40B29D",
  },
  cashbackdesk: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#40B29D",
  },
});
