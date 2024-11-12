import axiosInstance from './Interceptor';

/**
 * Fetches a list of stores with optional filters.
 *
 * @param {Object} filters - Optional query parameters to filter the stores.
 * @returns {Promise<Array>} - An array of store objects.
 * @throws Will throw an error if the API request fails.
 */
export const getStoreArray = async (filters = {}) => {
  try {
    const response = await axiosInstance.get("stores/filter",{params : filters});
    return response.data.data; // Return the data from the response
  } catch (error) {
    console.error('Error fetching store array:', error.response || error.message);
    throw error;
  }
}

export const getStoreDataAPI = async (storeId) => {
  console.log(storeId)
  return axiosInstance.get(`/stores/?id=${storeId}&products=true`) 
}


// /**
//  * Fetches specific store data by store ID.
//  *
//  * @param {string|number} storeId - The unique identifier of the store.
//  * @returns {Promise<Object>} - The store data object.
//  * @throws Will throw an error if the API request fails or if storeId is invalid.
//  */
// export const getStoreDataAPI = async (storeId) => {
//   if (!storeId) {
//     throw new Error('Store ID is required to fetch store data.');
//   }

//   try {
//     const response = await axiosInstance.get(`/stores/${storeId}`);
//     console.log(`Store Data API Response for ID ${storeId}:`, response.data);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching store data for ID ${storeId}:`, error.response || error.message);
//     throw error;
//   }
// };

export const getStoreByQueryAPI = async (page, searchText, verifyFilter) => {
  return await axiosInstance.get(`/stores?page=${page}&limit=10&search=${searchText}&sortBy=id&sortOrder=desc&isVerify=${verifyFilter}`);
}

export const verifyStoreAPI = async (id) => {
  return await axiosInstance.patch(`/stores/${id}/isVerify`);
}

export const getPopularStoresAPI = async () => {
  return await axiosInstance.get(`/stores/popular`);
}