import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { Header } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
class Extrato extends React.Component {
  componentDidMount() {}

  render() {
    const menuicon = (
      <Icon
        style={{ marginLeft: 10 }}
        onPress={() => this.props.navigation.toggleDrawer()}
        name="bars"
        color="#25282B"
        size={30}
      />
    );
    return (
      <SafeAreaView style={styles.container}>
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
          containerStyle={{
            backgroundColor: "#E8E8E8",
            justifyContent: "space-around",
          }}
        />
        <ScrollView>
          <TouchableOpacity
            style={{
              marginVertical: 5,
              borderRadius: 5,
              backgroundColor: "#ffffff",
              padding: 10,
            }}
            title="Login"
            color="#ffffff"
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.lojastext}></Text>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.starloja}></Text>
                  <Text style={styles.lojades}></Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginVertical: 5,
              borderRadius: 5,
              backgroundColor: "#ffffff",
              padding: 10,
            }}
            title="Login"
            color="#ffffff"
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.lojastext}></Text>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.starloja}></Text>
                  <Text style={styles.lojades}></Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginVertical: 5,
              borderRadius: 5,
              backgroundColor: "#ffffff",
              padding: 10,
            }}
            title="Login"
            color="#ffffff"
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.lojastext}></Text>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.starloja}></Text>
                  <Text style={styles.lojades}></Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginVertical: 5,
              borderRadius: 5,
              backgroundColor: "#ffffff",
              padding: 10,
            }}
            title="Login"
            color="#ffffff"
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.lojastext}></Text>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.starloja}></Text>
                  <Text style={styles.lojades}></Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default Extrato;

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
    textAlign: "center",
  },
});
