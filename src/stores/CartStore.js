
import {create} from 'zustand'
import { addCartItem, DeleteCartItemAPI, getCartDataAPI, PatchCartItemAPI } from '../API/cartItemAPI';
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
    addCartData: async(productId,quantity) => {
      const body = {productId:productId , quantity:quantity}
      console.log(body)
      try{
        const result = await addCartItem(body)
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
          console.log(err)
        }
    },
    
  
    
  
    
  
 

    
    
  }),{
    name: "cartStore",
    storage: createJSONStorage(() => localStorage),
  }));
  
  
  
  
  
  export default useCartStore