
import {create} from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";




const useStore = create(persist((set, get) => ({
    
    searchText  : '',


    setSearchText : (text) => {
        set({searchText : text})
    },

   
    
  }),{
    name: "Store",
    storage: createJSONStorage(() => localStorage),
  }));
  
  
  
  export default useStore