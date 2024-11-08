import axios from "axios";
import axiosInstance from "./Interceptor";
// Define a function to get the store array
export const getStoreArray = async (filters = {}) => {
  try {
<<<<<<< HEAD
    const response = await axiosInstance.get("stores/filter",{params : filters});
=======
    const response = await axiosInstance.get("stores", { params: filters });
>>>>>>> dev
    return response.data.data; // Return the data from the response
  } catch (error) {
    // Handle errors appropriately
    console.error("Error fetching store array:", error);
    throw error; // Optionally rethrow the error for further handling
  }
}

export const getStoreDataAPI = async (storeId) => {
  console.log(storeId)
  return axiosInstance.get(`/stores/?${storeId}`) 
}


