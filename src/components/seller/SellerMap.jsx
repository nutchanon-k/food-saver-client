import { APIProvider, Map, Marker, useMap } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import useMapStore from "../../stores/mapStore";

export default function SellerMap({ setState, latitude, longitude }) {
  const getUserLocation = useMapStore((state) => state.getUserLocation);
  const defaultPosition = useMapStore((state) => state.defaultPosition);
  const [isLoading, setIsLoading] = useState(true);
  const [center, setCenter] = useState({
    lat: Number(latitude),
    lng: Number(longitude),
  });
  const [zoom, setZoom] = useState(12);
  const [displayMarker, setDisplayMarker] = useState({
    lat: Number(latitude) || defaultPosition.lat,
    lng: Number(longitude) || defaultPosition.lng,
  });
  useEffect(() => {
    async function intializeData() {
      setIsLoading(true);
      await getUserLocation();
      setCenter({ lat: Number(latitude), lng: Number(longitude) });
      setTimeout(() => {
        setZoom(undefined);
        setCenter(undefined);
        setIsLoading(false);
      }, 1000);
      setCenter({
        lat: Number(latitude),
        lng: Number(longitude),
      });
    }
    intializeData()
  }, []);

  const handleMapClick = (event) => {
    const lat = event.detail.latLng.lat;
    const lng = event.detail.latLng.lng;
    setDisplayMarker({ lat: lat, lng: lng });
    setCenter(undefined); // Add this line
    setState({ latitude: lat, longitude: lng });
    console.log(center, "center");
    console.log(displayMarker, "displayMarker");
  };

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
        <Map onClick={handleMapClick} center={center} zoom={zoom} />
        <Marker position={displayMarker} />
      </APIProvider>
    </div>
  );
}
