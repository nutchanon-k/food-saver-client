import React from "react";
import useMapStore from "../../stores/mapStore";

export default function StoreCard({ store }) {
  const activeMarker = useMapStore((state) => state.activeMarker);
  const setActiveMarker = useMapStore((state) => state.setActiveMarker); 
  const isActive = activeMarker && activeMarker.id === store.id;

  const handleClick = () => {
    setActiveMarker(store);
  };


  const placeholderImageUrl =
    "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg";

  return (
    <div
      onClick={handleClick}
      className={`flex flex-row md:flex-col items-center transition-all hover:scale-105 ${isActive ? "scale-105 border-2 border-primary shadow-lg shadow-primary" : ""} border card card-compact rounded-lg bg-white w-full shadow-lg`}
    >
      <figure className="w-24 md:w-full min-w-[80px]">
        <div className="aspect-square md:aspect-[2/1] w-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={store.profilePicture || placeholderImageUrl}
            alt="Placeholder Image"
          />
        </div>
      </figure>
      <div className="card-body !p-2 flex-1 md:w-full">
        <h2 className="text-sm md:text-lg font-semibold line-clamp-1 hover:text-primary cursor-pointer transition-all">
          {store.storeName}
        </h2>
        <div className="flex justify-between mt-auto">
          <p className="text-xs md:text-sm text-gray-600">
            {store.distance.toFixed(2)} km | {store.products.reduce((total, product) => total + product.quantity, 0)} Available
          </p>
          {/* <p className="text-xs md:text-sm text-gray-600">
            
          </p> */}
        </div>
      </div>
    </div>
  );
}
