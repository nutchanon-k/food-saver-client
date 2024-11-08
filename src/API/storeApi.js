import axios from "axios";
import axiosInstance from "./Interceptor";
// Define a function to get the store array
export const getStoreArray = async (filters = {}) => {
  try {
    const response = await axiosInstance.get("stores",{params : filters});
    return response.data.data; // Return the data from the response
  } catch (error) {
    // Handle errors appropriately
    console.error("Error fetching store array:", error);
    throw error; // Optionally rethrow the error for further handling
  }
};


export const getStoreByQueryAPI = async (page, searchText, verifyFilter) => {
  return await axiosInstance.get(`/stores?page=${page}&limit=10&search=${searchText}&sortBy=id&sortOrder=desc&isVerify=${verifyFilter}`);
}

export const verifyStoreAPI = async (id) => {
  return await axiosInstance.patch(`/stores/${id}/isVerify`);
}

