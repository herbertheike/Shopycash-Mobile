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
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tabnavigator from './TabContent'

class Extrato extends React.Component {
  componentDidMount() {}


  render() {
    const menuicon = (
      <Icon
        style={{ marginLeft: 10 }}
        onPress={() => this.props.navigation.toggleDrawer()}
        name="bars"
        color="#5eaaa8"
        size={25}
      />
    );
    const extractcolor = ["#rgba(94,170,168, 0.25)", "rgba(234,67,53,0.25)"]
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
          },<Text style={{ fontWeight: "bold", color: "#53aaa8", fontSize:15}}>
          Extrato
        </Text>}
          containerStyle={{
            backgroundColor: "#ffffff",
            justifyContent: "space-around",
          }}
        />

        <ScrollView>
          <View>
            <Text style={{ fontWeight: "bold", color: "#53aaa8", fontSize:15, padding: 10}}>Janeiro de 2021</Text>
          <TouchableOpacity
            style={{
              marginVertical: 5,
              borderRadius: 5,
              backgroundColor: extractcolor[0],
              padding: 10,
            }}
            title="Login"
            color="#ffffff"
          >
            <View style={{ flexDirection: "row", justifyContent: 'space-around'}}>
              <View style={{ flexDirection: "column" }}>
              <Text style={styles.datetrans}>20 de janeiro de 2021</Text>
                <Text style={styles.lojastext}>Leitura - Shopping Patio Paulista</Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: 'flex-start',
                  }}
                >
                  <Text style={styles.money}>+R$0,50</Text>
                </View>
              </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginVertical: 5,
              borderRadius: 5,
              backgroundColor: extractcolor[1],
              padding: 10,
            }}
            title="Login"
            color="#ffffff"
          >
            <View style={{ flexDirection: "row", justifyContent: 'space-around'}}>
              <View style={{ flexDirection: "column" }}>
              <Text style={styles.datetrans}>19 de janeiro de 2021</Text>
                <Text style={styles.lojastext}>Artex - Shopping Patio Paulista</Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: 'flex-start',
                  }}
                >
                  <Text style={styles.moneyminus}>-R$50,00</Text>
                </View>
              </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginVertical: 5,
              borderRadius: 5,
              backgroundColor: extractcolor[0],
              padding: 10,
            }}
            title="Login"
            color="#ffffff"
          >
            <View style={{ flexDirection: "row", justifyContent: 'space-around'}}>
              <View style={{ flexDirection: "column" }}>
              <Text style={styles.datetrans}>18 de janeiro de 2021</Text>
                <Text style={styles.lojastext}>Americanas - Shopping D</Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: 'flex-start',
                  }}
                >
                  <Text style={styles.money}>+R$1,50</Text>
                </View>
              </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginVertical: 5,
              borderRadius: 5,
              backgroundColor: extractcolor[0],
              padding: 10,
            }}
            title="Login"
            color="#ffffff"
          >
            <View style={{ flexDirection: "row", justifyContent: 'space-around'}}>
              <View style={{ flexDirection: "column" }}>
              <Text style={styles.datetrans}>18 de janeiro de 2021</Text>
                <Text style={styles.lojastext}>VIVARA - Shopping D</Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: 'flex-start',
                  }}
                >
                  <Text style={styles.money}>+R$15,00</Text>
                </View>
              </View>
          </TouchableOpacity>
          </View>

          <View>
            <Text style={{ fontWeight: "bold", color: "#53aaa8", fontSize:15, padding: 10}}>Dezembro de 2020</Text>
          <TouchableOpacity
            style={{
              marginVertical: 5,
              borderRadius: 5,
              backgroundColor: extractcolor[0],
              padding: 10,
            }}
            title="Login"
            color="#ffffff"
          >
            <View style={{ flexDirection: "row", justifyContent: 'space-around'}}>
              <View style={{ flexDirection: "column" }}>
              <Text style={styles.datetrans}>12 de dezembro de 2020</Text>
                <Text style={styles.lojastext}>Swarovski - Center Norte</Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: 'flex-start',
                  }}
                >
                  <Text style={styles.money}>+R$8,00</Text>
                </View>
              </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginVertical: 5,
              borderRadius: 5,
              backgroundColor: extractcolor[0],
              padding: 10,
            }}
            title="Login"
            color="#ffffff"
          >
            <View style={{ flexDirection: "row", justifyContent: 'space-around'}}>
              <View style={{ flexDirection: "column" }}>
              <Text style={styles.datetrans}>08 de dezembro de 2020</Text>
                <Text style={styles.lojastext}>Leitura - Shopping Patio Paulista</Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: 'flex-start',
                  }}
                >
                  <Text style={styles.money}>+R$5,00</Text>
                </View>
              </View>
          </TouchableOpacity>
</View>
        </ScrollView>
        
      </SafeAreaView>
    );
  }
}

class Saldo extends React.Component {
  componentDidMount() {}

  render() {
    const menuicon = (
      <Icon
        style={{ marginLeft: 10 }}
        onPress={() => this.props.navigation.toggleDrawer()}
        name="bars"
        color="#5eaaa8"
        size={25}
      />
    );
    const date = new Date;
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
          },
          <Text style={{ fontWeight: "bold", color: "#53aaa8", fontSize:15}}>
          Saldo
        </Text>}
          containerStyle={{
            backgroundColor: "#ffffff",
            justifyContent: "space-around",
          }}
        />
        <ScrollView>
          <TouchableOpacity
            style={{
              marginVertical: 5,
              borderRadius: 5,
              backgroundColor: "#ffffff",
              alignItems: "center",
              padding: 10,
            }}
            title="Login"
            color="#ffffff"
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.lojastext}>
                  Seu Saldo atual é de:
                </Text>
                <Text style={styles.saldotext}>
                   R$30,00
                </Text>
                <Text style={styles.lojastext}>
                  O vencimento mais proximo é de R$13,00 em Dezembro de 2021
                </Text>
                </View>
              </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default function MyTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator tabBarOptions={{
          activeTintColor: '#5eaaa8',
          inactiveTintColor: 'gray',
          labelStyle: styles.tab_bar_options
        }}>
        <Tab.Screen name="Extrato" component={Extrato} />
        <Tab.Screen name="Saldo" component={Saldo} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

//export default Extrato;

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
  datetrans: {
    width: "100%",
    fontSize: 16,
    position: "relative",
    color: "#000000",
  },
  lojastext: {
    fontWeight: "100",
    fontSize:12,
    color: "slategray",
  },
  saldotext: {
    fontWeight: "bold",
    fontSize: 80,
    textAlign: "center",
    color: "#000000",
  },
  money: {
    fontWeight: "bold",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 20,
    color: "green",
  },
  moneyminus: {
    fontWeight: "bold",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 20,
    color: "red",
  },
  botaotext: {
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  tab_bar_options: {
    fontSize:20,
    fontWeight: "bold",
    paddingVertical: 10
  }
});
