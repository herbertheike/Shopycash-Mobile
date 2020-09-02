import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Button, KeyboardAvoidingView } from 'react-native';
import { createDrawerNavigator, DrawerActions, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import loginview from './loginview'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

function HomeScreen({ navigation }) {
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={() => navigation.navigate('Article')}
          title="Go to notifications"
        />
        <Button
        title="Open Drawer"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      </View>
    );
  }

const Drawer = createDrawerNavigator();

export default function lojasMain() {
    return (

        <Drawer.Navigator initialRouteName="Feed"
        drawerContentOptions={{
            activeTintColor: '#e91e63',
            itemStyle: { marginVertical: 30 },
          }}>
        <Drawer.Screen name="Feed" component={HomeScreen} />
        <Drawer.Screen name="Article" component={loginview} />
      </Drawer.Navigator>
    );
  }