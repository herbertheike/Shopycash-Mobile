import React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  PermissionsAndroid,
  Dimensions 
} from "react-native";
import {
  TextInput,
} from "react-native-paper";
import "firebase/firestore";
import Icon from "react-native-vector-icons/FontAwesome5";
import MapView from 'react-native-maps';


class CadMap extends React.Component {
  state = {
    latitude:'',
    longitute:''
  };

  componentDidMount (){
  
  }

  render() {

    return (
        <View>
        <MapView
        style={styles.map}
            initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
        />
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  scrollcontainer: {
    width: "100%",
    flexDirection: "column",
    padding: "5%",
    
  },
  form: {
    marginTop: 5,
    justifyContent:'center'
  },
  logo: {
    marginTop: 20,
  },
  input: {
    fontSize: 16,
    borderColor: "#707070",
    paddingBottom: 5,
  },
  button: {
    backgroundColor: "#3A559F",
    height: 44,
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: "center",
    padding: 10,
    borderRadius: 22,
  },
  googleButton: {
    backgroundColor: "#FFFFFF",
    height: 44,
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: "center",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#707070",
  },
});

export default CadMap;
