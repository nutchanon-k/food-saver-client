import axios from "axios";
import axiosInstance from "./Interceptor";


export const loginAPI = async (body) => {
    return axiosInstance.post('/auth/login', body)
}
export const resetAPI = async (body) => {
    return axiosInstance.patch('/auth/reset-password', body)
}


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

export const deleteUserAPI = async (id) => {
    return axiosInstance.delete(`/users/${id}`)
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
export const createStoreAPI = async (body) =>{
    console.log(Object.fromEntries(body))
    return await axiosInstance.post(`/stores`,body)
}

