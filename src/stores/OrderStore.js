
import {create} from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';



const useOrderStore = create(persist((set, get) => ({
    

    getOrderData: async() => {
      try{
      const result = await getOrderAPI()
      console.log('hi order store ')
      return result.data

      }catch(err){

      }
    }
  
    
  
    
  
 

    
    
  }),{
    name: "orderStore",
    storage: createJSONStorage(() => localStorage),
  }));
  
  
  
  
  
  export default useOrderStore