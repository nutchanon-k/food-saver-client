import React, { useEffect } from "react";
import useMapStore from "../../stores/mapStore";

export default function StoreList() {
  const stores = useMapStore((state) => state.stores);

  useEffect(() => {
    console.log(stores);
  }, [stores]);

  return (
    <div className="h-full w-full bg-red">
      <h1>StoreList</h1>
      {stores.map((store) => {
        console.log(store)
        return (
          <div key={store.id}>
            <h1>{store.storeName}</h1>
            <h1>{store.address}</h1>
          </div>
        );
      })}
    </div>
  );
}
