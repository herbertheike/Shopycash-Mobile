import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, TouchableOpacity,SectionList, ScrollView, Button, KeyboardAvoidingView, SafeAreaView, FlatList, Animated } from 'react-native';




class Prod extends React.Component {
    state = {data:[]}
componentDidMount() {
    
}
    render() {
  
        return(
            <View style={styles.container}>
                <Text style={{marginTop:300, justifyContent: 'center'}}>
                    {this.props.route.params.params.idLoja}
                </Text>
                <FlatList
                                style={{ margin: 5 }}
                                data={this.state.data}
                                refreshing={false}
                                keyExtractor={({ key }, idLoja) => key}
                                renderItem={({ item }) => (<View>
                                    <TouchableOpacity style={{
                                        borderRadius: 5,
                                        borderWidth: 0.3,
                                        borderColor: '#565656',
                                        backgroundColor: '#ffffff',
                                        padding: 10,
                                        marginTop: 5,
                                        width: '100%'
                                    }} title="Login" color='#ffffff' onPress={() => navigation.navigate('LojaDetail', { params: { id: item.idLoja, logo: item.logo } })}>
                                        <View style={{ flex: 2, flexDirection: 'row-reverse' }}>
                                            <Image style={{ width: 80, height: 80, padding: 50 }} source={{ uri: item.imagem }} />
                                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                                <Text style={styles.prodtext}>{item.produto}</Text>
                                                <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                                    <Text style={styles.proddesc}>{item.descricao}</Text>
                                                    <Text style={styles.prodpreco}>R${item.preco}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                )}
                            />
            </View>
        )
    }
}
export default Prod;

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
    prodpreco: {
        width: '100%',
        fontSize: 12,
        position: 'relative',
        color: '#b9b9b9'
    },
    proddesc: {
        width: '100%',
        fontSize: 10,
        position: 'relative',
        color: '#b9b9b9'
    },
    prodtext: {
        fontSize: 15,
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

