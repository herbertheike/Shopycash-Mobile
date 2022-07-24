import React, { Component } from "react";
import BackHandler from "react-native"
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Constants from 'expo-constants';
import LoginSelect from "./views/loginview";
import LoginPhone from "./views/loginphone";
import NextPhone from "./views/nextphone";
import LojasMain from "./views/_lojasMain";
import Categorias from "./views/getcategorias";
import LojaDetail from "./views/lojadetail";
import GetRegistro from "./views/getregistro";
import LoadingScreen from "./views/loadingScreen";
import Cadastro from "./views/Cadastro";
import CadMap from "./views/cadastromap"
import Login from "./views/Login";
import Proddetail from "./views/proddetail";
import MeusPedidos from "./views/meuspedidos";
import MeusPedidosDetail from "./views/meuspedidosdetail";
import MeusPedidosRecibo from "./views/meuspedidosrecibo";
import MeusPedidosAjuda from "./views/meuspedidosajuda";
import MeusPedidosAvaliar from "./views/meuspedidosavaliar";
import GetShoppings from "./views/getshopping"
import GetStoreByMall from "./views/getlojabyshop"
import PaymentScan from "./views/PaymentScan"
import InviteView from "./views/inviteview"
import Profile from "./views/userProfile"
import Cart from "./views/cart"
import Checkout from "./views/checkout"
import Payment from "./views/payment"
import { Icon } from "react-native-elements";
import * as firebase from "firebase";
import lojasMain from "./views/lojasMain";

const firebaseConfig = {
  apiKey: "AIzaSyCI_8KYJblO2KFRY6vuwy3qa3rmLcnMhPQ",
  authDomain: "shopycash-19409.firebaseapp.com",
  databaseURL: "https://shopycash-19409.firebaseio.com",
  projectId: "shopycash-19409",
  storageBucket: "shopycash-19409.appspot.com",
  appId: "1:98141338607:android:d26ae530b6bf906cb9d41a",
};

//Navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const MainStack = createStackNavigator();

firebase.initializeApp(firebaseConfig);
class App extends React.Component {
  state = { user: {} };
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({ user: user });
      }
    });
  }

  render() {
    return (
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="Loading Screen">
          <MainStack.Screen
            name="LoadingScreen"
            component={LoadingScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="LoginSelect"
            component={LoginSelect}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="TelefoneLogin"
            component={TelefoneLogin}
            options={{ headerShown: false }}
          />
        <MainStack.Screen
            name="MainPage"
            component={MainPage}
            options={{ headerShown: false }}
    />
          <MainStack.Screen
            name="GetShoppings"
            component={GetShoppings}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="GetStoreByMall"
            component={GetStoreByMall}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="GetCategorias"
            component={GetCategorias}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="LojaDetail"
            component={LojaDetail}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Registro"
            component={GetRegistro}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Cadastro"
            component={Cadastro}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="CadMap"
            component={CadMap}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Proddetail"
            component={Proddetail}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="MeusPedidos"
            component={MeusPedidos}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="MeusPedidosDetail"
            component={MeusPedidosDetail}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="MeusPedidosRecibo"
            component={MeusPedidosRecibo}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="MeusPedidosAjuda"
            component={MeusPedidosAjuda}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="MeusPedidosAvaliar"
            component={MeusPedidosAvaliar}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="PaymentScan"
            component={PaymentScan}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="InviteView"
            component={InviteView}
            options={{ headerShown: false }}
          />
          
          <MainStack.Screen
            name="Cart"
            component={Cart}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Checkout"
            component={Checkout}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Payment"
            component={Payment}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    );
  }
}
function TelefoneLogin() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginPhone"
        component={LoginPhone}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NextPhone"
        component={NextPhone}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function GetCategorias() {
  <Stack.Navigator>
    <Stack.Screen
      name="Categorias"
      component={Categorias}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>;
}

function MainPage({ navigation }) {
  /*return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="LojasMain"
        component={LojasMain}
        initialRouteName="feed"
        drawerType="slide"
        options={{
          headerShown: true,
          headerLeft: () => (
            <Icon
              style={{ marginLeft: 20 }}
              onPress={() => navigation.openDrawer()}
              name="menu"
              color="#e80000"
              size={30}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );*/
  return(<Stack.Navigator>
    <Stack.Screen
      name="LojasMain"
      component={lojasMain}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>)
}

export default App;
