import React from "react";
import StoreMap from "../components/map/StoreMap";
import StoreList from "../components/map/StoreList";

export default function MapPage() {
  return (
    <div className="h-full w-full flex flex-col-reverse md:flex-row">
      <div className="w-full md:max-w-[400px] md:order-none h-full max-h-[250px] md:max-h-full overflow-y-auto">
        <StoreList />
      </div>
      <div className="flex-1 h-full">
        <StoreMap />
      </div>
    </div>
  );
}
