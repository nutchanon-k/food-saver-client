import { create } from 'zustand';
import { getStoreArray } from '../API/storeApi';

/**
 * Store for managing restaurant data with pagination.
 */
const useStoreStore = create((set) => ({
    stores: [],
    page: 1,
    hasMore: true,
    loading: false,
    error: null,

    /**
     * Fetches stores with pagination and optional filters.
     *
     * @param {number} page - The page number to fetch.
     * @param {Object} filters - Additional filters like radius, latitude, and longitude.
     * @param {number} limit - Number of items per page.
     */
    fetchStores: async (page = 1, filters = {}, limit = 10) => {
        set({ loading: true, error: null });
        try {
            const data = await getStoreArray({ page, limit, ...filters });
            set((state) => ({
                stores: page === 1 ? data : [...state.stores, ...data],
                page,
                hasMore: data.length === limit,
                loading: false,
            }));
        } catch (error) {
            set({ error: error.message || 'Failed to fetch stores.', loading: false });
        }
    },

    /**
     * Resets the store state to its initial values.
     */
    resetStores: () => set({ stores: [], page: 1, hasMore: true, error: null }),
}));

export default useStoreStore;
