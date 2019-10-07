import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView, AsyncStorage, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';

import api from '../services/api';

export default function Book({ navigation }) {
  const id = navigation.getParam('id');
  const [date, setDate] = useState('');

  function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user');

    await api.post(`/spots/${id}/bookings`, {
      date
    }, {
      headers: { user_id }
    });

    Alert.alert('Solicitação de reserva enviada.');

    navigation.navigate('List');
  }

  function handleCancel() {
    navigation.navigate('List');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      <TextInput
        autoCapitalize="words"
        autoCorrect={false}
        placeholder="Qual data você quer reservar?"
        placeholderTextColor="#999"
        style={styles.input}
        value={date}
        onChangeText={setDate}
      ></TextInput>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text styles={styles.buttonText}>Solicitar reserva</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
        <Text styles={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 30
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    marginTop: 30
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
  cancelButton: {
    backgroundColor: '#CCC',
    marginTop: 10
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  }
})