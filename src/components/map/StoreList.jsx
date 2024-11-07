import React, { useEffect } from "react";
import useMapStore from "../../stores/mapStore";
import StoreCard from "../card/StoreCard";
import SearchBar from "./SearchBar";
import ProductCard from "../card/ProductCard";
import { LocateFixed } from "lucide-react";
import useCartStore from "../../stores/cartItemStore";
import FilterComponent from "../buyer/FilterComponent";

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
    console.log(activeMarker);
  }, [activeMarker]);

  return (
    <>
      <div className="h-full">
        <div className="w-full">
          {/* Header section */}
          <div className="p-2 px-4 md:p-4 bg-white justify-end md:justify-between gap-2 flex md:flex-col">
            <h1 className="text-lg md:text-2xl font-bold">Browse store</h1>
            <div className="items-center gap-2 w-fit flex">
              <h1 className="text-sm">{stores.length} stores available</h1>
              <button
                onClick={initialPosition}
                className="btn rounded-full min-h-0 h-fit p-1"
              >
                <LocateFixed size={19} />
              </button>
              <FilterComponent/>
            </div>
            <hr className="invisible md:visible" />
          </div>

          {/* Store list container */}
          <div className="overflow-x-auto md:overflow-y-auto p-4">
            <div className="inline-flex md:flex-col gap-4">
              {stores.map((store) => (
                <div key={store.id} className="w-[280px] md:w-full">
                  <StoreCard store={store} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {activeMarker && (
        <div className="fixed h-fit top-[64px] flex gap-4 md:gap-0 md:flex-col right-0 md:w-1/4 w-full md:h-[calc(100vh-64px)] my-2 max-w-[800px] p-4 overflow-y-auto shadow-lg z-50">
          {activeMarker.products.map((product) => (
            <div key={product.id} className="mb-2 h-fit">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
