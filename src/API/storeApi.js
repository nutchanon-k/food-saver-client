import axios from "axios";

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: "http://localhost:8000", // Change to your API base URL
});

// Define a function to get the store array
export const getStoreArray = async (filters = {}) => {
  try {
    // const queryArray = [];

    // for (let [key, val] of Object.entries(filters)) {
    //   if (val !== undefined && val !== null) { // Ensure we only include defined values
    //     queryArray.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`); // URL encode key and value
    //   }
    // }
    // const queryString = queryArray.join('&')
    // console.log(queryString)
    // // Make a GET request to the desired endpoint
    // const endpoint = queryString ? `/stores?${queryString}` : `/stores?`
    const response = await api.get("stores",{params : filters});
    return response.data.data; // Return the data from the response
  } catch (error) {
    // Handle errors appropriately
    console.error("Error fetching store array:", error);
    throw error; // Optionally rethrow the error for further handling
  }
};
