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
    const response = await axiosInstance.get('/stores', { params: filters });
    console.log('Store Array API Response:', response.data);
    return response.data.data; // Assuming the API returns data under a 'data' key
  } catch (error) {
    console.error('Error fetching store array:', error.response || error.message);
    throw error;
  }
};

/**
 * Fetches specific store data by store ID.
 *
 * @param {string|number} storeId - The unique identifier of the store.
 * @returns {Promise<Object>} - The store data object.
 * @throws Will throw an error if the API request fails or if storeId is invalid.
 */
export const getStoreDataAPI = async (storeId) => {
  if (!storeId) {
    throw new Error('Store ID is required to fetch store data.');
  }

  try {
    const response = await axiosInstance.get(`/stores/${storeId}`);
    console.log(`Store Data API Response for ID ${storeId}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching store data for ID ${storeId}:`, error.response || error.message);
    throw error;
  }
};
