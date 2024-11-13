import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import useMapStore from "../../stores/mapStore";

export default function SellerMap({
  state,
  setState,
  latitude,
  longitude,
  canEdit,
  canCreate,
}) {
  const userLocation = useMapStore((state) => state.userLocation);
  const defaultPosition = useMapStore((state) => state.defaultPosition);
  const getUserLocation = useMapStore((state) => state.getUserLocation);
  
  const [displayMarker, setDisplayMarker] = useState({
    lat: Number(latitude) || defaultPosition.lat || 13.758456818564303,
    lng: Number(longitude) || defaultPosition.lng || 100.53501011708647,
  });
  
  const [mapConfig, setMapConfig] = useState({
    center: {
      lat: Number(latitude) || defaultPosition.lat || 13.758456818564303,
      lng: Number(longitude) || defaultPosition.lng || 100.53501011708647,
    },
    zoom: 15
  });

  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  useEffect(() => {
    async function initializeMap() {
      if (canCreate) {
        setIsLoadingLocation(true);
        await getUserLocation();
        setIsLoadingLocation(false);
      } else if (latitude && longitude) {
        const newPosition = {
          lat: Number(latitude),
          lng: Number(longitude)
        };
        setDisplayMarker(newPosition);
        setMapConfig(prev => ({...prev, center: newPosition}));
      }
    }
    initializeMap();
    const timeOut = setTimeout(() => {
      setMapConfig(prev => ({...prev, center: undefined,zoom:undefined}));
    },1000)
    return () => {
      clearTimeout(timeOut);
    }
  }, [latitude, longitude, canCreate]);

  useEffect(() => {
    if (userLocation?.lat && userLocation?.lng) {
      const newPosition = {
        lat: Number(userLocation.lat),
        lng: Number(userLocation.lng)
      };
      setDisplayMarker(newPosition);
      setMapConfig(prev => ({...prev, center: newPosition}));
      setState?.((prev) => ({
        ...prev,
        latitude: userLocation.lat,
        longitude: userLocation.lng,
      }));
    }
  }, [userLocation, canCreate]);

  const handleMapClick = (event) => {
    if (!canCreate && !canEdit) return;

    const newPosition = {
      lat: event.detail.latLng.lat,
      lng: event.detail.latLng.lng
    };
    
    setDisplayMarker(newPosition);
    setState((prev) => ({
      ...prev,
      latitude: newPosition.lat,
      longitude: newPosition.lng,
    }));
  };

  return (
    <div className="relative w-full h-full">
      {isLoadingLocation ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
          <Map
            onClick={handleMapClick}
            center={mapConfig.center}
            zoom={mapConfig.zoom}
            options={{
              clickableIcons: Boolean(canEdit),
              draggableCursor: canEdit ? "pointer" : "default",
              draggable: Boolean(canEdit || canCreate),
              zoomControl: Boolean(canEdit || canCreate),
              scrollwheel: Boolean(canEdit || canCreate),
              minZoom: 3,
              maxZoom: 20,
            }}
          >
            <Marker position={displayMarker} />
          </Map>
        </APIProvider>
      )}
    </div>
  );
}
