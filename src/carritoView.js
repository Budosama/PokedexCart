import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useCartStore } from './store';

export default function CarritoView() {
  const { cart, removeFromCart, clearCart } = useCartStore();

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Carrito: {cart.length}</Text>
      
      {cart.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
          <Text style={{ color: 'white' }}>Vaciar carrito</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={cart}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.text}>{item.name}</Text>
            <TouchableOpacity onPress={() => removeFromCart(item.name)}>
              <Text style={styles.removeText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  clearButton: {
    backgroundColor: 'red',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  text: {
    textTransform: 'capitalize',
  },
  removeText: {
    color: 'red',
  },
});
