import React from "react";
import StoreMap from "../components/map/StoreMap";
import StoreList from "../components/map/StoreList";

export default function MapPage() {
  return (
    <div className="h-screen w-screen flex">
      <div className="max-w-[400px]">
        <StoreList />
      </div>
      <div className="flex-1">
        <StoreMap />
      </div>
    </div>
  );
}
