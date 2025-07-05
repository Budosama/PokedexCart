import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokemonView from './pokemonView';
import CarritoView from './carritoView';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pokedex" component={PokemonView} options={{ title: 'Pokedéx' }} />
        <Stack.Screen name="Carrito" component={CarritoView} options={{ title: 'Carrito' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}