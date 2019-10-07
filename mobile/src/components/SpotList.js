import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation'
import { View, Image, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';

import api from '../services/api';

function SpotList(props) {
  const { tech } = props;
  const [spots, setSpots] = useState([]);

  //react hooks tiram a necessidade de instanciar classes
  useEffect(() => {
    async function loadSpots() {
      const response = await api.get('/spots', {
        params: { tech }
      })

      setSpots(response.data);
    }

    loadSpots();
  }, []);

  function handleNavigate(id) {
    navigation.navegate('Book', {
      id
    });
  }

  return (
    <View styles={styles.container}>
      <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>
      <FlatList
        styles={styles.list}
        data={spots}
        keyExtractor={spot => spot._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }}></Image>
            <Text style={styles.company}></Text>
            <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'GRATUITO'}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleNavigate(item._id)}>
              <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
          </View>
        )} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },
  title: {
    fontSize: 20,
    color: '#444',
    paddingHorizontal: 20,
    marginBottom: 20
  },
  bold: {
    fontWeight: 'bold'
  },
  list: {
    paddingHorizontal: 20
  },
  listItem: {
    marginRight: 15
  },
  thumbnail: {
    width: 200,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 2
  },
  company: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10
  },
  price: {
    fontSize: 15,
    color: '#999',
    marginTop: 5
  },
  button: {
    height: 32,
    backgroundColor: '#F05A5B',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15
  }
});

export default withNavigation(SpotList);