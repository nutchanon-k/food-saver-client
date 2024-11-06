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
