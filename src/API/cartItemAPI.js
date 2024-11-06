import axiosInstance from "./Interceptor"

export const getCartDataAPI = async (token) => {
    return axiosInstance.get('/cart-items/', token)
}

export const PatchCartItemAPI = async (itemId , quantity) => {
    return axiosInstance.patch(`/cart-items/${itemId}`,{
        quantity:quantity
    })
}
export const DeleteCartItemAPI = async (itemId ) => {
    return axiosInstance.delete(`/cart-items/${itemId}`)
}


export const addCartItem = async (body) => {
    return await axiosInstance.post('/cart-items',body)
}

export const getCartItem = async () => {
    return await axiosInstance.get('/cart-items')
}

export const editCartItem = async (id,body) => {
    return await axiosInstance.patch(`/cart-items/${id}`,body)
}
