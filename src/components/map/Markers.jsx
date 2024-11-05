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
          url: "https://www.svgrepo.com/show/310867/food.svg",
          scaledSize: { width: markerSize, height: markerSize },
          anchor: { x: markerSize/2, y: markerSize/2 },
        }}
      />
    );
  });
}