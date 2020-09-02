import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer'
import Login from './views/loginview'
import LoginPhone from './views/loginphone'
import NextPhone from './views/nextphone'
import LojasMain from './views/lojasMain'
import { Icon } from 'react-native-elements'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const MainStack = createStackNavigator();


export default function App ({navigation}){
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Home">
        <MainStack.Screen name="Home" component={HomeScreen} options ={{headerShown:false}}/>
        <MainStack.Screen name="TelefoneLogin" component={TelefoneLogin} options ={{headerShown:false}}/>
        <MainStack.Screen name="MainPage" component={MainPage} options ={{headerShown:true}} />
      </MainStack.Navigator>
    </NavigationContainer>
  )
        }

function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={Login} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}
function TelefoneLogin(){
  return (
  <Stack.Navigator>
      <Stack.Screen name="LoginPhone" component={LoginPhone} options={{headerShown:false}}/>
        <Stack.Screen name="NextPhone" component={NextPhone} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

function FacebookLogin(){
    <Stack.Navigator>
      <Stack.Screen name="login" component={Login} options={{headerShown:false}}/>
    </Stack.Navigator>
}

function GoogleLogin(){
  <Stack.Navigator>
    <Stack.Screen name="login" component={Login} options={{headerShown:false}}/>
  </Stack.Navigator>
}

function NoLogin(){
  <Stack.Navigator>
      <Stack.Screen name="login" component={Login} options={{headerShown:false}}/>
  </Stack.Navigator>
}

function MainPage({navigation}){
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="LojasMain" component={LojasMain}/>
    </Drawer.Navigator>
  )
}








/*const LoginStack = createStackNavigator();

const LoginMenu = ({navigation}) =>(
    <LoginStack.Navigator 
    screenOptions={{
      headerShown: false}}>
    <LoginStack.Screen
      name={'login'}
      component={Login}
      screenOptions={{
        headerShown: false}}
    />      
  </LoginStack.Navigator>
)
const LojasMain = ({navigation}) =>(
  <LojasMain.Navigator screenOptions={{headerShown: false,headerLeft: () =>(
        <Icon style={{ paddingLeft: 20 }}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        name="menu" color="#e80000" size={30}
        />
      )
    }}
  >
        <LojasMain.Screen
           name={'lojasMain'}
              component={lojasMain}
              />      
      </LojasMain.Navigator>
)



const App = () => {
  const Stack = createStackNavigator();
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' >
        <Stack.Screen name={'login'} component={LoginMenu}/>
        <Stack.Screen name={'LoginPhone'} component={LoginPhone} />
        <Stack.Screen name={'nextphone'} component={NextPhone} />
        <Stack.Screen name={'lojasmain'} component={LojasMain} />
      </Stack.Navigator>
    </NavigationContainer>
  )
  
}
export default App;

/*
<LoginStack.Screen
      name={'LoginPhone'}
      component={LoginPhone} />
    <LoginStack.Screen
      name={'nextphone'}
      component={NextPhone} />
      <LoginStack.Screen
        name={'lojasMain'}
        component={lojasMain}
        
        options={{
          headerShown:true,
          //headerLeft:MenuIcon,
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="!"
              color="#E80033"
            />
          ),
        }}
      />
*/