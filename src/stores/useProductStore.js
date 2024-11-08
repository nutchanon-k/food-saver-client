// src/stores/useProductStore.js
import { create } from 'zustand'; // Corrected Import
import { getProductsAPI } from '../api/productAPI';

/**
 * Product Store using Zustand for state management with pagination.
 */
const useProductStore = create((set) => ({
    products: [],
    page: 1,
    hasMore: true,
    loading: false,
    error: null,

    /**
     * Fetches products with pagination.
     *
     * @param {number} page - The page number to fetch.
     * @param {number} limit - Number of items per page.
     */
    fetchProducts: async (page = 1, limit = 10) => {
        set({ loading: true, error: null });
        try {
            const data = await getProductsAPI({ page, limit });
            set((state) => ({
                products: page === 1 ? data.data : [...state.products, ...data.data],
                page,
                hasMore: data.data.length === limit,
                loading: false,
            }));
        } catch (error) {
            set({ error: error.message || 'Failed to fetch products.', loading: false });
        }
    },

    /**
     * Resets the product store to its initial state.
     */
    resetProducts: () => set({ products: [], page: 1, hasMore: true, error: null }),
}));

export default useProductStore;
