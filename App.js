import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Button, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './views/loginview'
import LoginPhone from './views/loginphone'
import NextPhone from './views/nextphone'

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          drawerPosition: 'right',
          drawerType: 'permanent'
        }}>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

