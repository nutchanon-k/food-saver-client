
import { create } from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";
import { getStoreByQueryAPI, verifyStoreAPI } from '../API/storeApi';




const useStore = create(persist((set, get) => ({

  getStoreQuery: async (page, searchText, verifyFilter) => {
    try {
      const result = await getStoreByQueryAPI(page, searchText,verifyFilter )
      return result.data
    } catch (error) {
      console.log(error)

    }
  },

  verifyStore: async (id) => {
    try {
      const result = await verifyStoreAPI(id)
      return result.data
    } catch (error) {
      console.log(error)
    }
  }



}), {
  name: "Store",
  storage: createJSONStorage(() => localStorage),
}));



export default useStore
