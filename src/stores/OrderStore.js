
import {create} from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';
import { fetchOrderDetails,fetchOrderHistoryByUserId,getSellerOrderAPI  } from '../API/orderAPI';


const useOrderStore = create((set) => ({
  orderDetails: null,
  orderHistory: [], // Add a new state for order history

  setOrderDetails: (details) => set({ orderDetails: details }),

  // Fetch and set order details by orderId
  fetchAndSetOrderDetails: async (orderId) => {
    try {
      const details = await fetchOrderDetails(orderId);
      set({ orderDetails: details });
    } catch (error) {
      console.error('Failed to fetch order details:', error);
    }
  },

  // Clear order details if needed
  clearOrderDetails: () => set({ orderDetails: null }),

  // Fetch and set order history by userId
  fetchOrderHistory: async (userId) => {
    try {
      const history = await fetchOrderHistoryByUserId(userId);
      set({ orderHistory: history });
    } catch (error) {
      console.error('Failed to fetch order history:', error);
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
  }

}));

export default useOrderStore;




























// Old code don't know who wrote this seems like it doesn't work
// const useOrderStore = create(persist((set, get) => ({
    
    // sellerOrder : null,

//     getOrderData: async() => {
//       try{
//       const result = await getOrderAPI()
//       console.log('hi order store ')
//       return result.data

//       }catch(err){

//       }
//     }
    //   }
    // },

    //   }
    // },

  
    
  
    
  
 

    
    
//   }),{
//     name: "orderStore",
//     storage: createJSONStorage(() => localStorage),
//   }));
    
  
  // export default useOrderStore


