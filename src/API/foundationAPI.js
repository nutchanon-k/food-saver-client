import axiosInstance from "./Interceptor";


export const getFoundationByQueryAPI =async (page, searchText) => {
    return await axiosInstance.get(`/foundations?page=${page}&limit=10&search=${searchText}&sortBy=id&sortOrder=desc`);
}


export const createFoundationAPI = async (body) => {
    return await axiosInstance.post('/foundations', body);
}


export const deleteFoundationAPI = async (id) => {
    return await axiosInstance.delete(`/foundations/${id}`)
}


export const updateFoundationAPI = async (id, body) => {
    return await axiosInstance.patch(`/foundations/${id}`, body);
}