
import {create} from 'zustand'
import { DeleteCartItemAPI, getCartDataAPI, PatchCartItemAPI } from '../API/cartItemAPI';
import { createJSONStorage, persist } from 'zustand/middleware';






const useCartStore = create(persist((set, get) => ({
    

    getCartData: async(token) => {
      try{
      const result = await getCartDataAPI(token)
    //   console.log('hi store')
      return result.data

      }catch(err){

      }
    },
    ChangeQuantityItem: async(itemId,quantity) =>{
        try{
        // console.log(quantity)
        const result = await PatchCartItemAPI(itemId,quantity)
        // console.log('hi patch Store' )
        return result.data
        }catch(err){

        }
    },
    DeleteCartItem: async(itemId) =>{
        try{
        // console.log(quantity)
        const result = await DeleteCartItemAPI(itemId)
        // console.log('hi patch Store' )
        return result.data
        }catch(err){

        }
    },
    
  
    
  
    
  
 

    
    
  }),{
    name: "cartStore",
    storage: createJSONStorage(() => localStorage),
  }));
  
  
  
  
  
  export default useCartStore