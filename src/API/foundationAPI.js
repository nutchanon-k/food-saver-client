import axiosInstance from "./Interceptor";


export const getFoundationByQueryAPI =async (page, searchText) => {
    return await axiosInstance.get(`/foundations?page=${page}&limit=10&search=${searchText}&sortBy=id&sortOrder=desc`);
}