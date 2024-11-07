import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  Marker,
} from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import useMapStore from "../../stores/mapStore";
import Markers from "./Markers";
import { Circle } from "lucide-react";

export default function StoreMap() {
  const activeMarker = useMapStore((state) => state.activeMarker);
  const setActiveMarker = useMapStore((state) => state.setActiveMarker);
  const defaultPosition = useMapStore((state) => state.defaultPosition);
  const getStoreArray = useMapStore((state) => state.getStoreArray);
  const stores = useMapStore((state) => state.stores);
  const userLocation = useMapStore((state) => state.userLocation);
  const mapCenter = useMapStore((state) => state.mapCenter);
  const setMapCenter = useMapStore((state) => state.setMapCenter);
  const getUserLocation = useMapStore((state) => state.getUserLocation);
  const initialPosition = useMapStore((state) => state.initialPosition);
  const zoom = useMapStore((state) => state.zoom);
  const setZoom = useMapStore((state) => state.setZoom);
  const center = useMapStore((state) => state.center);
  const setCenter = useMapStore((state) => state.setCenter);

  const handleMapClick = (event) => {
    const lat = event.detail.latLng.lat;
    const lng = event.detail.latLng.lng;
    setMapCenter({ lat, lng });
    getStoreArray({
      radius: 2,
      latitude: lat,
      longitude: lng,
      products: true,
    });
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation.lat && userLocation.lng) {
      getStoreArray({
        radius: 2,
        latitude: userLocation.lat,
        longitude: userLocation.lng,
        products: true,
      });
      setMapCenter({ lat: userLocation.lat, lng: userLocation.lng });
      initialPosition();
    }
  }, [userLocation, initialPosition,getStoreArray,setMapCenter]);  

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
      <div className="h-full w-full bg-red-500">
        <Map
          onClick={(e) => handleMapClick(e)}
          zoom={zoom}
          center={center}
          options={{
            gestureHandling: "cooperative",
            zoomControl: true,
            scrollwheel: true,
            draggable: true,
            disableDefaultUI: true,
            styles: [
              {
                featureType: "all",
                elementType: "all",
                stylers: [{ saturation: -50 }],
              },
              {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ saturation: -100 }, { lightness: 40 }],
              },
              {
                featureType: "road",
                elementType: "labels.text",
                stylers: [{ visibility: "on" }, { lightness: 30 }],
              },
              {
                featureType: "water",
                elementType: "all",
                stylers: [{ color: "#f5f5f5" }, { lightness: 50 }],
              },
              {
                featureType: "landscape",
                elementType: "all",
                stylers: [{ lightness: 40 }],
              },
            ],
          }}
        >
          <Marker position={mapCenter.lat ? mapCenter : defaultPosition} />
          <Circle
            center={mapCenter.lat ? mapCenter : defaultPosition}
            radius={2000} // 2km radius in meters
            options={{
              fillColor: "#4CAF50",
              fillOpacity: 0.1,
              strokeColor: "#4CAF50",
              strokeOpacity: 0.5,
              strokeWeight: 1,
            }}
          />
          <Markers points={stores} />
          {activeMarker && (
            <InfoWindow
              position={{
                lat: activeMarker.latitude,
                lng: activeMarker.longitude,
              }}
              maxWidth={300}
              onCloseClick={() => setActiveMarker(null)}
            >
              <div className="flex flex-col">
                <h2 className="text-lg font-bold">{activeMarker.storeName}</h2>
                <div className="flex gap-2 items-center">
                  <img className="h-[50px]" src={activeMarker.profilePicture} />
                  <h2 className="text-xs">{activeMarker.storeAddress}</h2>
                </div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
