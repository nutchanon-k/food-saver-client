import React, { useEffect } from "react";
import useMapStore from "../../stores/mapStore";
import StoreCard from "../card/StoreCard";
import SearchBar from "./SearchBar";
import ProductCard from "../card/ProductCard";

export default function StoreList() {
  const stores = useMapStore((state) => state.stores);
  const activeMarker = useMapStore((state) => state.activeMarker);

  useEffect(() => {
    console.log(stores);
  }, [stores]);

  return (
    <>
      {/* Main StoreList container */}
      <div className="flex gap-2 h-full w-full bg-red p-4">
        <div className="flex flex-col flex-1 overflow-scroll">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Browse store</h1>
            <h1 className="text-sm">{stores.length} stores available</h1>
            <div className="my-3">
              <SearchBar />
            </div>
            <hr />
          </div>
          <div className="flex flex-col gap-6 p-6">
            {stores.map((store) => {
              console.log(store);
              return (
                <div key={store.id}>
                  <StoreCard store={store} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Product List */}
      {activeMarker && (
        <div className="fixed top-0 right-0 w-1/4 h-full max-w-[250px] p-4 overflow-scroll shadow-lg z-50">
          {activeMarker.products.map((product) => (
            <div key={product.id} className="mb-2">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
