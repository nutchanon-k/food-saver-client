import axios from "axios";
import axiosInstance from "./Interceptor";


export const loginAPI = async (body) => {
    return axiosInstance.post('/auth/login', body)
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


export const activateUserAPI = async (id) => {
    return axiosInstance.patch(`/users/isActive/${id}`) 
}
