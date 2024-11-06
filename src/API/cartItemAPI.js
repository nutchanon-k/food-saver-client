import axios from "axios";
import axiosInstance from "./Interceptor";

export const addCartItem = async (body) => {
    return await axiosInstance.post('/cart-items',body)
}

export const getCartItem = async () => {
    return await axiosInstance.get('/cart-items')
}

export const editCartItem = async (id,body) => {
    return await axiosInstance.patch(`/cart-items/${id}`,body)
}