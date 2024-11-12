import { APIProvider, Map, Marker, useMap } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import useMapStore from "../../stores/mapStore";

export default function SellerMap({ setState, latitude, longitude, canEdit }) {
  const userLocation = useMapStore((state) => state.userLocation);
  const defaultPosition = useMapStore((state) => state.defaultPosition);
  const getUserLocation = useMapStore((state) => state.getUserLocation);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [center, setCenter] = useState({
    lat: Number(latitude) || defaultPosition.lat,
    lng: Number(longitude) || defaultPosition.lng,
  });
  const [zoom, setZoom] = useState(15);
  const [displayMarker, setDisplayMarker] = useState({
    lat: Number(latitude) || defaultPosition.lat,
    lng: Number(longitude) || defaultPosition.lng,
  });
  const [isFirst, setIsFirst] = useState(true);

  const copyCoordinates = (e) => {
    e.preventDefault()
    const coordinates = `${displayMarker.lat}, ${displayMarker.lng}`;
    navigator.clipboard.writeText(coordinates);
  };

  useEffect(() => {
    async function intializeData() {
      try {
        await getUserLocation();
        setCenter({
          lat: userLocation.lat || defaultPosition.lat,
          lng: userLocation.lng || defaultPosition.lng,
        });
        setZoom(15);
        setDisplayMarker({
          lat: userLocation.lat || defaultPosition.lat,
          lng: userLocation.lng || defaultPosition.lng,
        });
      } catch (err) {
        setError("Unable to get location data");
      } finally {
        setTimeout(() => {
          setIsLoading(false);
          setZoom(undefined);
          setCenter(undefined);
        }, 100);
      }
    }
    if ((!latitude || !longitude) && isFirst) {
      intializeData();
      setIsFirst(false);
    }
  }, [userLocation, isFirst]);

  useEffect(() => {
    async function intializeData() {
      setIsLoading(true);
      setCenter({
        lat: Number(latitude) || defaultPosition.lat,
        lng: Number(longitude) || defaultPosition.lng,
      });
      setZoom(15);
      setDisplayMarker({
        lat: Number(latitude) || defaultPosition.lat,
        lng: Number(longitude) || defaultPosition.lng,
      });
      setTimeout(() => {
        setIsLoading(false);
        setZoom(undefined);
        setCenter(undefined);
      }, 100);
    }
    intializeData();
  }, [latitude, longitude]);

  const handleMapClick = (event) => {
    if (!setState || !canEdit) return;
  
    const lat = event.detail.latLng.lat;
    const lng = event.detail.latLng.lng;
    setDisplayMarker({ lat: +lat, lng: +lng });
    setState(prv => ({...prv, latitude: +lat, longitude: +lng }));
  };

  return (
    <div className="relative w-full h-full">
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white p-2 text-center z-20">
          {error}
        </div>
      )}
      <div className="absolute top-2 right-2 z-10">
        <button 
          onClick={copyCoordinates}
          className="bg-white px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition-colors"
        >
          Copy Coordinates
        </button>
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
        <Map
          onClick={handleMapClick}
          center={center}
          zoom={zoom}
          options={{
            clickableIcons: setState && canEdit,
            draggableCursor: setState && canEdit ? "pointer" : "default",
            draggable: !!setState,
            zoomControl: !!setState,
            scrollwheel: !!setState,
          }}
        />
        <Marker position={displayMarker} />
      </APIProvider>
    </div>
  );
}
