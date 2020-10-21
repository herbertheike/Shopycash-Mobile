import React from 'react';
import { Alert, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Button, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";

export default function NextPhone({navigation, route}) {

    const phonenumber = route.params.phonenumber;
    

    const recaptchaVerifier = React.useRef(null);
    const [phoneNumber, setPhoneNumber] = React.useState();
    const verificationId = route.params.verificationId;
    const [verificationCode, setVerificationCode] = React.useState();
    const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
    const [message, showMessage] = React.useState((!firebaseConfig || Platform.OS === 'web')
      ? { text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device."}
      : undefined);

    return (
        <KeyboardAvoidingView style={styles.container}>
            <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
            <Text style={styles.logintext}>
                Código de verificação
            </Text>
            <Text style={styles.smalltext}>
                O codigo de verificação foi enviado para:
                </Text>
            <Text style={styles.smalltext}>
                {JSON.stringify(phonenumber)}
            </Text>
            <TextInput
                style={styles.number}
                keyboardType='phone-pad'
                textAlign={'center'}
                onChangeText={setVerificationCode}>
            </TextInput>
            <TouchableOpacity style={styles.botao}
                title="Login"
                color='#ffffff'
                onPress={async () => {
                    try {
                      const credential = firebase.auth.PhoneAuthProvider.credential(
                        verificationId,
                        verificationCode
                      );
                      await firebase.auth().signInWithCredential(credential);
                      Alert.alert(
                        'Shopycash',
                        'Autenticado com sucesso',
                        [
                          { text: 'OK'}
                        ],
                        { cancelable: false }
                      );
                      navigation.navigate('Registro')
                    } catch (err) {
                     alert(`Error: ${err.message}`);
                    }
                  }}>
                <Text style={styles.botaotext}>Avançar</Text>
            </TouchableOpacity>
            {message ? (
        <TouchableOpacity
          style={[StyleSheet.absoluteFill, { backgroundColor: 0xffffffee, justifyContent: "center" }]}
          onPress={() => showMessage(undefined)}>
          <Text style={{color: message.color || "black", fontSize: 17, textAlign: "center", margin: 20, }}>
            {message.text}
          </Text>
        </TouchableOpacity>
      ) : undefined}
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8e8e8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    number: {
        width: '50%',
        height: 60,
        borderColor: 'black',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 30,
        padding: 15
    },
    botao: {
        width: '50%',
        height: 60,
        borderRadius: 15,
        backgroundColor: '#EBAD00',
        color: '#FFFFFF',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    botaotext: {
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    logintext: {
        fontWeight: 'bold',
        fontSize: 22,
        position: 'relative',
    }

})