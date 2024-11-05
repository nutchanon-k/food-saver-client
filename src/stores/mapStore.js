import { create } from "zustand";
import { getStoreArray } from "../API/storeApi";

const useMapStore = create((set, get) => ({
  stores: [], // Correctly initialize the stores array
  userLocation : {},
  mapCenter : {},
  searchStore : {},
  activeMarker : null,
  setActiveMarker : (store) => set((prev) => {
    return ({ ...prev, activeMarker : store})
  }),
  setSearchStore : (store) => set((prev) => {
    return ({ ...prev, searchStore : store})
  }),
  setMapCenter : ({lat,lng}) => set((prev) => {
    return ({ ...prev, mapCenter : {lat:lat,lng:lng}})
  }),
  getStoreArray: async (queryObj) => {
    try {
      const allStores = await getStoreArray(queryObj); // Await the async function
      console.log(allStores)
      set({ stores: allStores }); // Update the state with the fetched stores
    } catch (error) {
      console.error("Failed to fetch stores:", error);
    }
  },
  getUserLocation : async() => {
    try {
      let lat,lng
      await navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude
        lng = position.coords.longitude    
        set(prv => ({...prv,userLocation:{lat,lng},mapcenter:{lat,lng}}))
        console.log(lat,lng)
      })
    } catch (err) {
      console.log(err)
    }
  },
  
}));

export default useMapStore;
