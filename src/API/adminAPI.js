import axiosInstance from "./Interceptor";

export const getMetricAPI = async () => {
    return await axiosInstance.get('/data/metrics')
}

export const getSalesOverTimeAPI = async () => {
    return await axiosInstance.get('/data/sales-over-time')
}


export const getOrderOverTimeAPI = async () => {
    return await axiosInstance.get('/data/orders-over-time')
}

export const getSalesByCategoryAPI = async () => {
    return await axiosInstance.get('/data/sales-by-category')
}

export const getSalesBySellerAPI = async () => {
    return await axiosInstance.get('/data/sales-by-seller')
}


export const getNewUserRegistrationsAPI = async () => {
    return await axiosInstance.get('/data/new-user-registrations')
}


export const getOrdersByStatusAPI = async () => {
    return await axiosInstance.get('/data/orders-by-status')
}


export const orderProcessingTimeAPI = async () => {
    return await axiosInstance.get('/data/order-processing-time')
}