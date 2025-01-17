import { create } from 'zustand';
import { getPopularStoresAPI, getStoreArray } from '../API/storeApi';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getStoreByQueryAPI, verifyStoreAPI } from '../API/storeApi';

const useStore = create(
  persist(
    (set) => ({
      // State for the store data
      stores: [],
      page: 1,
      hasMore: true,
      loading: false,
      error: null,

      // State for search functionality
      searchText: '',

      // Actions for fetching and managing store data
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

      resetStores: () => set({ stores: [], page: 1, hasMore: true, error: null }),

      // Actions for search functionality
      setSearchText: (text) => {
        set({ searchText: text });
        // You might want to trigger a search or filter here based on the searchText
      },
      getStoreQuery: async (page, searchText, verifyFilter) => {
        try {
          const result = await getStoreByQueryAPI(page, searchText,verifyFilter )
          return result.data
        } catch (error) {
          console.log(error)
    
        }
      },
    
      verifyStore: async (id) => {
        try {
          const result = await verifyStoreAPI(id)
          return result.data
        } catch (error) {
          console.log(error)
        }
      },
      fetchPopularStore : async() => {
        try {
          const result = await getPopularStoresAPI()
          console.log(result,"popular store")
          return result.data.data
        } catch (error) {
          console.log(error)
          
        }
      }
    }),
    {
      name: 'Store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStore;
