import { create } from "zustand";
import { getStoreArray } from "../API/storeApi";

const useMapStore = create((set, get) => ({
  stores: [], // Correctly initialize the stores array
  userLocation: {},
  mapCenter: {},
  searchStore: {},
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
      const allStores = await getStoreArray(queryObj); // Await the async function
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
    const { userLocation, setZoom, setCenter, setMapCenter ,getStoreArray } = get();
    setZoom(15);
    setCenter(userLocation);
    setMapCenter(userLocation); // Add this line to update marker position
    set({ activeMarker: null });
    setTimeout(() => {
      setZoom(undefined);
      setCenter(undefined);
    }, 1000);
    getStoreArray({
      radius: 2,
      latitude: userLocation.lat,
      longitude: userLocation.lng,
      products: true,
    })
  },
}));

export default useMapStore;
