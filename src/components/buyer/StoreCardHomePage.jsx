import React from "react";
import { useNavigateService } from "../../routers/navigateService";

export default function StoreCardHomePage(props) {
  const { store } = props;
  const { navigateToStore } = useNavigateService();

  return (
    <div
      key={store.id}
      className="store-card flex-shrink-0 w-48 md:w-64 p-4 bg-white rounded-lg shadow-md"
    >
      <img
        src={store.profilePicture}
        alt={store.storeName}
        className="h-24 md:h-32 w-full object-cover rounded-md"
        loading="lazy"
      />
      <div className="mt-2">
        <h3 className="text-md md:text-lg font-bold text-gray-800">
          {store.storeName}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {store.storeAddress || "No address available"}
        </p>
        <p className="text-green-700 mt-2 font-medium">
          {store.distance
            ? `${(store.distance * 1.609344).toFixed(2)} km`
            : "N/A"}
        </p>
        <button onClick={() => navigateToStore(store.id)} className="mt-4 w-full bg-green-600 text-white py-2 rounded transition-all  hover:bg-green-700">
          Visit Store
        </button>
      </div>
    </div>
  );
}
