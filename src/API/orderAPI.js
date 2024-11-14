import axiosInstance from "./Interceptor";



export const getOrderAPI = async () => {
    return await axiosInstance.get('/cart-items/')
}

// Fetch order details by orderId
export const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axiosInstance.get(`/orders/details/${orderId}`);
      return response.data.orderDetails;
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
  };


// Fetch order history by userId
export const fetchOrderHistoryByUserId = async (userId) => {
    try {
        const response = await axiosInstance.get(`/orders/history/${userId}`);
        return response.data.orderHistory;
    } catch (error) {
        console.error('Error fetching order history:', error);
        throw error;
    }
};

export const fetchOrdersForSeller = async () => {
    try {
      const response = await axiosInstance.get('/orders/seller/orders');
      return response.data.orders;
    } catch (error) {
      console.error('Error fetching orders for seller:', error);
      throw error;
    }
  };

  export const acceptOrderAPI = async (orderId) => {
    try {
      const response = await axiosInstance.patch(`/orders/${orderId}/pickup`);
      return response.data.order;
    } catch (error) {
      console.error('Error accepting order:', error);
      throw error.response?.data || error.message;
    }
  };  
export const getSellerOrderAPI = async (sellerId) => {
    return axiosInstance.get(`/orders/${sellerId}/orderItems`)
}
