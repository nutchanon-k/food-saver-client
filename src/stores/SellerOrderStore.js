import {create} from 'zustand';
import { fetchOrdersForSeller, acceptOrderAPI } from '../API/orderAPI'; // Ensure acceptOrderAPI is defined

const useSellerOrderStore = create((set, get) => ({
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,
  currentPage: 1,
  ordersPerPage: 10,

  // Fetch orders from the API
  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const orders = await fetchOrdersForSeller();
      set({ orders, loading: false, currentPage: 1 });
      console.log('Orders fetched and stored:', orders); // Debugging log
    } catch (error) {
      console.error('Error fetching orders:', error);
      set({ error: 'Failed to fetch orders. Please try again later.', loading: false });
    }
  },

  // Select an order to view details
  selectOrder: (order) => {
    set({ selectedOrder: order });
    console.log('Order selected:', order); // Debugging log
  },

  // Clear selected order (optional)
  clearSelectedOrder: () => set({ selectedOrder: null }),

  // Set current page
  setCurrentPage: (page) => {
    set({ currentPage: page });
    console.log('Current Page set to:', page); // Debugging log
  },

  // Accept Order (Mark as Picked Up)
  acceptOrder: async (orderId) => {
    try {
      const updatedOrder = await acceptOrderAPI(orderId);
      // Update the orders array with the updated order
      const updatedOrders = get().orders.map((order) =>
        order.id === orderId ? updatedOrder : order
      );
      set({ orders: updatedOrders, selectedOrder: updatedOrder });
      console.log('Order accepted:', updatedOrder); // Debugging log
    } catch (error) {
      console.error('Error accepting order:', error);
      set({ error: 'Failed to accept the order. Please try again.' });
    }
  },
}));

export default useSellerOrderStore;
