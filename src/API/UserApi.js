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
