import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
} from "react-native";
import { Header } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import MapView from "react-native-maps";
const AnimatedCustomScrollView = Animated.createAnimatedComponent();

export default function Getloja(props) {
  const lojaparam = props.route.params.params.id;
  const bgimg = props.route.params.params.logo;
  const carticon = (
    <Icon
      name="shopping-cart"
      size={30}
      color="#25282B"
      style={{ marginHorizontal: 10 }}
    />
  );
  const backicon = (
    <Icon
      name="arrow-left"
      style={{ marginLeft: 10 }}
      onPress={() => props.navigation.goBack()}
      color="#25282B"
      size={30}
    />
  );
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const staricon = <Icon name="star" size={12} />;

  useEffect(() => {
    fetch("http://192.168.15.19:8080/shopping/loja/" + lojaparam)
      .then((response) => response.json())
      .then((json) => setData(json.loja))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ParallaxScrollView
      backgroundColor="#E8e8e8"
      contentBackgroundColor="#e8e8e8"
      backgroundScrollSpeed={7}
      parallaxHeaderHeight={200}
      renderStickyHeader={() => (
        <Header
          statusBarProps={{ barStyle: "light-content" }}
          barStyle="light-content"
          leftComponent={backicon}
          centerComponent={{
            text: JSON.stringify(data.loja),
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
            style={{ width: "100%", height: 500, resizeMode: "cover" }}
            source={{ uri: bgimg }}
          />
        </View>
      )}
      renderForeground={() => (
        <View style={{ marginTop: 60 }}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={data}
              keyExtractor={({ id }, idLoja) => id}
              renderItem={({ item }) => (
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 10,
                      borderWidth: 0.5,
                      borderColor: "#565656",
                      backgroundColor: "#ffffff",
                      height: 100,
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                      width: 300,
                      padding: 20,
                    }}
                    title="Login"
                    color="#ffffff"
                    onPress={() => alert(item.loja)}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                      }}
                    >
                      <Text style={styles.lojastext}>
                        {item.loja} - {item.shopping}
                      </Text>
                      <Text style={styles.lojades}>
                        {item.segmento} - 5,0km - $$$$
                      </Text>
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
              )}
            />
          )}
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

  useEffect(() => {
    fetch("http://192.168.15.19:8080/loja/categoria/" + route.params.params.id)
      .then((response) => response.json())
      .then((json) => setData2(json.categorias))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch("http://192.168.15.19:8080/loja/produto/" + route.params.params.id)
      .then((response) => response.json())
      .then((json) => setData(json.Produtos))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View>
      <FlatList
        style={{ margin: 5 }}
        data={data2}
        refreshing={false}
        keyExtractor={({ key }, id) => key}
        renderItem={({ item }) => {
          const datacatidd = item.id;
          console.log(datacatidd);
          return (
            <View style={styles.container}>
              <Text style={{ fontWeight: "bold" }} key={item.id}>
                {item.categoria}
              </Text>
              <View>
                <FlatList
                  style={{ margin: 5 }}
                  data={data}
                  refreshing={true}
                  extraData={datacatidd}
                  keyExtractor={({ key }, id) => key}
                  renderItem={({ item }) => {
                    if (datacatidd == item.idcat) {
                      return (
                        <TouchableOpacity
                          style={{
                            borderRadius: 5,
                            borderWidth: 0.3,
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
                                idLoja: item.idLoja,
                                idProd: item.id,
                                produto: item.produto,
                                descricao: item.descricao,
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
                          <View
                            style={{ flex: 1, flexDirection: "row-reverse" }}
                          >
                            <Image
                              style={{
                                width: 80,
                                height: 80,
                                padding: 50,
                                marginLeft: 10,
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
                              <Text style={styles.prodtext}>
                                {item.produto}
                              </Text>

                              <Text style={styles.proddesc} numberOfLines={2}>
                                {item.descricao}
                              </Text>
                              <Text style={styles.prodpreco}>
                                R${item.preco}
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
    backgroundColor: "#e8e8e8",
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
    fontSize: 9,
    position: "relative",
    color: "#b9b9b9",
  },
  lojastext: {
    fontSize: 10,
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
