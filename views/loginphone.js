import * as React from "react";
import {ActivityIndicator,Text, View, TextInput, Button, StyleSheet, TouchableOpacity, Platform, KeyboardAvoidingView} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";

export default function LoginPhone({navigation}) {
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
  const [message, showMessage] = React.useState((!firebaseConfig || Platform.OS === 'web')
    ? { text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device."}
    : undefined);
    const Activityindicator = () => (
      <ActivityIndicator animating={true} color={Colors.red800} />
    );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        title='Verificação de identidade!'
    cancelLabel='Fechar'
      />
      <Text style={styles.logintext}>Enter phone number</Text>
      <TextInput
        style={styles.number}
        placeholder="+55 11 9 9999 9999"
        autoFocus
        autoCompleteType="tel"
        textAlign={'center'}
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        onChangeText={(phoneNumber) => setPhoneNumber('+55'+phoneNumber)}
      />
      <Button
        title="Enviar codigo"
        disabled={!phoneNumber}
        onPress={async () => {
          try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            alert( "O codigo foi enviado para o seu telefone."),
            <Activityindicator />,
            navigation.navigate('TelefoneLogin',{screen: 'NextPhone',
          params: {phonenumber: phoneNumber, verificationId: verificationId}});
          } catch (err) {
            alert (`Error: ${err.message}`)
          }
        }}
      />
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8e8e8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    number: {
        width: '80%',
        height: 60,
        borderColor: 'black',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 30,
        padding: 15
    },
    botao: {
        width: '80%',
        height: 60,
        borderRadius: 15,
        backgroundColor: '#EBAD00',
        color: '#FFFFFF',
        marginTop: 30,
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