
import { create } from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";
import { createFoundationAPI, deleteFoundationAPI, getFoundationAPI, getFoundationByQueryAPI, updateFoundationAPI } from '../API/foundationAPI';

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


    getFoundationQuery : async (page, searchText) => {
        try {
            const result = await getFoundationAPI(page, searchText)
            return result.data
        } catch (error) {
            console.log(error)
        }
    },


    createFoundation: async (body) => {
        try {
            const result = await createFoundationAPI(body)
            return result.data
        } catch (error) {
            console.log(error)
        }
    },
    deleteFoundation: async (id) => {
        try {
            const result = await deleteFoundationAPI(id)
            return result.data
        } catch (error) {
            console.log(error)
        }
    },

    updateFoundation: async (id, body) => {
        try {
            const result = await updateFoundationAPI(id, body)
            return result.data
        } catch (error) {
            console.log(error)
        }
    },






}), {
    name: "foundationStore",
    storage: createJSONStorage(() => localStorage),
});

export default useFoundationStore;
