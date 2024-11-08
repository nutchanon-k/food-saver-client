// src/stores/FoundationStore.js
import { create } from 'zustand';
import { getFoundationByQueryAPI } from '../API/foundationAPI';

const useFoundationStore = create((set) => ({
    foundations: [],
    page: 1,
    hasMore: true,
    loading: false,
    error: null,

    fetchFoundations: async (page = 1, name = '', limit = 10) => {
        console.log('fetchFoundations called with:', { page, name, limit }); // Added log
        set({ loading: true, error: null });
        try {
            const data = await getFoundationByQueryAPI(page, name, limit);
            console.log(`Fetched Foundations (Page ${page}):`, data); // Existing log
            const foundationsData = Array.isArray(data) ? data : [];
            set((state) => ({
                foundations: page === 1 ? foundationsData : [...state.foundations, ...foundationsData],
                page,
                hasMore: foundationsData.length === limit,
                loading: false,
            }));
            return foundationsData;
        } catch (error) {
            console.error('Error in fetchFoundations:', error);
            set({ error: error.message || 'Failed to fetch foundations.', loading: false });
            throw error;
        }
    },

    resetFoundations: () => set({ foundations: [], page: 1, hasMore: true, error: null }),
}));

export default useFoundationStore;
