import React from "react";
import useMapStore from "../../stores/mapStore";
import { Marker } from "@vis.gl/react-google-maps";

export default function Markers({ points }) {
  const setActiveMarker = useMapStore((state) => state.setActiveMarker);
  const activeMarker = useMapStore((state) => state.activeMarker);

  if (!points) return null;

  return points.map((store) => {
    const isActive = activeMarker?.id === store.id;
    const markerSize = isActive ? 50 : 35;
    
    return (
      <Marker
        onClick={() => setActiveMarker(store)}
        key={store.id}
        position={{ lat: store.latitude, lng: store.longitude }}
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: isActive ? '#FF0000' : '#4CAF50',
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#FFFFFF',
          scale: isActive ? 12 : 8,
          shadow: {
            url: google.maps.SymbolPath.CIRCLE,
            scale: isActive ? 14 : 10,
            fillColor: '#000000',
            fillOpacity: 0.3,
            strokeWeight: 0
          }
        }}
      />
    );
  });
}