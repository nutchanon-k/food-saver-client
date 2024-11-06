import React, { useEffect } from "react";
import useMapStore from "../../stores/mapStore";
import StoreCard from "../card/StoreCard";
import SearchBar from "./SearchBar";
import ProductCard from "../card/ProductCard";
import { LocateFixed } from "lucide-react";
import useCartStore from "../../stores/cartItemStore";

export default function StoreList() {
  const stores = useMapStore((state) => state.stores);
  const activeMarker = useMapStore((state) => state.activeMarker);
  const initialPosition = useMapStore((state) => state.initialPosition);
  const getCart = useCartStore((state) => state.getCart);
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    console.log(stores);
  }, [stores]);

  useEffect(() => {
    getCart();
    console.log(cart);
  }, [activeMarker]);

  return (
    <>
      <div className="h-[calc(100vh-64px)] flex">
        <div className="w-full flex flex-col">
          {/* Fixed header section */}
          <div className="p-4 bg-white">
            <h1 className="text-2xl font-bold">Browse store</h1>
            <div className="items-center justify-between flex">
              <h1 className="text-sm">{stores.length} stores available</h1>
              <button
                onClick={initialPosition}
                className="btn rounded-full min-h-0 h-fit p-1"
              >
                <LocateFixed size={19} />
              </button>
            </div>
            <div className="my-3">
              <SearchBar />
            </div>
            <hr />
          </div>

          {/* Scrollable store list */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              {stores.map((store) => (
                <div key={store.id} className="mb-6">
                  <StoreCard store={store} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Product List */}
      {activeMarker && (
        <div className="fixed top-[64px] right-0 w-1/4 h-[calc(100vh-64px)] my-2 max-w-[800px] p-4 overflow-scroll shadow-lg z-50">
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
