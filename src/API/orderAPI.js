import axiosInstance from "./Interceptor";



export const getOrderAPI = async () => {
    return axiosInstance.get('/cart-items/')
}
export const getSellerOrderAPI = async (sellerId) => {
    return axiosInstance.get(`/orders/${sellerId}/orderItems`)
}
