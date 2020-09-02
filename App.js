import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Button, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './views/loginview'
import LoginPhone from './views/loginphone'
import NextPhone from './views/nextphone'
import lojasMain from './views/lojasMain'
import { Icon } from 'react-native-elements'


function Drawer({ navigation}){
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          drawerPosition: 'right',
          drawerType: 'permanent',
          headerLeft: () =>(
            <Button
                title="q"  
                style={{ paddingLeft: 20 }}  
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                name="menu"
                color="#e80000"  
                size={30}/>
          )}}>
        <Stack.Screen
          name={'login'}
          component={Login}
        />
        <Stack.Screen
          name={'LoginPhone'}
          component={LoginPhone} />
        <Stack.Screen
          name={'nextphone'}
          component={NextPhone} />
          <Stack.Screen
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
          
      </Stack.Navigator>
    </NavigationContainer>
  );

}

export default function App() {
  return(
    <Drawer />
  )
  
}

