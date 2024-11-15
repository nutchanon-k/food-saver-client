import { create } from "zustand";
import { addCartItem, getCartItem } from "../API/cartItemAPI";
import { body } from "framer-motion/client";

const useCartStore = create((set, get) => ({
  cart: [],
  addToCart : async(body) => {
    try {
      const result = await addCartItem(body)
      return result.data.data
    } catch (err) {
      console.log(err)
    }
  },
  getCart : async(userId) => {
    try {
      const result = await getCartItem(userId)
      console.log(result.data)
      set({cart: result.data.data})
      return result.data.data
    } catch (error) {
      console.log(error)
    }
  }
}));

export default useCartStore;

