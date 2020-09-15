import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { ActivityIndicator, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Button, KeyboardAvoidingView, SafeAreaView, FlatList, Animated } from 'react-native';
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
const AnimatedCustomScrollView = Animated.createAnimatedComponent()

export default function Getloja(props) {
    const lojaparam = props.route.params.params.id;
    const bgimg = props.route.params.params.logo;
    const carticon = <Icon name='shopping-cart' size={30} color="#25282B" style={{ marginHorizontal: 10 }} />
    const backicon = <Icon name='arrow-left' style={{ marginLeft: 10 }} onPress={() => props.navigation.goBack()} color="#25282B" size={30} />

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const staricon = <Icon name='star' size={12} />
    useEffect(() => {
        fetch('http://192.168.0.103:8080/shopping/loja/' + lojaparam)
            .then((response) => response.json())
            .then((json) => setData(json.loja))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <ParallaxScrollView backgroundColor='#E8e8e8'
            contentBackgroundColor='#e8e8e8'
            backgroundScrollSpeed={7}
            parallaxHeaderHeight={200}
            renderStickyHeader={() => (
                <Header statusBarProps={{ barStyle: 'light-content' }} barStyle='light-content' leftComponent={backicon}
                    centerComponent={{ text: JSON.stringify(data.loja), style: { color: '#25282B', fontWeight: 'bold', fontSize: 20, fontFamily: "Roboto" } }}
                    rightComponent={carticon}
                    containerStyle={{ backgroundColor: '#E8E8E8', justifyContent: 'space-around' }} />
            )}
            stickyHeaderHeight={100}
            fadeOutForeground={true}
            indicatorStyle={'white'}
            renderBackground={() => (
                <View style={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
                    <Image style={{ width: '100%', height: 500, resizeMode: 'cover' }} source={{ uri: bgimg }} />
                </View>)}
            renderForeground={() => (
                <View style={{ marginTop: 60 }}>
                    {isLoading ? <ActivityIndicator /> : (
                        <FlatList
                            data={data}
                            keyExtractor={({ id }, idLoja) => id}
                            renderItem={({ item }) => (
                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity style={{
                                        borderRadius: 10,
                                        borderWidth: 0.5,
                                        borderColor: '#565656',
                                        backgroundColor: '#ffffff',
                                        height: 100,
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        width: 300,
                                        padding: 20,
                                    }} title="Login" color='#ffffff' onPress={() => alert(item.loja)}>
                                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                                            <Text style={styles.lojastext} >{item.loja} - {item.shopping}</Text>
                                            <Text style={styles.lojades}>{item.segmento} - 5,0km - $$$$</Text>

                                        </View>
                                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'space-around', alignContent: 'center', flex: 2 }}>
                                            <Text style={styles.cashbacknumber}>1%</Text>
                                            <Text style={styles.cashbackdesk}>de Volta</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>)}
                        />
                    )}

                </View>)}>
        </ParallaxScrollView>


    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#e8e8e8',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        fontSize: 9,
        position: 'relative',
        color: '#b9b9b9'
    },
    lojastext: {
        fontSize: 10,
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
    cashbacknumber: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#40B29D'
    },
    cashbackdesk: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#40B29D'
    }
});