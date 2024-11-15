import axiosInstance from "./Interceptor"

export const getCartDataAPI = async (userId) => {
    return await axiosInstance.get(`/cart-items?userId=${userId}`)
}

export const PatchCartItemAPI = async (itemId , quantity) => {
    return  await axiosInstance.patch(`/cart-items/${itemId}`,{
        quantity:quantity
    })
}
export const DeleteCartItemAPI = async (itemId ) => {
    return await axiosInstance.delete(`/cart-items/${itemId}`)
}


export const addCartItem = async (body) => {
    console.log(body)
    return await axiosInstance.post('/cart-items',body)
}

export const getCartItem = async (userId) => {
    return await axiosInstance.get(`/cart-items?userId=${userId}`)
}

export const editCartItem = async (id,body) => {
    return await axiosInstance.patch(`/cart-items/${id}`,body)
}
