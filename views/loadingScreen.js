import React, { Component } from "react";
import { StyleSheet, View, Image, ImageBackground } from "react-native";
import { BarIndicator } from "react-native-indicators";
import * as firebase from "firebase";
import {Permissions, Notifications} from 'expo'
class LoadingScreen extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("MainPage");
      } else {
        this.props.navigation.navigate("LoginSelect");
      }
    });
  }

  render() {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          backgroundColor: "#ffffff",
        }}
      >
        <Image source={require("../assets/logo.png")} style={styles.image} />
        <BarIndicator
          style={{ position: "relative", marginTop: "-50%" }}
          count={5}
          color={"#4c2e1f"}
          size={60}
          animating={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  imgbg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  
});

export default LoadingScreen;
