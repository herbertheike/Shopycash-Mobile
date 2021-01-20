import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Drawer,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome5"
import firebase from "firebase";

export class DrawerContentMenu extends React.Component {
  state = {
    name: "Sem nome",
    email: "",
    photoURL:
      "https://cdn2.iconfinder.com/data/icons/colored-simple-circle-volume-01/128/circle-flat-general-51851bd79-512.png",
  };
  constructor(props) {
    super(props);
  }

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
        this.setState({ email: "ou cadastre-se!" });
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...this.props}>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 15,
                  padding: 10,
                }}
              >
                <Avatar.Image source={{ uri: this.state.photoURL }} size={60} />
                <View style={{ flexDirection: "column", marginLeft: 15 }}>
                  <Title style={styles.title}>{this.state.name}</Title>
                  <Caption style={styles.caption}>{this.state.email}</Caption>
                </View>
              </View>
            </View>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                style={styles.draweritemStyle}
                icon={({ color, size }) => (
                  <Icon name="shopping-bag" color={"#5eaaa8"} size={25} />
                )}
                label="Inicio"
                onPress={() => {
                  this.props.navigation.navigate("home");
                }}
              />

            <DrawerItem
                style={styles.draweritemStyle}
                icon={({ color, size }) => (
                  <Icon name="store" color={"#5eaaa8"} size={25} />
                )}
                label="Shoppings"
                onPress={() => {
                  this.props.navigation.navigate("Shoppings");
                }}
              />

              <DrawerItem
                style={styles.draweritemStyle}
                icon={({ color, size }) => (
                  <Icon name="th-large" color={"#5eaaa8"} size={25}  />
                )}
                label="Categorias"
                onPress={() => {
                  this.props.navigation.navigate("Categorias");
                }}
              />

              <DrawerItem
                style={styles.draweritemStyle}
                icon={({ color, size }) => (
                  <Icon name="chart-bar"  color={"#5eaaa8"} size={25}  />
                )}
                label="Extrato"
                onPress={() => {
                  this.props.navigation.navigate("Extrato");
                }}
              />

              <DrawerItem
                style={styles.draweritemStyle}
                icon={({ color, size }) => (
                  <Icon name="hand-holding-usd"  color={"#5eaaa8"} size={25}  />
                )}
                label="Pagar com ShopyCash"
                onPress={() => {
                  firebase.auth().signOut();
                }}
              />
              <DrawerItem
                style={styles.draweritemStyle}
                icon={({ color, size }) => (
                  <Icon name="users"  color={"#5eaaa8"} size={25}  />
                )}
                label="Convidar amigos"
                onPress={() => {
                  firebase.auth().signOut();
                }}
              />

              <DrawerItem
                style={styles.draweritemStyle}
                icon={({ color, size }) => (
                  <Icon name="shield-alt"  color={"#5eaaa8"} size={25}  />
                )}
                label="Termos de uso"
                onPress={() => {
                  firebase.auth().signOut();
                }}
              />

              <DrawerItem
                style={styles.draweritemStyle}
                icon={({ color, size }) => (
                  <Icon name="exclamation-circle"  color={"#5eaaa8"} size={25}  />
                )}
                label="Ajuda"
                onPress={() => {
                  firebase.auth().signOut();
                }}
              />
            </Drawer.Section>
          </View>
          <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="sign-out-alt"  color={"#5eaaa8"} size={25}  />
              )}
              label="Sair"
              onPress={() => {
                firebase.auth().signOut();
              }}
            />
          </Drawer.Section>
        </DrawerContentScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    marginTop: -5,
    paddingLeft: 15,
    backgroundColor: "#5eaaa8",
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 12,
    lineHeight: 12,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  draweritemStyle: {
    width:'auto',
    paddingHorizontal: 0,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
