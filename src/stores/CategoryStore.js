// src/stores/CategoryStore.js
import { create } from 'zustand';
import axiosInstance from '../API/Interceptor';

/**
 * CategoryStore manages categories, selected category, and products within that category.
 */
const useCategoryStore = create((set) => ({
  categories: [],
  selectedCategory: null,
  products: [],
  loading: false,
  error: null,

  /**
   * Fetches all categories.
   */
  fetchCategories: async (page = 1, name = '', limit = 23) => {
    console.log('fetchCategories called with:', { page, name, limit });
    set({ loading: true, error: null });
    try {
      const params = {
        page,
        limit,
        sortBy: 'id',
        sortOrder: 'desc',
      };
      if (name.trim() !== '') {
        params.name = name;
      }
      const response = await axiosInstance.get('/categories', { params });
      console.log('Categories API Response:', response.data);
      const data = Array.isArray(response.data) ? response.data : [];
      set({
        categories: data,
        loading: false,
      });
      console.log(data)
      return data;
    } catch (error) {
      console.error('Error in fetchCategories:', error.response ? error.response.data : error.message);
      set({ error: error.message || 'Failed to fetch categories.', loading: false });
      throw error;
    }
  },

  /**
   * Selects a category and fetches products within that category.
   */
  selectCategory: async (categoryId) => {
    console.log('selectCategory called with:', categoryId);
    set({ selectedCategory: categoryId, loading: true, error: null });
    try {
      const params = {
        page: 1,
        limit: 500, // Fetch more products if necessary
        category: categoryId.toString(), // Ensure it's a string
        sortBy: 'id',
        sortOrder: 'desc',
      };
      console.log('API Request Params:', params);
      const response = await axiosInstance.get('/products', { params });
      console.log(`Products API Response for category ID "${categoryId}":`, response.data);
      const data = response.data.data || [];
      // If API isn't filtering, filter manually
      const filteredProducts = data.filter((product) =>
        product.productCategories.some((cat) => cat.categoryId === categoryId)
      );
      set({
        products: filteredProducts,
        loading: false,
      });
    } catch (error) {
      console.error(
        'Error in selectCategory:',
        error.response ? error.response.data : error.message
      );
      set({ error: error.message || 'Failed to fetch products.', loading: false });
      throw error;
    }
  },

  /**
   * Resets the selected category and products.
   */
  resetSelectedCategory: () => set({ selectedCategory: null, products: [], loading: false, error: null }),
}));

export default useCategoryStore;
