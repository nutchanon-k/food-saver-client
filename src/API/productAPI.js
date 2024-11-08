import axiosInstance from '../API/Interceptor';

/**
 * Fetches products with optional query parameters for pagination, searching, and sorting.
 *
 * @param {Object} options - Optional query parameters.
 * @param {number} [options.page=1] - Page number for pagination.
 * @param {number} [options.limit=10] - Number of items per page.
 * @param {string} [options.search=''] - Search text to filter products.
 * @param {string} [options.sortBy='id'] - Field to sort by.
 * @param {string} [options.sortOrder='desc'] - Order of sorting ('asc' or 'desc').
 * @returns {Promise<Object>} - The response data containing products.
 * @throws Will throw an error if the API request fails.
 */
export const getProductsAPI = async ({
  page = 1,
  limit = 10,
  search = '',
  sortBy = 'id',
  sortOrder = 'desc',
} = {}) => {
  try {
    const response = await axiosInstance.get('/products', {
      params: { page, limit, search, sortBy, sortOrder },
    });
    console.log('Products API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching products from API:', error.response || error.message);
    throw error;
  }
};
