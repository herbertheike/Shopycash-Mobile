import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  SafeAreaView,
  ToastAndroid
} from "react-native";
import {
  Button
} from "react-native-paper";
import moment from "moment";
import { Header } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import { MaterialIndicator } from "react-native-indicators";
import {Rating } from "react-native-elements";
import "moment/locale/pt-br";

export default class MeusPedidosAvaliar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      comentresult: '',
      cartresult: [],
      lojarray: [],
      caracnumber: 140,
      comentario:'',
      nota:1,
      editable:true,
      disable:false,
      datearray: [
        {
          month: "Anteriores",
          year: "",
          day: "",
        },
        {
          month: moment().format("MMMM"),
          year: moment().format("YYYY"),
          day: moment().format("D"),
        },
      ],
    };
  }

  componentDidMount = async () => {
    moment.locale("pt-br", null);
    const cartid = this.props.route.params.params.cartid;
    console.log("CARTID", cartid);

      await fetch("https://api-shopycash1.herokuapp.com/comentarios/cart/" + cartid)
      .then((response) => response.json())
      .then((res) => this.setState({ comentresult: res }))
      .catch((error) => console.error(error))
      .finally(() => this.setState({ isLoading: false }), []);

        if(this.state.comentresult != ''){
          this.setState({comentario:this.state.comentresult[0].comentario})
          this.setState({nota:this.state.comentresult[0].nota})
          this.setState({editable:false})
          this.setState({disable:true})
          console.log(this.state.comentresult)
        }

      await fetch("https://api-shopycash1.herokuapp.com/cart/" + cartid)
      .then((response) => response.json())
      .then((res) => this.setState({ cartresult: res }))
      .catch((error) => console.error(error))
      .finally(() => this.setState({ isLoading: false }), []);

    this.storeInfo();
    console.log();

  };

  storeInfo = async () => {
    const lojaid = this.state.cartresult[0].lojaid;
    await fetch("https://api-shopycash1.herokuapp.com/indexstoreby/" + lojaid)
      .then((response) => response.json())
      .then((res) => this.setState({ lojarray: res }))
      .catch((error) => console.error(error))
      .finally(() => this.setState({ isLoading: false }), []);

    console.log(this.state.lojarray);
  };

  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }

  comentsend = async () =>{
    const payload = JSON.stringify({
      userid:this.state.cartresult[0].dadoscliente.userid,
      username:this.state.cartresult[0].dadoscliente.nome,
      order:this.state.cartresult[0]._id,
      lojaid: this.state.cartresult[0].lojaid,
      lojanome:this.state.cartresult[0].loja,
      nota:this.state.nota,
      comentario:this.state.comentario,
    })
    console.log(payload)
    const showToastWithGravity = () => {
      ToastAndroid.showWithGravity(
        "Comentario enviado, Obrigado!\nSeu feedback é muito importante.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      ); 
    };
    await fetch(
      "https://api-shopycash1.herokuapp.com/comentarios/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: payload,
      })
      .then((response) => response.json())
      .then((res) => console.log("Result", res))
      .catch((error) => console.error(error));

      showToastWithGravity();
      this.props.navigation.navigate("MeusPedidos")
    }
  render() {
    const backicon = (
      <Icon
        name="arrow-left"
        style={{ marginLeft: 10 }}
        onPress={() => this.props.navigation.goBack()}
        color="#5eaaa8"
        size={25}
      />
    );
    const lojarray = this.state.lojarray;
    const cartresult = this.state.cartresult;
    const comentresult = this.state.comentresult;

    
    console.log(lojarray);
    return (
      <SafeAreaView style={styles.container}>
        <Header
          statusBarProps={{ barStyle: "light-content" }}
          barStyle="light-content"
          leftComponent={backicon}
          centerComponent={
            ({
              style: {
                color: "#25282B",
                fontWeight: "bold",
                fontSize: 20,
                fontFamily: "Roboto",
              },
            },
            (
              <Text
                style={{ fontWeight: "bold", color: "#53aaa8", fontSize: 15 }}
              >
                Avaliar pedido
              </Text>
            ))
          }
          rightComponent={<Text style={{ paddingRight: 10 }}></Text>}
          containerStyle={{
            backgroundColor: "#ffffff",
            justifyContent: "space-around",
          }}
        />
        <ScrollView style={{ width: "100%" }}>
          {this.state.isLoading === true ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 300,
              }}
            >
              <View>
                <MaterialIndicator
                  style={{ position: "relative" }}
                  trackWidth={10}
                  color={"#5eaaa8"}
                  size={90}
                />
                <Text>Carregando...</Text>
              </View>
            </View>
          ) : (
            <View>
              <View style={{alignItems: "center"}}>
                <Image
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius:100,
                    borderWidth:0.8,
                    borderColor: "#dedede"
                  }}
                  source={{ uri: lojarray.logo }}
                />
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontSize: 20,
                    textAlign: "left",
                    fontWeight: "bold",
                    paddingTop: 15,
                    paddingLeft:15
                  }}
                >
                  Como foi seu pedido em {lojarray.nomefantasia}?
                </Text>
              </View>
              <View>
              {cartresult.map((item)=>{
                  var fullcount = 140
                  var countinput = this.state.comentario.length
                  var emptycount = fullcount-countinput
                  
                  
                  return(  
                    <View style={{paddingLeft:15, paddingRight:15}}>
                        <View style={{flexDirection: "column",alignItems: "center"}}>
                        <Text style={{fontSize:12, fontWeight: "100"}}>Data e hora do pedido: 
                          <Text style={{fontSize:12, fontWeight: "300"}}> {moment(item.datacompra).format("DD [de] MMMM [de] YYYY [às] hh:mm")}</Text>
                        </Text>
                        </View>
                        <View style={{padding:15}}>
                        <Text>Comentario:</Text>
                        <TextInput
                        style={{padding: 10,borderColor:"#dedede", borderWidth:0.6, borderRadius:5, textAlignVertical:"top"}}
                        editable={this.state.editable}
                        multiline
                        numberOfLines={4}
                        onChangeText={text => this.setState({comentario:text})}
                        value={this.state.comentario}
                        maxLength={140}
                        />
                        <Text style={{fontSize:12,color:"#808080"}}>{emptycount}</Text>
                        <View style={{padding: 10}}>
                            <Rating
                            reviews={[1,2,3,4,5]}
                            type='star'
                            size={35} 
                            readonly={this.state.disable}
                            startingValue={this.state.nota}
                            onFinishRating={(rating)=>{this.setState({nota:rating})}}
                            />
                              <Button 
                                mode={"contained"} 
                                style={{margin:5}}
                                contentStyle={{backgroundColor:'#53aaa8'}}
                                labelStyle={{color:"white",fontSize: 18, fontWeight:"100"}}
                                disabled={this.state.disable}
                                onPress={() =>this.comentsend()}>
                                  Enviar
                                </Button>
                        </View>
                      </View>
                    </View> 
                  )})}
                
              </View>
            </View> 
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

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
    fontSize: 12,
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
    color: "black",
    textAlign: "center",
  },
  tab_bar_options: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 10,
  },
});
