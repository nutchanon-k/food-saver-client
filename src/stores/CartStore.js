import { create } from 'zustand';
import {
  addCartItem,
  DeleteCartItemAPI,
  getCartDataAPI,
  PatchCartItemAPI,
} from '../API/cartItemAPI';
import { createJSONStorage, persist } from 'zustand/middleware';

const initialState = {
  // Add any initial state values here if needed, e.g., cart: []
};

const useCartStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      getCartData: async (token) => {
        try {
          const result = await getCartDataAPI(token);
          return result.data;
        } catch (err) {
          console.error('Error fetching cart data:', err);
          // Handle errors appropriately, e.g., display error message to user
        }
      },

      addCartData: async (productId, quantity) => {
        const body = { productId, quantity };
        try {
          const result = await addCartItem(body);
          return result.data;
        } catch (err) {
          console.error('Error adding cart item:', err);
          // Handle errors appropriately
        }
      },

      ChangeQuantityItem: async (itemId, quantity) => {
        try {
          const result = await PatchCartItemAPI(itemId, quantity);
          return result.data;
        } catch (err) {
          console.error('Error changing cart item quantity:', err);
          // Handle errors appropriately
        }
      },

      DeleteCartItem: async (itemId) => {
        try {
          const result = await DeleteCartItemAPI(itemId);
          return result.data;
        } catch (err) {
          console.error('Error deleting cart item:', err);
          // Handle errors appropriately
        }
      },

      clearCart: async () => {
        try {
          // Clear cart data on server-side if applicable (API call)
          // Update local state to reflect empty cart
          set({ /* Update state to reflect empty cart, e.g., { cart: [] } */ });
        } catch (err) {
          console.error('Error clearing cart:', err);
          // Handle errors appropriately (e.g., display error message)
        }
      },
    }),
    {
      name: 'cartStore',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;