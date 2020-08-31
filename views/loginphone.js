import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Button, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import NextPhone from './nextphone'

export default function LoginPhone(props) {
    const [phonenumber, setText] = useState('');
    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.logintext}>Digite Seu número</Text>
            <TextInput
                style={styles.number}
                keyboardType='phone-pad'
                placeholder='(11)9 9999-9999'
                name={'phonenumber'}
                onChangeText={phonenumber => setText(phonenumber)}
            >

            </TextInput>
            <TouchableOpacity style={styles.botao}
                title="Login"
                color='#ffffff'
                onPress={() => props.navigation.navigate('nextphone', { phonenumber: phonenumber })}
            >
                <Text style={styles.botaotext}>Avançar</Text>
            </TouchableOpacity>
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