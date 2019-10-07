import { React, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import logo from "../assets/logo.png";
import api from "../services/api";

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('List');
            }
        })
    }, []);

    async function handleSubmit() {
        const response = await api.post("/sessions", { email });

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        navigation.navigate('List');
    }

    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
            <Image src={logo}></Image>
            <View style={styles.form}>
                <Text style={styles.label}>SEU E-MAIL *</Text>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                ></TextInput>
                <Text style={styles.label}>TECNOLOGIAS *</Text>
                <TextInput
                    autoCapitalize="words"
                    autoCorrect={false}
                    placeholder="Tecnologias de interesse"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={techs}
                    onChangeText={setTechs}
                ></TextInput>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text styles={styles.buttonText}>Encontrar Spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },
    input: {
        height: 44,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 2,
        marginBottom: 20,
        paddingHorizontal: 20,
        color: '#444',
        fontSize: 16
    },
    button: {
        height: 42,
        backgroundColor: '#F05A5B',
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});