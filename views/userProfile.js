import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Header } from "react-native-elements";
import Constants from "expo-constants";
import { Avatar, Title, Caption, TextInput, Button } from "react-native-paper";
import { TouchableNativeFeedbackBase } from "react-native";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import Carousel from "react-native-snap-carousel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "Sem nome",
      email: "",
      endereco: "",
      modalVisible: false,
      photoURL:
        "https://cdn2.iconfinder.com/data/icons/colored-simple-circle-volume-01/128/circle-flat-general-51851bd79-512.png",
    };
  }

  profileDetails = async () => {
    await firebase
      .database()
      .ref("/user/" + facebookProfileData.user.uid)
      .set({
        endereco: this.endereco,
        edit: Date.now(),
      });
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userId = firebase.auth().currentUser.uid;
        firebase
          .database()
          .ref("/user/" + userId)
          .once(
            "value",
            function (snapshot) {
              if (snapshot.val().loginType === "Google") {
                this.setState({ name: snapshot.val().firstName });
                this.setState({ photoURL: snapshot.val().photoURL });
                this.setState({ email: snapshot.val().email });
              }
              if (snapshot.val().loginType === "Facebook") {
                this.setState({ name: snapshot.val().firstName });
                this.setState({ photoURL: snapshot.val().photoURL.data.url });
                this.setState({ email: snapshot.val().email });
              } else {
                this.setState({ email: snapshot.val().email });
              }
            }.bind(this)
          );
      } else {
        this.setState({ name: "Faça seu login" });
        this.setState({ email: "" });
      }
    });
  }

  onChange = (value) => {
    this.setState({ endereco: value });
  };

  render() {
    return (
      <ParallaxScrollView
        backgroundColor="#ffffff"
        contentBackgroundColor="#f6f6f6"
        parallaxHeaderHeight={300}
        renderBackground={() => (
          <Image
            style={{
              width: "100%",
              height: 300,
              paddingHorizontal: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
            rezizeMode="center"
            source={require("../assets/bgprofile.jpg")}
          />
        )}
        renderForeground={() => (
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 50,
              paddingTop: 100,
            }}
          >
            <Avatar.Image
              source={{ uri: this.state.photoURL }}
              size={120}
              style={{}}
            />
            <View
              style={{
                flexDirection: "column",
                marginLeft: 15,
                alignItems: "center",
              }}
            >
              <Title style={styles.title}>{this.state.name}</Title>
              <Caption style={styles.caption}>{this.state.email}</Caption>
            </View>
          </View>
        )}
      >
        <View style={{ height: 500 }}>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                color: "#53aaa8",
                fontSize: 12,
                padding: 10,
              }}
            >
              Nome:
            </Text>
            <Text
              style={{
                fontWeight: "100",
                color: "#53aaa8",
                fontSize: 12,
                padding: 5,
                borderBottomWidth: 1,
              }}
            >
              {this.state.nome}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#53aaa8",
                fontSize: 12,
                padding: 10,
              }}
            >
              Email:
            </Text>
            <Text
              style={{
                fontWeight: "100",
                color: "#53aaa8",
                fontSize: 12,
                padding: 5,
                borderBottomWidth: 1,
              }}
            >
              {this.state.email}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#53aaa8",
                fontSize: 12,
                padding: 10,
              }}
            >
              Endereco:
            </Text>
            <Text
              style={{
                fontWeight: "100",
                color: "#53aaa8",
                fontSize: 12,
                padding: 5,
                borderBottomWidth: 1,
              }}
            >
              {this.state.endereco}
            </Text>
          </View>
          <View>
            <Icon
              name="edit"
              size={30}
              color="#000000"
              onPress={() => {
                this.setState({ modalVisible: true });
              }}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TextInput
                    label="Nome"
                    value={this.state.nome}
                    mode={"outlined"}
                    underlineColor={"#53aaa8"}
                    selectionColor={"#53aaa8"}
                    style={{backgroundColor:'#fff', borderColor: "#53aaa8"}}
                  />
                  <TextInput
                    label="Email"
                    value={this.state.email}
                    mode={"outlined"}
                  />
                  <TextInput
                    label="Endereço"
                    value={this.state.endereco}
                    mode={"outlined"}
                  />
                  <Button
                    icon="pencil"
                    color="#5eaaa8"
                    mode="contained"
                    onPress={() => console.log("Pressed")}
                    style={{padding:10, margin: 10}}
                  >
                    Salvar
                  </Button>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </ParallaxScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
  centeredView: {
    paddingTop: 250,
    justifyContent: "space-around",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 100,
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
    fontSize: 15,
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
    fontSize: 12,
  },
});
