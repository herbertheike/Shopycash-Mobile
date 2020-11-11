import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  FlatList
} from "react-native";
import { Header } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import Carousel from "react-native-snap-carousel"
const AnimatedCustomScrollView = Animated.createAnimatedComponent();

function Prod(props) {
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
  const galery = [props.route.params.params.imagem, props.route.params.params.imagem2]
  console.log(props.route.params.params.produto)
  return (
      
    <ParallaxScrollView
      backgroundColor="#E8e8e8"
      contentBackgroundColor="#ffffff"
      backgroundScrollSpeed={7}
      parallaxHeaderHeight={600}
      renderStickyHeader={() => (
        <Header
          statusBarProps={{ barStyle: "light-content" }}
          barStyle="light-content"
          leftComponent={backicon}
          centerComponent={{
            text: 'DETALHES DO ITEM',
            style: {
              color: "#25282B",
              fontWeight: "bold",
              fontSize: 20,
              fontFamily: "Roboto",
            },
          }}
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
                      <Image style={{height: 600,
                            width:500,
                            paddingHorizontal: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                            }} rezizeMode='cover' blurRadius={10} source={{uri: props.route.params.params.imagem}}/>

      )}

      renderForeground={() => (
          <         View style={{width:'100%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 50, paddingTop: 50}}>
                        <View>
                            <Text style={{fontWeight: "bold",textAlign: "center", padding: 2, fontSize: 15,fontFamily: "Roboto"}}>
                                DETALHES DO ITEM
                            </Text>
                            <View style={{flexDirection: 'row', height:60, alignItems: 'center', justifyContent: 'center',}}>
                            <Text style={styles.shoppingtoast}>
                                {props.route.params.params.shopping}
                            </Text>
                            <Text style={styles.lojatoast}>
                                {props.route.params.params.loja}
                            </Text>
                            <Text style={styles.categoriatoast}>
                                {props.route.params.params.categoria}
                            </Text>
                            </View>
                            <Text style={{fontFamily: "Roboto",fontWeight: "bold",fontSize: 20,textAlign: "center"}}> 
                                {props.route.params.params.produto}      
                            </Text>
                        </View>
                    <Carousel
                        ref={'carousel'}
                        data={galery}
                        layout={'default'}
                        enableSnap={true}
                        loop={true}
                        loopClonesPerSide={5}
                        renderItem={({ item }) => (
                            <View>
                                <Image style={{
                                    width:350,
                                    height:350,
                                    borderRadius:10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    resizeMode: 'cover'}} source={{uri: item}}/>
                                </View>
                        )}
                        sliderWidth={350}
                        itemWidth={350}
                        />
      </View>
      )}
    >
        <View style={{padding: 10, borderTopRightRadius: 20, borderTopLeftRadius:20, opacity: 5, flex: 1, flexDirection: 'row', alignItems: 'flex-start',
        justifyContent: 'space-between',}}>
            <View>
                <Text style={{
                    fontWeight: "bold",
                    fontFamily: "Roboto",
                    fontSize:20,
                    textAlign: "center"}}
                > 
                CÓDIGO 
                </Text>
                <Text style={{
                    fontWeight: "bold",
                    fontFamily: "Roboto",
                    fontSize:15,
                    textAlign: "center",
                color:"#d3d3d3"}}
                > 
                {props.route.params.params.idProd}{props.route.params.params.idLoja}
                </Text>
                </View>
            <View >
                <Text style={{
                    fontWeight: "bold",
                    fontFamily: "Roboto",
                    fontSize:20,
                    textAlign: "center"}}
                > 
                PREÇO
                </Text>
                <Text style={{
                    fontWeight: "bold",
                    fontFamily: "Roboto",
                    fontSize:40,
                    textAlign: "center"}}
                > 
                R${props.route.params.params.preco}
                </Text>
            </View>

        </View>

    </ParallaxScrollView>
  );
}
export default Prod;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#e8e8e8",
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
  shoppingtoast: {
    backgroundColor: "#005500",
    textAlign: "center",
    color: "#ffffff",
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    
  },
  lojatoast: {
    backgroundColor: "#990000",
    textAlign: "center",
    color: "#ffffff",
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    
  },
  categoriatoast: {
    backgroundColor: "#000088",
    textAlign: "center",
    color: "#ffffff",
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    
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
    fontSize: 12,
    position: "relative",
    color: "#b9b9b9",
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
  carouselContainer: {
    marginTop: 50,
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "dodgerblue",
  },
  itemLabel: {
    color: "white",
    fontSize: 24,
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
