import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (pokemon) =>
    set((state) => {
        if (state.cart.some((p) => p.name === pokemon.name)) {
            return state; 
        }
        return { cart: [...state.cart, pokemon] };
    }),
  removeFromCart: (pokemonName) =>
    set((state) => ({
      cart: state.cart.filter((p) => p.name !== pokemonName),
    })),
  clearCart: () => set({ cart: [] }),
}));