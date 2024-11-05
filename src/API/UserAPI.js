import axios from "axios";
import axiosInstance from "./Interceptor";

export const getMeAPI = async () => {
    return axiosInstance.get('/users/me')
}

export const getAllUserAPI = async () => {
    return axiosInstance.get('/users')
}
