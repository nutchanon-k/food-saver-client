import axios from "axios";
import axiosInstance from "./Interceptor";


export const loginAPI = async (body) => {
    return axiosInstance.post('/auth/login', body)
}

export const loginGoogle = async (body) => {
    return axiosInstance.post('/auth/login-google', body)
}

// export const resetAPI = async (body) => {
//     return axiosInstance.patch('/auth/reset-password', body)
// }


export const getMeAPI = async () => {
    return axiosInstance.get('/users/me')
}
 

export const RegisterAPI = async(body) => {
    return axiosInstance.post('/auth/register',body)
}

export const getAllUserAPI = async () => {
    return axiosInstance.get('/users')
}


export const updateUserAPI = async (body) => {
    return axiosInstance.patch("/users/me",body)
}


export const activateUserAPI = async (id) => {
    return axiosInstance.patch(`/users/isActive/${id}`) 
}


export const getUserByQueryAPI = async (page, searchText, roleFilter) => {
    return await axiosInstance.get(`/users?page=${page}&limit=10&search=${searchText}&role=${roleFilter}`);
}

export const patchSellerAPI = async (storeId,body) =>{
    console.log("update",body,storeId)
    return await axiosInstance.patch(`http://localhost:8000/stores/${storeId}`,body)
}


export const deleteStoreAPI = async (storeId) =>{
    return await axiosInstance.delete(`/stores/${storeId}`)
}


export const forgetPasswordAPI = async (body)  =>{
    return await axiosInstance.post('/auth/forgot-password',body)
}


export const  resetPasswordAPI = async (token , body) => {
    return await axios.patch(`http://localhost:8000/auth/reset-password`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}