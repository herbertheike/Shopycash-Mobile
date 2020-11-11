import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, TouchableOpacity,SectionList, ScrollView, Button, KeyboardAvoidingView, SafeAreaView, FlatList, Animated } from 'react-native';
import Carousel from 'react-native-snap-carousel';
class Prod extends React.Component {
    state = {index:0}

    constructor(props){
        super(props);
    }



    
    _renderItem({ item }) {
        return (
          <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>{`Item ${item}`}</Text>
          </View>
        );
      }
      
    render() {

        const [isLoading, setLoading] = useState(true);
        const [data, setData] = useState([]);
        const [data2, setData2] = useState([]);
        const navigation = useNavigation();
        const route = useRoute();
      
        useEffect(() => {
          fetch("http://192.168.15.19:8080/loja/categoria/" + route.params.params.id)
            .then((response) => response.json())
            .then((json) => setData2(json.categorias))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
        }, []);
      
  
        return(
            <ScrollView style={styles.container}>
                <Carousel
                data={data}
                renderItem={this._renderItem}
                sliderWidth={'95%'}
                itemWidth={'auto'}

                />
            </ScrollView>
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
    },
    carouselContainer: {
        marginTop: 50
      },
      itemContainer: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'dodgerblue'
      },
      itemLabel: {
        color: 'white',
        fontSize: 24
      },
      counter: {
        marginTop: 25,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
      }
});

