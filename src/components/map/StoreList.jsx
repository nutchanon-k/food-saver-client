import React, { useEffect, useState } from "react";
import useMapStore from "../../stores/mapStore";
import StoreCard from "../card/StoreCard";
import SearchBar from "./SearchBar";
import ProductCard from "../card/ProductCard";
import { ArrowDownNarrowWide, LocateFixed } from "lucide-react";
import useCartStore from "../../stores/cartItemStore";
import FilterComponent from "../buyer/FilterComponent";

export default function StoreList() {
  const stores = useMapStore((state) => state.stores);
  const activeMarker = useMapStore((state) => state.activeMarker);
  const initialPosition = useMapStore((state) => state.initialPosition);
  const getCart = useCartStore((state) => state.getCart);
  const cart = useCartStore((state) => state.cart);
  const filter = useMapStore((state) => state.filter);
  const sortStoreByDistance = useMapStore((state) => state.sortStoreByDistance);
  const sortStoreByAvalilability = useMapStore(
    (state) => state.sortStoreByAvalilability
  );
  const [sortBy, setSortBy] = useState("distance");

  useEffect(() => {
    console.log(stores);
  }, [stores]);

  useEffect(() => {
    getCart();
    console.log(cart);
    console.log(activeMarker);
  }, [activeMarker]);

  const hdlSortStore = (feild) => {
    console.log("feild", feild);
    if (feild === "distance") {
      setSortBy("distance");
      sortStoreByDistance();
    } else if (feild === "available") {
      setSortBy("available");
      sortStoreByAvalilability();
    }
  };

  return (
    <>
      <div className="border-t-2 border-primary md:border-none h-full">
        <div className="w-full">
          {/* Header section */}
          <div>
            <div className="p-2 px-4 md:p-4 bg-white justify-end md:justify-between gap-0 md:gap-2 flex flex-col md:flex-col">
              <h1 className="text-2xl md:text-3xl font-bold">ค้นหาร้านอาหาร</h1>
              <div className="items-center gap-2 w-full flex">
                <div className="z-50 w-full flex items-center justify-between">
                  <div className="text-sm flex-1">
                    <h1>
                      มีร้านอาหาร{" "}
                      <span className="text-primary font-bold">
                        {stores.length} 
                        ร้าน
                      </span>{" "}
                      ให้คุณเลือกซื้อในระยะ
                      <span className="text-primary font-bold">
                        {filter.radius} 
                        กม.
                      </span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center p-2 pt-0">
              <details className="dropdown flex-1">
                <summary className="btn rounded-full min-h-0 h-fit p-2 m-1 flex items-center gap-2 border border-primary bg-transparent">
                  <ArrowDownNarrowWide size={19} />
                  <span className="text-primary font-bold">
                    เรียงลำดับตาม:{" "}
                    {sortBy === "distance" ? "ระยะทาง" : "จำนวนอาหารที่เหลือ"}
                  </span>
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-full p-2 shadow">
                  <li onClick={() => hdlSortStore("distance")}>
                    <a className={`${sortBy === "distance" ? "active" : ""}`}>
                      ระยะทาง
                    </a>
                  </li>
                  <li onClick={() => hdlSortStore("available")}>
                    <a className={`${sortBy === "available" ? "active" : ""}`}>
                      จำนวนอาหารที่เหลือ
                    </a>
                  </li>
                </ul>
              </details>
              <div className="">
                <button
                  onClick={initialPosition}
                  className="btn rounded-full min-h-0 h-fit p-1"
                >
                  <LocateFixed size={19} />
                </button>
                <FilterComponent />
              </div>
            </div>
            <hr className="invisible md:visible" />
          </div>

          {/* Store list container */}
          <div className="scrollbar-hide overflow-y-auto max-h-[calc(100vh-200px)] p-2 md:p-4">
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
        <div className="scrollbar-hide fixed h-fit top-[64px] flex gap-4 md:gap-0 md:flex-col right-0 md:w-1/4 w-full md:h-[calc(100vh-64px)] my-2 max-w-[800px] p-4 overflow-y-auto z-50">
          {activeMarker.products.map((product) => {
            console.log(product);
            return (
              <div key={product.id} className="mb-2 h-fit">
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
