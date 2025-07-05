import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import api from './api';
import { useCartStore } from './store';

export default function PokemonView({ navigation }) {
  const { addToCart, cart, removeFromCart } = useCartStore();
  const [page, setPage] = useState(0); 

  const { data, isLoading, error } = useQuery({
    queryKey: ['pokemons'],
    queryFn: async () => {
      const response = await api.get('/pokemon?limit=100000&offset=0');
      if (response.ok) {
        return response.data.results.sort((a, b) => a.name.localeCompare(b.name));
      }
      throw new Error('Error al consultar los pokemons');
    },
  });

  const PokemonCard = React.memo(({ item, onAdd, isInCart, removeFromCart }) => (
    <TouchableOpacity
        style={[
        styles.card,
        isInCart && styles.cardInCart 
        ]}
        onPress={() => {
          if (isInCart) {
            removeFromCart(item.name);
          } else {
            onAdd(item);
          }
        }}
    >
        <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  ));


  if (isLoading) return <Text>Cargando...</Text>;
  if (error) return <Text>Ocurrió un error</Text>;

  const pageSize = 99;
  const start = page * pageSize;
  const end = start + pageSize;
  const pageData = data.slice(start, end);
  const totalPages = Math.ceil(data.length / pageSize);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.cartCounter}>Carrito: {cart.length}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Carrito')}>
          <Text style={styles.link}>Ir al carrito</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={pageData}
        numColumns={3}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
            const isInCart = cart.some((p) => p.name === item.name);
            return (
                <PokemonCard item={item} onAdd={addToCart} isInCart={isInCart} removeFromCart={removeFromCart} />
            );
        }}
        initialNumToRender={50}
        maxToRenderPerBatch={50}
        windowSize={5}
        contentContainerStyle={{ paddingBottom: 80 }} 
      />

      <View style={styles.pagination}>
        <TouchableOpacity
          disabled={page === 0}
          onPress={() => setPage((p) => Math.max(0, p - 1))}
          style={[styles.pageButton, page === 0 && { opacity: 0.5 }]}>
          <Text>Anterior</Text>
        </TouchableOpacity>

        <Text style={styles.pageText}>Página: {page + 1}</Text>

        <TouchableOpacity
          disabled={page + 1 >= totalPages}
          onPress={() => setPage((p) => p + 1)}
          style={[
            styles.pageButton,
            page + 1 >= totalPages && { opacity: 0.5 }
          ]}>
          <Text>Siguiente</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',          
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,                    
    borderColor: '#ddd',            
    elevation: 2,                    
    shadowColor: '#000',           
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardInCart: {
    backgroundColor: '#d4edda',    
    borderColor: '#28a745',       
  },
  text: {
    textTransform: 'capitalize',
  },
  cartCounter: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
    pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50, 
    marginTop: 10,
  },
  pageButton: {
    marginHorizontal: 20,
    padding: 8,
    backgroundColor: '#ddd',
    borderRadius: 6,
  },
  pageText: {
    fontSize: 16,
  },
});