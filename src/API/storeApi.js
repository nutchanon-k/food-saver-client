import axios from "axios";
import axiosInstance from "./Interceptor";
// Define a function to get the store array
export const getStoreArray = async (filters = {}) => {
  try {
    const response = await axiosInstance.get("stores/filter",{params : filters});
    return response.data.data; // Return the data from the response
  } catch (error) {
    // Handle errors appropriately
    console.error("Error fetching store array:", error);
    throw error; // Optionally rethrow the error for further handling
  }
};

