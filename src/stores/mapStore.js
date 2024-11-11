import { create } from "zustand";
import { getStoreArray } from "../API/storeApi";

const useMapStore = create((set, get) => ({
  mapCenter: {},
  searchStore: {},
  stores: [],
  userLocation: { lat: null, lng: null }, // Initialize lat and lng with null
  filter: {
    latitude: 0, // Initializing with a value or null if appropriate
    longitude: 0,
    radius: 2,
    category: "",
    allergen: "",
  },
  setFilter: (newFilter) =>
    set((prev) => ({
      ...prev,
      filter: {
        ...prev.filter, // Spread existing filter properties
        ...newFilter, // Overwrite with new properties from newFilter
      },
    })),
  zoom: 10,
  setZoom: (zoom) =>
    set((prev) => ({
      ...prev,
      zoom: zoom,
    })),
  center: { lat: 13.758456818564303, lng: 100.53501011708647 },
  setCenter: (center) =>
    set((prev) => ({
      ...prev,
      center: center,
    })),
  defaultPosition: { lat: 13.758456818564303, lng: 100.53501011708647 },
  activeMarker: null,
  setActiveMarker: (store) =>
    set((prev) => ({
      ...prev,
      activeMarker: store,
    })),
  setSearchStore: (store) =>
    set((prev) => ({
      ...prev,
      searchStore: store,
    })),
  setMapCenter: ({ lat, lng }) =>
    set((prev) => ({
      ...prev,
      mapCenter: { lat: lat, lng: lng },
    })),
  getStoreArray: async (queryObj) => {
    try {
      const { category, allergen, ...remainQuery } = queryObj;
      const allStores = await getStoreArray(remainQuery); // Await the async function
      console.log(allStores);
      set({ stores: allStores }); // Update the state with the fetched stores
    } catch (error) {
      console.error("Failed to fetch stores:", error);
    }
  },
  getUserLocation: async () => {
    try {
      await navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        set((prev) => ({
          ...prev,
          userLocation: { lat, lng },
          mapCenter: { lat, lng },
        }));
        console.log(lat, lng);
      });
    } catch (err) {
      console.log(err);
    }
  },
  initialPosition: () => {
    const {
      userLocation,
      setZoom,
      setCenter,
      setMapCenter,
      getStoreArray,
      filter,
    } = get();
    setZoom(15);
    setCenter(userLocation);
    setMapCenter(userLocation); // Add this line to update marker position
    set({ activeMarker: null });
    setTimeout(() => {
      setZoom(undefined);
      setCenter(undefined);
    }, 1000);
    getStoreArray({
      radius: filter.radius,
      latitude: userLocation.lat,
      longitude: userLocation.lng,
      products: true,
    });
  },
  sortStoreByDistance: () => {
    const { stores } = get();
    // Create a new array instead of mutating the existing one
    const sortedStores = [...stores].sort((a, b) => {
      const distanceA = a.distance;
      const distanceB = b.distance;
      return distanceA - distanceB;
    });
    // Set the new array to trigger re-render
    set({ stores: sortedStores });
  },
  sortStoreByAvalilability: () => {
    const { stores } = get();
    // Create a new array instead of mutating the existing one
    const sortedStores = [...stores].sort((a, b) => {
      const availabilityA = a.products.reduce((acc,product) => acc + product.quantity, 0);
      const availabilityB = b.products.reduce((acc,product) => acc + product.quantity, 0);
      return availabilityA - availabilityB;
    });
    // Set the new array to trigger re-render
    set({ stores: sortedStores });
  }
}));

export default useMapStore;
