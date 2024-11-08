import axiosInstance from '../API/Interceptor';

/**
 * Fetches foundations based on query parameters.
 *
 * @param {number} page - The page number to fetch.
 * @param {string} name - The name to search for (optional).
 * @param {number} limit - Number of items per page.
 * @returns {Promise<Array>} - An array of foundation objects.
 * @throws Will throw an error if the API request fails.
 */
export const getFoundationByQueryAPI = async (page, name = '', limit = 10) => {
    try {
        const response = await axiosInstance.get('/foundations', {
            params: {
                page,
                limit,
                name, // Correct parameter based on API docs
                sortBy: 'id',
                sortOrder: 'desc'
            }
        });
        console.log('Foundation API Response:', response.data); // Log the entire response
        return Array.isArray(response.data.foundation) ? response.data.foundation : [];
    } catch (error) {
        console.error('Error fetching foundations:', error.response || error.message);
        throw error;
    }
}

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
