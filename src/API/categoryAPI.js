// src/API/categoryAPI.js
import axiosInstance from '../API/Interceptor';

/**
 * Fetches categories.
 *
 * @param {number} page - Page number.
 * @param {string} name - Optional name filter.
 * @param {number} limit - Items per page.
 * @returns {Promise<Array>} - Array of category objects.
 */
export const getCategoriesAPI = async (page = 1, name = '', limit = 10) => {
    try {
        const params = {
            page,
            limit,
            sortBy: 'id',
            sortOrder: 'desc'
        };
        if (name.trim() !== '') {
            params.name = name;
        }
        const response = await axiosInstance.get('/categories', { params });
        console.log('Categories API Response:', response.data);
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error('Error fetching categories:', error.response ? error.response.data : error.message);
        throw error;
    }
};
