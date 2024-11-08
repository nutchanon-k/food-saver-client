import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { placeOrderAPI, verifyOrderAPI } from '../API/placeOrderAPI';

const usePaymentStore = create(
  persist(
    (set, get) => ({
      // Place order and initiate payment
      placeOrder: async (orderData) => {
        try {
          const response = await placeOrderAPI(orderData);
          return response; // Return the response data
        } catch (error) {
          throw error;
        }
      },
      // Verify payment after redirect
      verifyOrder: async (verificationData) => {
        try {
          const response = await verifyOrderAPI(verificationData);
          return response;
        } catch (error) {
          throw error;
        }
      },
    }),
    {
      name: 'paymentStore',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default usePaymentStore;
