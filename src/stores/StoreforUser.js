import { createJSONStorage, persist } from "zustand/middleware";
import { getStoreDataAPI } from "../API/storeApi";
import { create } from "zustand";
import { PatchCartItemAPI } from "../API/cartItemAPI";

const useStoreForUser = create(persist((set, get) => ({
    
    
    getStoreData : async(storeId) => {
      try{
        const result = await getStoreDataAPI(storeId)
        return result.data
      }catch(err){
        console.log(err)
      }
    },
    createCartData : async(productId,quantity ) => {
        
        try{
            const result = await PatchCartItemAPI(productId,quantity)
            return result.data
        }catch(err){
            console.log(err)
        }
    }
   
  
    
  }),{
    name: "StoreForUser",
    storage: createJSONStorage(() => localStorage),
  }));
  
  
  
  export default useStoreForUser