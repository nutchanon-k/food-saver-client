import axiosInstance from '../API/Interceptor';

export const placeOrderAPI = async (orderData) => {
    try {
      const response = await axiosInstance.post('/orders/place', orderData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  };
  
  export const verifyOrderAPI = async (verificationData) => {
    try {
      const response = await axiosInstance.post('/orders/verify', verificationData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  };
  