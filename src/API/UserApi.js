import axios from "axios";
import axiosInstance from "./Interceptor";


export const loginAPI = async (body) => {
    return axiosInstance.post('/auth/login', body)
}
<<<<<<< HEAD
=======
export const resetAPI = async (body) => {
    return axiosInstance.patch('/auth/reset-password', body)
}
>>>>>>> dev


export const getMeAPI = async () => {
    return axiosInstance.get('/users/me')
}


export const RegisterAPI = async(body) => {
    return axiosInstance.post('/auth/register',body)
}

export const getAllUserAPI = async () => {
    return axiosInstance.get('/users')
}
<<<<<<< HEAD
=======


export const activateUserAPI = async (id) => {
    return axiosInstance.patch(`/users/isActive/${id}`) 
}


export const getUserByQueryAPI = async (page, searchText, roleFilter) => {
    return await axiosInstance.get(`/users?page=${page}&limit=10&search=${searchText}&role=${roleFilter}`);
}
>>>>>>> dev
