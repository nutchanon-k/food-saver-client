
import {create} from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';
import { getSellerOrderAPI } from '../API/orderAPI';



const useOrderStore = create(persist((set, get) => ({
    
    sellerOrder : null,

    getOrderData: async() => {
      try{
      const result = await getOrderAPI()
      console.log('hi order store ')
      return result.data

      }catch(err){

      }
    },

    getSellerOrder : async(sellerId) =>{
      try{
        const result = await getSellerOrderAPI(sellerId)
        console.log(result)
        return result
      }catch(err){
        console.log(err)
      }
    },

    setStateData : (orderData) => {
      console.log('zustand order',orderData)
      set({ sellerOrder: orderData })
    }
  
    
  
    
  
 

    
    
  }),{
    name: "orderStore",
    storage: createJSONStorage(() => localStorage),
  }));
  
  
  
  
  
  export default useOrderStore