import { AdvancedMarker, APIProvider, InfoWindow, Map, Marker } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import useMapStore from "../../stores/mapStore";

export default function StoreMap() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY.split('=')[1]
  const [activeMarker, setActiveMarker] = useState(null)
  const defaultPosition = { lat: 13.758456818564303, lng: 100.53501011708647 };
  const getStoreArray = useMapStore(state => state.getStoreArray);
  const stores = useMapStore(state => state.stores);
  const userLocation = useMapStore(state => state.userLocation);
  const mapCenter = useMapStore(state => state.mapCenter)
  const setMapCenter = useMapStore(state => state.setMapCenter)
  const getUserLocation = useMapStore(state => state.getUserLocation);
  
  const handleMapClick = (event) => {
    const lat = event.detail.latLng.lat;
    const lng = event.detail.latLng.lng;
    setMapCenter({ lat, lng });
    getStoreArray({
      radius: 10,
      latitude: lat,  // Use lat directly instead of mapCenter.lat
      longitude: lng, // Use lng directly instead of mapCenter.lng
    });
  };

  const Markers = ({ points }) => (
    points.map((store) => (
      <Marker
        onClick={() => {setActiveMarker(store)}}
        key={store.id}
        position={{ lat: store.latitude, lng: store.longitude }}
        icon={{
          url: 'https://www.svgrepo.com/show/310867/food.svg', // Add your icon image path here
          scaledSize: { width: 50, height: 50 },
          anchor: { x: 25, y: 25 }
        }}
      />
    ))
  );

  // Fetch user location and store array on initial load
  useEffect(() => {
    getUserLocation();
  }, []);

  // Fetch nearby stores whenever userLocation updates
  useEffect(() => {
    if (userLocation.lat && userLocation.lng){
      getStoreArray({
        radius: 10,
        latitude: userLocation.lat,
        longitude: userLocation.lng,
      });
    }
  }, [userLocation, getStoreArray]);

  console.log(import.meta.env.VITE_GOOGLE_MAP_API_KEY)
  return (
    <APIProvider apiKey={apiKey}>
      <div className="h-full bg-red-500">
      <Map
          onClick={(e) => handleMapClick(e)}
          options={{
            gestureHandling: 'greedy',
            draggableCursor: 'move',
            draggingCursor: 'move',
            zoomControl: true,
            scrollwheel: true,
            draggable: true,
          }}
        > 
          <Marker position={mapCenter.lat ? mapCenter : defaultPosition} />
          <Markers points={stores} />
          {activeMarker && (
            <InfoWindow
              position={{ lat: activeMarker.latitude, lng: activeMarker.longitude }}
              onCloseClick={() => setActiveMarker(null)} // Close InfoWindow
            >
              <div>
                <h2>{activeMarker.storeName}</h2>
                <p>{activeMarker.address}</p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}