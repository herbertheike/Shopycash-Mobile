import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, FlatList, RefreshControl, ScrollView, Button } from 'react-native';
import { createDrawerNavigator, DrawerActions, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';




function Categorias(props) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const url = 'http://localhost:8080/administrativo/shopping'
    const carticon = <Icon name='shopping-cart' size={30} color="#25282B" style={{ marginHorizontal: 10 }} />
    const menuicon = <Icon style={{ marginLeft: 10 }} onPress={() => props.navigation.toggleDrawer()} name="bars" color="#25282B" size={30} />
    const ColorCode = ['#E5454C', '#5653d4', '#08a791', '#faa33f', '#b6644f', '#fb3061', '#E5454C', '#5653d4', '#08a791', '#faa33f', '#b6644f', '#fb3061',
        '#E5454C', '#5653d4', '#08a791', '#faa33f', '#b6644f', '#fb3061', '#E5454C', '#5653d4', '#08a791', '#faa33f', '#b6644f', '#fb3061',
        '#E5454C', '#5653d4', '#08a791', '#faa33f'];
    useEffect(() => {
        fetch('http://192.168.0.107:8080/administrativo/segmento/')
            .then((response) => response.json())
            .then((json) => setData(json.Segmentos))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <Header statusBarProps={{ barStyle: 'light-content' }} barStyle='light-content' leftComponent={menuicon}
                centerComponent={{ style: { color: '#25282B', fontWeight: 'bold', fontSize: 20, fontFamily: "Roboto" } }}
                rightComponent={carticon}
                containerStyle={{ backgroundColor: '#E8E8E8', justifyContent: 'space-around' }} />

            <View style={{ width: '100%', padding: 2, alignItems: 'center', }}>
                <Text style={{ fontWeight: "bold", color: "black", padding: 10 }}>
                    Categorias
            </Text>
                {isLoading ? <ActivityIndicator /> : (
                    <FlatList
                        data={data}
                        keyExtractor={({ id }, item) => id}
                        numColumns={3}
                        renderItem={({ item }) => (

                            <TouchableOpacity style={{
                                width: 100,
                                height: 100,
                                borderRadius: 7,
                                backgroundColor: ColorCode[item.idseg - 1],
                                color: '#FFFFFF',
                                marginHorizontal: 10,
                                marginVertical: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 10
                            }} title="Login" color='#ffffff' onPress={() => alert(item.idseg)}>
                                <Text style={styles.botaotext}>{item.nome}</Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>
        </SafeAreaView>
    )
}
export default Categorias;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#e8e8e8',

    },
    cashbackdesk: {
        fontSize: 60,
        padding: 15,
        fontWeight: 'bold',

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
        resizeMode: 'center',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0,
        borderColor: '#000',
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
        backgroundColor: '#ffffff',
        width: '100%',
        borderRadius: 15,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginBottom: -350,
        marginTop: 100
    },

    logintext: {
        fontWeight: 'bold',
        fontSize: 18,
        position: 'relative',
        width: 350
    },
    logindesc: {
        width: 350,
        fontSize: 14,
        position: 'relative',
        color: '#999999'
    },
    lojades: {
        width: '100%',
        fontSize: 14,
        position: 'relative',
        color: '#b9b9b9'
    },
    lojastext: {
        fontWeight: 'bold',
        color: '#000000'
    },
    starloja: {
        fontWeight: 'bold',
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 10,
        color: '#ED9950',
    },
    botaotext: {
        fontWeight: 'bold',
        color: '#FFFFFF'
    }
});